"use client";

import { LayoutApp } from "@/components/layout/LayoutApp";
import { SettingsProfile } from "@/features/settings/components/SettingsProfile";
import { PageHeader } from "@/components/PageHeader";

export default function SettingsPage() {
  return (
    <LayoutApp>
      <div className="space-y-6">
        <PageHeader
          title="Account Settings"
          subtitle="Manage your profile information and business details."
        />

        <div className="max-w-4xl">
          <SettingsProfile />
        </div>
      </div>
    </LayoutApp>
  );
}
