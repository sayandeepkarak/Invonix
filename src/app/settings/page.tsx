"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";

const SettingsManagement = dynamic(
  () => import("@/features/settings/components/SettingsManagement"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted h-96 w-full animate-pulse rounded-xl" />
    ),
  },
);

export default function SettingsPage() {
  return (
    <LayoutApp>
      <SettingsManagement />
    </LayoutApp>
  );
}
