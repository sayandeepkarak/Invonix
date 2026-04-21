"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";

const OrderManagement = dynamic(
  () => import("@/features/orders/components/OrderManagement"),
  {
    ssr: false,
  },
);

export default function OrdersPage() {
  return (
    <LayoutApp>
      <OrderManagement />
    </LayoutApp>
  );
}
