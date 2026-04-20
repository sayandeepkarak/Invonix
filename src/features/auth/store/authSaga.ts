import { call, put, takeLatest } from "redux-saga/effects";
import { usersTable } from "@/services/dexie/tables/users";
import { sessionsTable } from "@/services/dexie/tables/session";
import { SESSION_STORAGE_KEY } from "@/features/auth/const";
import {
  authSuccess,
  authFailure,
  logoutSuccess,
  loginRequest,
  signupRequest,
  logoutRequest,
  autoLoginRequest,
} from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  User,
  LoginPayload,
  SignupPayload,
  Session,
} from "@/features/auth/types";

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const user: User | undefined = yield call(
      usersTable.getUserByEmail,
      action.payload.email,
    );

    if (!user || user.password !== action.payload.password) {
      yield put(authFailure("Invalid email or password"));
      return;
    }

    const isRemembered = !!action.payload.rememberMe;
    const session: Session = {
      id: crypto.randomUUID(),
      userId: user.id,
      rememberMe: isRemembered,
      createdAt: new Date().toISOString(),
    };

    yield call(sessionsTable.createSession, session);

    if (!isRemembered) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    }

    yield put(authSuccess(user));
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

function* handleSignup(action: PayloadAction<SignupPayload>) {
  try {
    const existingUser: User | undefined = yield call(
      usersTable.getUserByEmail,
      action.payload.email,
    );

    if (existingUser) {
      yield put(authFailure("Email already exists"));
      return;
    }

    const user: User = {
      id: crypto.randomUUID(),
      ...action.payload,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };

    yield call(usersTable.createUser, user);

    const session: Session = {
      id: crypto.randomUUID(),
      userId: user.id,
      rememberMe: false,
      createdAt: new Date().toISOString(),
    };

    yield call(sessionsTable.createSession, session);
    sessionStorage.setItem(SESSION_STORAGE_KEY, "true");

    yield put(authSuccess(user));
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

function* handleLogout() {
  try {
    yield call(sessionsTable.clearSessions);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

function* handleAutoLogin() {
  try {
    const session: Session | undefined = yield call(
      sessionsTable.getActiveSession,
    );

    if (!session) {
      yield put(logoutSuccess());
      return;
    }

    const isSessionActive =
      sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
    const user: User | undefined = yield call(
      usersTable.getUserById,
      session.userId,
    );

    if (user && (session.rememberMe || isSessionActive)) {
      yield put(authSuccess(user));
    } else {
      yield call(sessionsTable.clearSessions);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      yield put(logoutSuccess());
    }
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(autoLoginRequest.type, handleAutoLogin);
}
