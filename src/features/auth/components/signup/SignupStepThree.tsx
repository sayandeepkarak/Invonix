"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupStepThreeSchema } from "@/features/auth/schema";
import { BUSINESS_TYPES } from "@/features/auth/const";
import {
  AppInput,
  AppSelect,
  AppCheckbox,
  AppButton,
} from "@/components/common";
import type {
  SignupStepThreeFormValues,
  SignupStepThreeProps,
} from "@/features/auth/types";

export function SignupStepThree({
  onNext,
  onBack,
  initialData,
}: SignupStepThreeProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupStepThreeFormValues>({
    resolver: zodResolver(signupStepThreeSchema),
    defaultValues: {
      businessName: initialData?.businessName ?? "",
      businessType: initialData?.businessType ?? "",
      phone: initialData?.phone ?? "",
      termsAccepted: (initialData as any)?.termsAccepted ?? false,
    },
  });

  function onSubmit(data: SignupStepThreeFormValues): void {
    const { termsAccepted, ...rest } = data;
    onNext(rest);
  }

  function handleBack(): void {
    onBack();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AppInput
        id="signup-business"
        label="Business Name"
        placeholder="Your Business Name"
        error={errors.businessName?.message}
        {...register("businessName")}
      />

      <Controller
        name="businessType"
        control={control}
        render={({ field }) => (
          <AppSelect
            id="signup-btype"
            label="Business Type"
            placeholder="Select business type"
            options={[...BUSINESS_TYPES]}
            value={field.value}
            onChange={field.onChange}
            error={errors.businessType?.message}
          />
        )}
      />

      <AppInput
        id="signup-phone"
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 000-0000"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Controller
        name="termsAccepted"
        control={control}
        render={({ field }) => (
          <AppCheckbox
            id="signup-terms"
            label="I agree to the Terms of Service and Privacy Policy"
            checked={field.value}
            onChange={field.onChange}
            error={errors.termsAccepted?.message}
          />
        )}
      />

      <div className="flex gap-2">
        <AppButton
          label="Back"
          variant="outline"
          className="flex-1"
          onClick={handleBack}
        />
        <AppButton label="Create Account" type="submit" className="flex-1" />
      </div>
    </form>
  );
}
