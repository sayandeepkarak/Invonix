"use client";

import { useState, useRef, useEffect } from "react";
import { DEMO_OTP } from "@/features/auth/const";
import { AppButton } from "@/components/common/AppButton";

interface SignupStepTwoProps {
  onNext: () => void;
  onBack: () => void;
  email: string;
}

export function SignupStepTwo({ onNext, onBack, email }: SignupStepTwoProps) {
  const [otp, setOtp] = useState<Array<string>>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  function handleChange(index: number, value: string) {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const data = e.clipboardData.getData("text").substring(0, 6).split("");
    const newOtp = [...otp];
    data.forEach((char, i) => {
      if (!isNaN(Number(char)) && i < 6) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
  }

  function handleVerify() {
    const enteredOtp = otp.join("");
    if (enteredOtp === DEMO_OTP) {
      onNext();
    } else {
      setError("Invalid verification code. Use 123456 for demo.");
    }
  }
  function handleBack() {
    onBack();
  }

  function handleResend() {
    // Logic for resending code
    console.log("Resending code...");
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a verification code to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div
        className="flex justify-between gap-2 max-w-[300px] mx-auto"
        onPaste={handlePaste}
      >
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-10 h-12 text-center text-lg font-bold rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ))}
      </div>

      {error && <p className="text-sm text-center text-destructive">{error}</p>}

      <div className="flex flex-col gap-2">
        <AppButton
          label="Verify & Continue"
          onClick={handleVerify}
          className="w-full"
        />
        <AppButton
          label="Back"
          variant="ghost"
          onClick={handleBack}
          className="w-full"
        />
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button onClick={handleResend} className="text-primary hover:underline">
          Resend code
        </button>
      </p>
    </div>
  );
}
