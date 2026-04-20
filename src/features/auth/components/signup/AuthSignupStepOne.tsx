"use client";

import { useForm } from "react-hook-form";
import { AppButton, AppInput, AppPasswordInput } from "@/components/wrapper";
import type { StepOneData, SignupStepOneProps } from "@/features/auth/types";

export function AuthSignupStepOne({
  onNext,
  initialData,
}: SignupStepOneProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneData>({
    defaultValues: initialData,
  });

  const onSubmit = (data: StepOneData): void => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AppInput
        label="Full Name"
        id="name"
        placeholder="John Doe"
        {...register("name", { required: "Name is required" })}
        error={errors.name?.message}
        autoFocus
      />
      <AppInput
        label="Email Address"
        id="email"
        type="email"
        placeholder="john@example.com"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={errors.email?.message}
      />
      <AppPasswordInput
        label="Password"
        id="password"
        placeholder="********"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        error={errors.password?.message}
      />
      <AppButton type="submit" className="w-full">
        Continue
      </AppButton>
    </form>
  );
}
