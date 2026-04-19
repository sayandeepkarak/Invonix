"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components/common/AppButton";
import { CheckCircle2 } from "lucide-react";

interface SignupStepFourProps {
  userName: string;
}

export function SignupStepFour({ userName }: SignupStepFourProps) {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push("/dashboard"), 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="text-center space-y-6 py-4">
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Welcome, {userName}!</h3>
        <p className="text-sm text-muted-foreground">
          Your account has been created successfully.
        </p>
        <p className="text-xs text-muted-foreground">
          You will be redirected to the dashboard in a few seconds.
        </p>
      </div>
      <AppButton
        label="Go to Dashboard"
        className="w-full"
        onClick={() => router.push("/dashboard")}
      />
    </div>
  );
}
