import { call, put, takeLatest } from "redux-saga/effects";
import { usersTable } from "@/services/dexie/tables/users";
import { sessionsTable } from "@/services/dexie/tables/session";
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

    const session: Session = {
      id: crypto.randomUUID(),
      userId: user.id,
      rememberMe: !!action.payload.rememberMe,
      createdAt: new Date().toISOString(),
    };

    yield call(sessionsTable.createSession, session);

    if (action.payload.rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("userId", user.id);
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
    yield put(authSuccess(user));
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

function* handleLogout() {
  try {
    yield call(sessionsTable.clearSessions);
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("userId");
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
    let user: User | undefined;

    if (session) {
      user = yield call(usersTable.getUserById, session.userId);
    } else {
      const rememberMe = localStorage.getItem("rememberMe");
      const userId = localStorage.getItem("userId");

      if (rememberMe === "true" && userId) {
        user = yield call(usersTable.getUserById, userId);
        if (user) {
          const newSession: Session = {
            id: crypto.randomUUID(),
            userId: user.id,
            rememberMe: true,
            createdAt: new Date().toISOString(),
          };
          yield call(sessionsTable.createSession, newSession);
        }
      }
    }

    if (user) {
      yield put(authSuccess(user));
    } else {
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
