"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";

const SettingsManagement = dynamic(
  () => import("@/features/settings/components/SettingsManagement"),
  {
    ssr: false,
  },
);

export default function SettingsPage() {
  return (
    <LayoutApp>
      <SettingsManagement />
    </LayoutApp>
  );
}
