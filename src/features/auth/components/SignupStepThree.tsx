"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupStepThreeSchema } from "@/features/auth/schema";
import { BUSINESS_TYPES } from "@/features/auth/const";
import { AppInput } from "@/components/common/AppInput";
import { AppSelect } from "@/components/common/AppSelect";
import { AppCheckbox } from "@/components/common/AppCheckbox";
import { AppButton } from "@/components/common/AppButton";

interface StepThreeData {
  businessName: string;
  businessType: string;
  phone: string;
  termsAccepted: true;
}

interface SignupStepThreeProps {
  onNext: (data: StepThreeData) => void;
  onBack: () => void;
  initialData?: Partial<StepThreeData>;
}

export function SignupStepThree({
  onNext,
  onBack,
  initialData,
}: SignupStepThreeProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StepThreeData>({
    resolver: zodResolver(signupStepThreeSchema),
    defaultValues: {
      businessName: initialData?.businessName ?? "",
      businessType: initialData?.businessType ?? "",
      phone: initialData?.phone ?? "",
      termsAccepted: (initialData?.termsAccepted ?? false) as any,
    },
  });
  const handleFormSubmit = handleSubmit(onNext);

  function handleBack() {
    onBack();
  }
  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
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
