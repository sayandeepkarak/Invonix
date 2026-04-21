import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthState,
  User,
  LoginPayload,
  SignupPayload,
} from "@/features/auth/types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, _: PayloadAction<LoginPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    signupRequest: (state, _: PayloadAction<SignupPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
    },
    autoLoginRequest: (state) => {
      state.isLoading = true;
    },
    updateProfileRequest: (state, _: PayloadAction<Partial<User>>) => {
      state.isLoading = true;
      state.error = null;
    },
    updatePasswordRequest: (
      state,
      _: PayloadAction<{ current: string; next: string }>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
      state.error = null;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isInitialized = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isInitialized = true;
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  signupRequest,
  logoutRequest,
  autoLoginRequest,
  updateProfileRequest,
  updatePasswordRequest,
  authSuccess,
  authFailure,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
