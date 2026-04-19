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
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    // Use a unified loading handler pattern for requests
    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
      state.error = null;
    },
    signupRequest(state, _action: PayloadAction<SignupPayload>) {
      state.isLoading = true;
      state.error = null;
    },
    logoutRequest(state) {
      state.isLoading = true;
    },
    autoLoginRequest(state) {
      state.isLoading = true;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  loginRequest,
  signupRequest,
  logoutRequest,
  autoLoginRequest,
} = authSlice.actions;

export default authSlice.reducer;
