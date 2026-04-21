"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { SignupStepFourProps } from "@/features/auth/types";

export function AuthSignupStepFour({
  userName,
}: SignupStepFourProps): React.JSX.Element {
  return (
    <div className="space-y-6 py-4 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
          <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">Welcome aboard, {userName}!</h3>
        <p className="text-muted-foreground text-sm">
          Your account has been successfully created and your business details
          are being verified. You can now start using Invonix.
        </p>
      </div>

      <div className="pt-4">
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "default" }),
            "flex h-10 w-full items-center justify-center",
          )}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
