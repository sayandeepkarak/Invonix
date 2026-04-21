"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";

const OrderManagement = dynamic(
  () => import("@/features/orders/components/OrderManagement"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted h-96 w-full animate-pulse rounded-xl" />
    ),
  },
);

export default function OrdersPage() {
  return (
    <LayoutApp>
      <OrderManagement />
    </LayoutApp>
  );
}
