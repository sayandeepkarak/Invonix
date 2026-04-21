export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  phone: string;
  isVerified: boolean;
  createdAt: string;
  password?: string;
}

export interface Session {
  id: string;
  userId: string;
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  phone: string;
  password?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

export type StepKey = string;

export interface StepOneData {
  name: string;
  email: string;
  password: string;
}

export interface StepThreeData {
  businessName: string;
  businessType: string;
  phone: string;
}

export interface BusinessTypeOption {
  label: string;
  value: string;
}

export interface SignupStepOneFormValues extends StepOneData {
  confirmPassword: string;
}

export interface SignupStepThreeFormValues extends StepThreeData {
  termsAccepted: true;
}

export interface SignupStepOneProps {
  onNext: (data: StepOneData) => void;
  initialData?: StepOneData;
}

export interface SignupStepTwoProps {
  onNext: () => void;
  onBack: () => void;
  email: string;
}

export interface SignupStepThreeProps {
  onNext: (data: StepThreeData) => void;
  onBack: () => void;
  initialData?: StepThreeData;
}

export interface SignupStepFourProps {
  userName: string;
}
