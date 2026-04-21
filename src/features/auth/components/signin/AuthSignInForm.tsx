"use client";

import Link from "next/link";
import { useSignin } from "@/features/auth/hooks/useSignin";
import {
  AppButton,
  AppInput,
  AppPasswordInput,
  AppCard,
} from "@/components/wrapper";

export function AuthSignInForm() {
  const { form, isLoading, error, onSubmit } = useSignin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <AppCard
      title="Welcome back"
      description="Enter your credentials to access your account"
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-destructive/10 rounded-md p-3">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <AppInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="name@example.com"
          disabled={isLoading}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
        />

        <div className="space-y-1">
          <AppPasswordInput
            id="password"
            placeholder="********"
            disabled={isLoading}
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message}
          />
        </div>

        <AppButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </AppButton>

        <p className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AppCard>
  );
}
