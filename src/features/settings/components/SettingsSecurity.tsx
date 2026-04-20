"use client";

import { AppButton, AppInput } from "@/components/wrapper";
import { Key } from "lucide-react";

export function SettingsSecurity() {
  return (
    <div className="space-y-8 ">
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>
        <div className="grid gap-4">
          <AppInput
            label="Current Password"
            type="password"
            placeholder="********"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <AppInput
              label="New Password"
              type="password"
              placeholder="********"
            />
            <AppInput
              label="Confirm New Password"
              type="password"
              placeholder="********"
            />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <AppButton>Update Password</AppButton>
        </div>
      </section>
    </div>
  );
}
