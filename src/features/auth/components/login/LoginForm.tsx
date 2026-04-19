"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginRequest } from "@/features/auth/store";
import { loginSchema } from "@/features/auth/schema";
import {
  AppCard,
  AppInput,
  AppPasswordInput,
  AppButton,
  AppCheckbox,
} from "@/components/common";
import type { LoginPayload } from "@/features/auth/types";
import Link from "next/link";
export function LoginForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });
  useEffect((): void => {
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, router]);
  function onSubmit(data: LoginPayload): void {
    dispatch(loginRequest(data));
  }
  const handleFormSubmit = handleSubmit(onSubmit);
  return (
    <AppCard
      title="Sign in"
      description="Enter your credentials to access your account"
      className="w-full max-w-md"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <AppInput
          id="login-email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <AppPasswordInput
          id="login-password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <AppCheckbox
              id="login-remember"
              label="Remember me"
              checked={!!field.value}
              onChange={field.onChange}
            />
          )}
        />
        {error && (
          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
        <AppButton
          label="Sign in"
          type="submit"
          loading={isLoading}
          className="w-full"
        />
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
