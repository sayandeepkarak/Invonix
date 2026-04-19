"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupStepOneSchema } from "@/features/auth/schema";
import { AppInput } from "@/components/common/AppInput";
import { AppPasswordInput } from "@/components/common/AppPasswordInput";
import { AppButton } from "@/components/common/AppButton";

interface StepOneData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupStepOneProps {
  onNext: (data: StepOneData) => void;
  initialData?: Partial<StepOneData>;
}

export function SignupStepOne({ onNext, initialData }: SignupStepOneProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneData>({
    resolver: zodResolver(signupStepOneSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      password: initialData?.password ?? "",
      confirmPassword: initialData?.confirmPassword ?? "",
    },
  });
  const handleFormSubmit = handleSubmit(onNext);

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <AppInput
        id="signup-name"
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register("name")}
      />
      <AppInput
        id="signup-email"
        label="Email"
        type="email"
        placeholder="name@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <AppPasswordInput
        id="signup-password"
        label="Password"
        placeholder="Create a strong password"
        error={errors.password?.message}
        {...register("password")}
      />
      <AppPasswordInput
        id="signup-confirm"
        label="Confirm Password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <AppButton label="Continue" type="submit" className="w-full" />
    </form>
  );
}
