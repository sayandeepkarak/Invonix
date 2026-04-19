"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signupRequest } from "@/features/auth/store";
import { SIGNUP_STEPS, SIGNUP_STEP_LABELS } from "@/features/auth/const";
import { AppCard, AppStepper } from "@/components/common";
import { SignupStepOne } from "./SignupStepOne";
import { SignupStepTwo } from "./SignupStepTwo";
import { SignupStepThree } from "./SignupStepThree";
import { SignupStepFour } from "./SignupStepFour";
import type {
  StepKey,
  StepOneData,
  StepThreeData,
} from "@/features/auth/types";
import Link from "next/link";
const STEP_ORDER: StepKey[] = [
  SIGNUP_STEPS.BASIC_INFO,
  SIGNUP_STEPS.EMAIL_VERIFICATION,
  SIGNUP_STEPS.BUSINESS_DETAILS,
  SIGNUP_STEPS.COMPLETE,
];
export function SignupForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState<StepKey>(
    SIGNUP_STEPS.BASIC_INFO,
  );
  const [isStepOneCompleted, setIsStepOneCompleted] = useState<boolean>(false);
  const [stepOneData, setStepOneData] = useState<StepOneData>({
    name: "",
    email: "",
    password: "",
  });
  const stepIndex: number = STEP_ORDER.indexOf(currentStep);
  useEffect((): void => {
    if (isAuthenticated && currentStep === SIGNUP_STEPS.BUSINESS_DETAILS) {
      setCurrentStep(SIGNUP_STEPS.COMPLETE);
    }
  }, [isAuthenticated, currentStep]);
  function handleStepOneComplete(data: StepOneData): void {
    setStepOneData(data);
    setIsStepOneCompleted(true);
    setCurrentStep(SIGNUP_STEPS.EMAIL_VERIFICATION);
  }
  function handleStepThreeComplete(data: StepThreeData): void {
    if (!isStepOneCompleted) return;
    dispatch(signupRequest({ ...stepOneData, ...data }));
  }
  function handleEmailVerified(): void {
    setCurrentStep(SIGNUP_STEPS.BUSINESS_DETAILS);
  }
  function handleBackToBasic(): void {
    setCurrentStep(SIGNUP_STEPS.BASIC_INFO);
  }
  function handleBackToEmail(): void {
    setCurrentStep(SIGNUP_STEPS.EMAIL_VERIFICATION);
  }
  return (
    <AppCard
      title="Create an account"
      description={`Step ${stepIndex + 1} of ${SIGNUP_STEP_LABELS.length} — ${SIGNUP_STEP_LABELS[stepIndex]}`}
      headerContent={
        <AppStepper steps={SIGNUP_STEP_LABELS} currentStep={stepIndex}>
          <></>
        </AppStepper>
      }
      className="w-full max-w-md"
    >
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 mb-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      {currentStep === SIGNUP_STEPS.BASIC_INFO && (
        <SignupStepOne
          onNext={handleStepOneComplete}
          initialData={isStepOneCompleted ? stepOneData : undefined}
        />
      )}
      {currentStep === SIGNUP_STEPS.EMAIL_VERIFICATION &&
        isStepOneCompleted && (
          <SignupStepTwo
            email={stepOneData.email}
            onNext={handleEmailVerified}
            onBack={handleBackToBasic}
          />
        )}
      {currentStep === SIGNUP_STEPS.BUSINESS_DETAILS && (
        <SignupStepThree
          onNext={handleStepThreeComplete}
          onBack={handleBackToEmail}
        />
      )}
      {currentStep === SIGNUP_STEPS.COMPLETE && isStepOneCompleted && (
        <SignupStepFour userName={stepOneData.name} />
      )}
      {currentStep !== SIGNUP_STEPS.COMPLETE && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      )}
    </AppCard>
  );
}
