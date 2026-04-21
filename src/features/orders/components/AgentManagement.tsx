"use client";

import dynamic from "next/dynamic";
import { useAgents } from "@/features/orders/hooks/useAgents";
import { PageHeader } from "@/components/PageHeader";

const AgentCard = dynamic(
  () => import("@/features/orders/components/AgentCard"),
  { ssr: false },
);

export default function AgentManagement() {
  const { agents } = useAgents();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Delivery Agents"
        subtitle="View and manage agent assignments."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {!agents.length ? (
          <div className="col-span-full rounded-xl border-2 border-dashed py-12 text-center">
            <p className="text-muted-foreground">No delivery agents found.</p>
          </div>
        ) : (
          agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)
        )}
      </div>
    </div>
  );
}
