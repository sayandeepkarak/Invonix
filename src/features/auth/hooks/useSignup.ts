import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signupRequest } from "@/features/auth/store";
import { SIGNUP_STEPS, SIGNUP_STEP_LABELS } from "@/features/auth/const";
import type {
  StepKey,
  StepOneData,
  StepThreeData,
} from "@/features/auth/types";

const STEP_ORDER: StepKey[] = [
  SIGNUP_STEPS.BASIC_INFO,
  SIGNUP_STEPS.EMAIL_VERIFICATION,
  SIGNUP_STEPS.BUSINESS_DETAILS,
  SIGNUP_STEPS.COMPLETE,
];

export function useSignup() {
  const dispatch = useAppDispatch();
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [currentStep, setCurrentStep] = useState<StepKey>(
    SIGNUP_STEPS.BASIC_INFO,
  );
  const [stepOneData, setStepOneData] = useState<StepOneData>({
    name: "",
    email: "",
    password: "",
  });

  const stepIndex = STEP_ORDER.indexOf(currentStep);

  useEffect(() => {
    if (isAuthenticated && currentStep === SIGNUP_STEPS.BUSINESS_DETAILS) {
      setCurrentStep(SIGNUP_STEPS.COMPLETE);
    }
  }, [isAuthenticated, currentStep]);

  const handleStepOneComplete = (data: StepOneData): void => {
    setStepOneData(data);
    setCurrentStep(SIGNUP_STEPS.EMAIL_VERIFICATION);
  };

  const handleStepThreeComplete = (data: StepThreeData): void => {
    dispatch(signupRequest({ ...stepOneData, ...data }));
  };

  const handleEmailVerified = (): void => {
    setCurrentStep(SIGNUP_STEPS.BUSINESS_DETAILS);
  };

  const handleBackToBasic = (): void => {
    setCurrentStep(SIGNUP_STEPS.BASIC_INFO);
  };

  const handleBackToEmail = (): void => {
    setCurrentStep(SIGNUP_STEPS.EMAIL_VERIFICATION);
  };

  return {
    currentStep,
    stepIndex,
    stepOneData,
    error,
    isAuthenticated,
    handleStepOneComplete,
    handleStepThreeComplete,
    handleEmailVerified,
    handleBackToBasic,
    handleBackToEmail,
    SIGNUP_STEP_LABELS,
    SIGNUP_STEPS,
  };
}
