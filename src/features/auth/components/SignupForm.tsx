"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signupRequest } from "@/features/auth/store";
import { SIGNUP_STEPS, SIGNUP_STEP_LABELS } from "@/features/auth/const";
import { AppCard } from "@/components/common/AppCard";
import { AppStepper } from "@/components/common/AppStepper";
import { SignupStepOne } from "@/features/auth/components/SignupStepOne";
import { SignupStepTwo } from "@/features/auth/components/SignupStepTwo";
import { SignupStepThree } from "@/features/auth/components/SignupStepThree";
import { SignupStepFour } from "@/features/auth/components/SignupStepFour";
import Link from "next/link";

type StepKey = string;

const STEP_ORDER: StepKey[] = [
  SIGNUP_STEPS.BASIC_INFO,
  SIGNUP_STEPS.EMAIL_VERIFICATION,
  SIGNUP_STEPS.BUSINESS_DETAILS,
  SIGNUP_STEPS.COMPLETE,
];

export function SignupForm() {
  const dispatch = useAppDispatch();
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState<StepKey>(
    SIGNUP_STEPS.BASIC_INFO,
  );
  const [stepOneData, setStepOneData] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  const stepIndex: number = STEP_ORDER.indexOf(currentStep);

  useEffect(() => {
    if (isAuthenticated && currentStep === SIGNUP_STEPS.BUSINESS_DETAILS) {
      setCurrentStep(SIGNUP_STEPS.COMPLETE);
    }
  }, [isAuthenticated, currentStep]);

  function handleStepOneComplete(data: {
    name: string;
    email: string;
    password: string;
  }) {
    setStepOneData(data);
    setCurrentStep(SIGNUP_STEPS.EMAIL_VERIFICATION);
  }

  function handleStepThreeComplete(data: {
    businessName: string;
    businessType: string;
    phone: string;
  }) {
    if (!stepOneData) return;
    dispatch(signupRequest({ ...stepOneData, ...data }));
  }
  function handleEmailVerified() {
    setCurrentStep(SIGNUP_STEPS.BUSINESS_DETAILS);
  }

  function handleBackToBasic() {
    setCurrentStep(SIGNUP_STEPS.BASIC_INFO);
  }

  function handleBackToEmail() {
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
          initialData={stepOneData ?? undefined}
        />
      )}

      {currentStep === SIGNUP_STEPS.EMAIL_VERIFICATION && stepOneData && (
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

      {currentStep === SIGNUP_STEPS.COMPLETE && stepOneData && (
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
