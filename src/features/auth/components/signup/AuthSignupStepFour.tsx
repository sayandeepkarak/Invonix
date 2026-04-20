"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AppButton } from "@/components/wrapper";
import type { SignupStepFourProps } from "@/features/auth/types";

export function AuthSignupStepFour({
  userName,
}: SignupStepFourProps): React.JSX.Element {
  return (
    <div className="text-center space-y-6 py-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
          <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">Welcome aboard, {userName}!</h3>
        <p className="text-sm text-muted-foreground">
          Your account has been successfully created and your business details
          are being verified. You can now start using Invonix.
        </p>
      </div>

      <div className="pt-4">
        <AppButton
          render={(props: any) => <Link {...props} href="/dashboard" />}
          className="w-full"
        >
          Go to Dashboard
        </AppButton>
      </div>
    </div>
  );
}
