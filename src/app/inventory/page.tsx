"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";

const InventoryManagement = dynamic(
  () => import("@/features/inventory/components/InventoryManagement"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted h-96 w-full animate-pulse rounded-xl" />
    ),
  },
);

export default function InventoryPage() {
  return (
    <LayoutApp>
      <InventoryManagement />
    </LayoutApp>
  );
}
