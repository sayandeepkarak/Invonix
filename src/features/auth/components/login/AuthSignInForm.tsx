"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginRequest } from "@/features/auth/store";
import {
  AppButton,
  AppInput,
  AppPasswordInput,
  AppCard,
} from "@/components/wrapper";
import type { LoginPayload } from "@/features/auth/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthSignInForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: LoginPayload) => {
    dispatch(loginRequest(data));
  };

  return (
    <AppCard
      title="Welcome back"
      description="Enter your credentials to access your account"
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{error}</p>
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

        <p className="text-center text-sm text-muted-foreground">
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
