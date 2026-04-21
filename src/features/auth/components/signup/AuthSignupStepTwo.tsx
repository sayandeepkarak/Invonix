"use client";

import { useState, useRef, useEffect } from "react";
import { DEMO_OTP } from "@/features/auth/const";
import { AppButton } from "@/components/wrapper";
import type { SignupStepTwoProps } from "@/features/auth/types";

export function AuthSignupStepTwo({
  email,
  onNext,
  onBack,
}: SignupStepTwoProps): React.JSX.Element {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handleChange(value: string, index: number): void {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ): void {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleSubmit(): void {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the full code");
      return;
    }

    if (code === DEMO_OTP) {
      onNext();
    } else {
      setError("Invalid verification code. Use 123456.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a verification code to
          <br />
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="flex justify-between gap-2">
        {otp.map((digit, index) => {
          return (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                return handleChange(e.target.value, index);
              }}
              onKeyDown={(e) => {
                return handleKeyDown(e, index);
              }}
              className="w-12 h-14 text-center text-xl font-bold rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          );
        })}
      </div>

      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      <div className="space-y-2">
        <AppButton onClick={handleSubmit} className="w-full">
          Verify Email
        </AppButton>
        <AppButton variant="ghost" onClick={onBack} className="w-full">
          Back to Basic Info
        </AppButton>
      </div>
    </div>
  );
}
