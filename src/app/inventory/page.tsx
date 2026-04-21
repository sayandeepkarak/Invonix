"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";

const InventoryManagement = dynamic(
  () => import("@/features/inventory/components/InventoryManagement"),
  {
    ssr: false,
  },
);

export default function InventoryPage() {
  return (
    <LayoutApp>
      <InventoryManagement />
    </LayoutApp>
  );
}
