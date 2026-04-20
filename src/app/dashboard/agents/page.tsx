"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAgentsRequest } from "@/features/orders/store/orderSlice";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { AppCard } from "@/components/wrapper";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Package } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import type { AgentStatus } from "@/features/orders/types/agents";
import { AGENT_STATUS, AGENT_STATUS_LABELS } from "@/features/orders/const";

export default function AgentsPage() {
  const dispatch = useAppDispatch();
  const { agents } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAgentsRequest());
  }, [dispatch]);

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case AGENT_STATUS.AVAILABLE:
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case AGENT_STATUS.BUSY:
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case AGENT_STATUS.OFFLINE:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
      default:
        return "";
    }
  };

  return (
    <LayoutApp>
      <div className="space-y-6">
        <PageHeader
          title="Delivery Agents"
          subtitle="View and manage agent assignments."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AppCard key={agent.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{agent.name}</h3>
                    <Badge
                      variant="outline"
                      className={getStatusColor(agent.status)}
                    >
                      {AGENT_STATUS_LABELS[agent.status]}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {agent.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {agent.phone}
                </div>
              </div>

              {agent.order && (
                <div className="mt-4 p-3 bg-muted/50 rounded-md space-y-2 border">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                    <Package className="h-3 w-3" /> Active Order
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs">
                      #{agent.order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <Badge variant="secondary" className="text-[10px] h-5">
                      {agent.order.status}
                    </Badge>
                  </div>
                </div>
              )}
            </AppCard>
          ))}
        </div>
      </div>
    </LayoutApp>
  );
}
