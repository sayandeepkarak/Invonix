"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupStepOneSchema } from "@/features/auth/schema";
import { AppInput, AppPasswordInput, AppButton } from "@/components/common";
import type {
  SignupStepOneFormValues,
  SignupStepOneProps,
} from "@/features/auth/types";
export function SignupStepOne({
  onNext,
  initialData,
}: SignupStepOneProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupStepOneFormValues>({
    resolver: zodResolver(signupStepOneSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      password: initialData?.password ?? "",
      confirmPassword: (initialData as any)?.confirmPassword ?? "",
    },
  });
  const handleFormSubmit = handleSubmit(
    (data: SignupStepOneFormValues): void => {
      const { confirmPassword, ...rest } = data;
      onNext(rest);
    },
  );
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
