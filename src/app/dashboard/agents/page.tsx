"use client";

import dynamic from "next/dynamic";
import { useAgents } from "@/features/orders/hooks/useAgents";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";

const AgentCard = dynamic(() => {
  return import("@/features/orders/components/AgentCard").then((mod) => {
    return mod.AgentCard;
  });
}, { ssr: false });

export default function AgentsPage() {
  const { agents } = useAgents();

  return (
    <LayoutApp>
      <div className="space-y-6">
        <PageHeader
          title="Delivery Agents"
          subtitle="View and manage agent assignments."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!agents.length ? (
            <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl">
              <p className="text-muted-foreground">No delivery agents found.</p>
            </div>
          ) : (
            agents.map((agent) => {
              return <AgentCard key={agent.id} agent={agent} />;
            })
          )}
        </div>
      </div>
    </LayoutApp>
  );
}
