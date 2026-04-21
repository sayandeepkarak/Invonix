import { call, put, takeLatest, select } from "redux-saga/effects";
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
  updateProfileRequest,
  updatePasswordRequest,
} from "@/features/auth/store/authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  User,
  LoginPayload,
  SignupPayload,
  Session,
} from "@/features/auth/types";

import { RootState } from "@/store";

const selectAuth = (state: RootState) => state.auth;

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
      createdAt: new Date().toISOString(),
    };

    yield call(sessionsTable.createSession, session);
    localStorage.setItem(SESSION_STORAGE_KEY, "true");

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
      createdAt: new Date().toISOString(),
    };

    yield call(sessionsTable.createSession, session);
    localStorage.setItem(SESSION_STORAGE_KEY, "true");

    yield put(authSuccess(user));
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

function* handleLogout() {
  try {
    yield call(sessionsTable.clearSessions);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
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
      sessionStorage.getItem(SESSION_STORAGE_KEY) === "true" ||
      localStorage.getItem(SESSION_STORAGE_KEY) === "true";

    const user: User | undefined = yield call(
      usersTable.getUserById,
      session.userId,
    );

    if (user && isSessionActive) {
      yield put(authSuccess(user));
    } else {
      yield call(sessionsTable.clearSessions);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(SESSION_STORAGE_KEY);
      yield put(logoutSuccess());
    }
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

function* handleUpdateProfile(action: PayloadAction<Partial<User>>) {
  try {
    const { user } = yield select(selectAuth);
    if (!user) return;

    yield call(usersTable.updateUser, user.id, action.payload);
    const updatedUser: User | undefined = yield call(
      usersTable.getUserById,
      user.id,
    );
    if (updatedUser) {
      yield put(authSuccess(updatedUser));
    }
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

function* handleUpdatePassword(
  action: PayloadAction<{ current: string; next: string }>,
) {
  try {
    const { user } = yield select(selectAuth);
    if (!user) return;

    const dbUser: User | undefined = yield call(
      usersTable.getUserById,
      user.id,
    );
    if (!dbUser || dbUser.password !== action.payload.current) {
      yield put(authFailure("Current password incorrect"));
      return;
    }

    yield call(usersTable.updateUser, user.id, {
      password: action.payload.next,
    });
    yield put(authSuccess({ ...user }));
  } catch (err) {
    yield put(authFailure(String(err)));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(autoLoginRequest.type, handleAutoLogin);
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
  yield takeLatest(updatePasswordRequest.type, handleUpdatePassword);
}
