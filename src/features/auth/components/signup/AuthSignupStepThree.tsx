"use client";

import { useForm } from "react-hook-form";
import { BUSINESS_TYPES, BUSINESS_TYPE } from "@/features/auth/const";
import {
  AppInput,
  AppSelect,
  AppCheckbox,
  AppButton,
} from "@/components/wrapper";
import type {
  SignupStepThreeFormValues,
  SignupStepThreeProps,
} from "@/features/auth/types";

export function AuthSignupStepThree({
  onNext,
  onBack,
}: SignupStepThreeProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupStepThreeFormValues>({
    defaultValues: {
      businessName: "",
      businessType: BUSINESS_TYPE.RETAIL,
      phone: "",
      termsAccepted: true,
    },
  });

  const onSubmit = (data: SignupStepThreeFormValues): void => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AppInput
        label="Business Name"
        id="businessName"
        placeholder="Acme Inc."
        {...register("businessName", { required: "Business name is required" })}
        error={errors.businessName?.message}
      />
      <AppSelect
        label="Business Type"
        id="businessType"
        options={BUSINESS_TYPES}
        defaultValue={BUSINESS_TYPE.RETAIL}
        onChange={(val) => {
          setValue("businessType", val as SignupStepThreeFormValues["businessType"]);
        }}
        error={errors.businessType?.message}
      />
      <AppInput
        label="Phone Number"
        id="phone"
        placeholder="+1 (555) 000-0000"
        {...register("phone", { required: "Phone number is required" })}
        error={errors.phone?.message}
      />

      <div className="pt-2">
        <AppCheckbox
          label="I agree to the Terms of Service and Privacy Policy"
          id="termsAccepted"
          checked={watch("termsAccepted")}
          onCheckedChange={(checked) => {
            return setValue("termsAccepted", !!checked as true, {
              shouldValidate: true,
            });
          }}
          error={errors.termsAccepted?.message}
        />
      </div>

      <div className="flex gap-4 pt-2">
        <AppButton
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </AppButton>
        <AppButton type="submit" className="flex-1">
          Complete Signup
        </AppButton>
      </div>
    </form>
  );
}
