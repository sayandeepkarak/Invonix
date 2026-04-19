import { call, put, takeLatest } from "redux-saga/effects";
import { usersTable } from "@/services/dexie/tables/users";
import { sessionsTable } from "@/services/dexie/tables/session";
import {
  setUser,
  clearUser,
  setLoading,
  setError,
  loginRequest,
  signupRequest,
  logoutRequest,
  autoLoginRequest,
} from "@/features/auth/store/authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  User,
  LoginPayload,
  SignupPayload,
  Session,
} from "@/features/auth/types";

/**
 * Generic wrapper for saga operations to handle loading and error states uniformly.
 */
function* performAuthAction(worker: any, ...args: any[]) {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    yield call(worker, ...args);
  } catch (err) {
    yield put(setError(String(err)));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleLoginWorker(action: PayloadAction<LoginPayload>) {
  const user: User | undefined = yield call(
    usersTable.getUserByEmail,
    action.payload.email,
  );

  if (!user) {
    yield put(setError("User not found"));
    return;
  }

  if (user.password !== action.payload.password) {
    yield put(setError("Invalid password"));
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

  yield put(setUser(user));
}

function* handleSignupWorker(action: PayloadAction<SignupPayload>) {
  const existingUser: User | undefined = yield call(
    usersTable.getUserByEmail,
    action.payload.email,
  );

  if (existingUser) {
    yield put(setError("Email already exists"));
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
  yield put(setUser(user));
}

function* handleLogoutWorker() {
  yield call(sessionsTable.clearSessions);
  localStorage.removeItem("rememberMe");
  localStorage.removeItem("userId");
  yield put(clearUser());
}

function* handleAutoLoginWorker() {
  const session: Session | undefined = yield call(
    sessionsTable.getActiveSession,
  );

  if (session) {
    const user: User | undefined = yield call(usersTable.getUserById, session.userId);
    if (user) {
      yield put(setUser(user));
      return;
    }
  }

  const rememberMe = localStorage.getItem("rememberMe");
  const userId = localStorage.getItem("userId");

  if (rememberMe === "true" && userId) {
    const user: User | undefined = yield call(usersTable.getUserById, userId);

    if (user) {
      const newSession: Session = {
        id: crypto.randomUUID(),
        userId: user.id,
        rememberMe: true,
        createdAt: new Date().toISOString(),
      };

      yield call(sessionsTable.createSession, newSession);
      yield put(setUser(user));
      return;
    }

    localStorage.removeItem("rememberMe");
    localStorage.removeItem("userId");
  }

  yield put(clearUser());
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, (action: PayloadAction<LoginPayload>) => 
    performAuthAction(handleLoginWorker, action)
  );
  yield takeLatest(signupRequest.type, (action: PayloadAction<SignupPayload>) => 
    performAuthAction(handleSignupWorker, action)
  );
  yield takeLatest(logoutRequest.type, () => 
    performAuthAction(handleLogoutWorker)
  );
  yield takeLatest(autoLoginRequest.type, () => 
    performAuthAction(handleAutoLoginWorker)
  );
}
