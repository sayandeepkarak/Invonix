"use client";

import dynamic from "next/dynamic";
import { LayoutApp } from "@/components/layout/LayoutApp";

const AgentManagement = dynamic(
  () => import("@/features/orders/components/AgentManagement"),
  {
    ssr: false,
  },
);

export default function AgentsPage() {
  return (
    <LayoutApp>
      <AgentManagement />
    </LayoutApp>
  );
}
