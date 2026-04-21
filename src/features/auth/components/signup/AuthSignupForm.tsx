"use client";

import Link from "next/link";
import { useSignup } from "@/features/auth/hooks/useSignup";
import { AppCard, AppStepper } from "@/components/wrapper";
import { AuthSignupStepOne } from "@/features/auth/components/signup/AuthSignupStepOne";
import { AuthSignupStepTwo } from "@/features/auth/components/signup/AuthSignupStepTwo";
import { AuthSignupStepThree } from "@/features/auth/components/signup/AuthSignupStepThree";
import { AuthSignupStepFour } from "@/features/auth/components/signup/AuthSignupStepFour";

export function AuthSignupForm(): React.JSX.Element {
  const {
    currentStep,
    stepIndex,
    stepOneData,
    error,
    handleStepOneComplete,
    handleStepThreeComplete,
    handleEmailVerified,
    handleBackToBasic,
    handleBackToEmail,
    SIGNUP_STEP_LABELS,
    SIGNUP_STEPS,
  } = useSignup();

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
        <AuthSignupStepOne
          onNext={handleStepOneComplete}
          initialData={stepOneData}
        />
      )}

      {currentStep === SIGNUP_STEPS.EMAIL_VERIFICATION && (
        <AuthSignupStepTwo
          email={stepOneData.email}
          onNext={handleEmailVerified}
          onBack={handleBackToBasic}
        />
      )}

      {currentStep === SIGNUP_STEPS.BUSINESS_DETAILS && (
        <AuthSignupStepThree
          onNext={handleStepThreeComplete}
          onBack={handleBackToEmail}
        />
      )}

      {currentStep === SIGNUP_STEPS.COMPLETE && (
        <AuthSignupStepFour userName={stepOneData.name} />
      )}

      {currentStep !== SIGNUP_STEPS.COMPLETE && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      )}
    </AppCard>
  );
}
