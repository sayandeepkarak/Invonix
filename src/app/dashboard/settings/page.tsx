"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";

const SettingsProfile = dynamic(() => {
  return import("@/features/settings/components/SettingsProfile").then((mod) => {
    return mod.SettingsProfile;
  });
}, { ssr: false });

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
