"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";

const AgentManagement = dynamic(
  () => import("@/features/orders/components/AgentManagement"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted h-96 w-full animate-pulse rounded-xl" />
    ),
  },
);

export default function AgentsPage() {
  return (
    <LayoutApp>
      <AgentManagement />
    </LayoutApp>
  );
}
