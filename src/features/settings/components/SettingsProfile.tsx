"use client";

import { useProfile } from "@/features/settings/hooks/useProfile";
import { AppButton, AppInput, AppCard } from "@/components/wrapper";

export function SettingsProfile() {
  const { form, isLoading, onSubmit } = useProfile();
  const { register, handleSubmit, formState: { isDirty, errors } } = form;

  return (
    <AppCard
      title="Profile Information"
      description="Update your personal and business details here."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <AppInput
              label="Full Name"
              id="name"
              placeholder="Your name"
              {...register("name")}
              error={errors.name?.message}
            />
            <AppInput
              label="Email Address"
              id="email"
              placeholder="Your email"
              disabled
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          <div className="space-y-4">
            <AppInput
              label="Business Name"
              id="businessName"
              placeholder="Your business name"
              {...register("businessName")}
              error={errors.businessName?.message}
            />
            <AppInput
              label="Phone Number"
              id="phone"
              placeholder="Your phone number"
              {...register("phone")}
              error={errors.phone?.message}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <AppButton
            type="submit"
            disabled={!isDirty || isLoading}
            loading={isLoading}
          >
            Update Profile
          </AppButton>
        </div>
      </form>
    </AppCard>
  );
}
