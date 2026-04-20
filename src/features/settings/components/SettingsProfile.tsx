"use client";

import { useAppSelector } from "@/store/hooks";
import { AppButton, AppInput } from "@/components/wrapper";
import { useForm } from "react-hook-form";
import { User } from "@/features/auth/types";
import { User as UserIcon, Mail } from "lucide-react";

export function SettingsProfile() {
  const { user } = useAppSelector((state) => state.auth);
  const { register, handleSubmit } = useForm<Partial<User>>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const onSubmit = (data: Partial<User>) => {
    console.log("Updating profile...", data);
  };

  return (
    <div className="grid gap-6 md:grid-cols-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <AppInput
            label="Full Name"
            icon={<UserIcon className="h-4 w-4" />}
            {...register("name")}
          />
          <AppInput
            label="Email Address"
            icon={<Mail className="h-4 w-4" />}
            disabled
            {...register("email")}
          />
        </div>

        <div className="flex justify-end pt-2">
          <AppButton type="submit">Update Profile</AppButton>
        </div>
      </form>
    </div>
  );
}
