export interface User {
  id: string
  name: string
  email: string
  businessName: string
  businessType: string
  phone: string
  isVerified: boolean
  createdAt: string
  password?: string
}

export interface Session {
  id: string
  userId: string
  rememberMe: boolean
  createdAt: string
}

export interface LoginPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupPayload {
  name: string
  email: string
  businessName: string
  businessType: string
  phone: string
  password?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
