"use client";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/PageHeader";

const SettingsProfile = dynamic(
  () => import("@/features/settings/components/SettingsProfile"),
  { ssr: false },
);

export default function SettingsManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Account Settings"
        subtitle="Manage your profile information and business details."
      />

      <div>
        <SettingsProfile />
      </div>
    </div>
  );
}
