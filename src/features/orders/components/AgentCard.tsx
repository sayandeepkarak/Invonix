"use client";

import { AppCard } from "@/components/wrapper";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Package } from "lucide-react";
import type {
  DeliveryAgent,
  AgentStatus,
} from "@/features/orders/types/agents";
import { AGENT_STATUS, AGENT_STATUS_LABELS } from "@/features/orders/const";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: DeliveryAgent;
  className?: string;
}

export default function AgentCard({ agent, className }: AgentCardProps) {
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
    <AppCard
      className={cn("transition-all duration-200 hover:shadow-lg", className)}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-bold">{agent.name}</h3>
          <Badge variant="outline" className={getStatusColor(agent.status)}>
            {AGENT_STATUS_LABELS[agent.status]}
          </Badge>
        </div>
      </div>

      <div className="text-muted-foreground space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" /> {agent.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" /> {agent.phone}
        </div>
      </div>

      {agent.order && (
        <div className="bg-muted/50 mt-4 space-y-2 rounded-md border p-3">
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase">
            <Package className="h-3 w-3" /> Active Order
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary font-mono text-xs font-bold">
              #{agent.order.id.slice(0, 8).toUpperCase()}
            </span>
            <Badge variant="secondary" className="h-5 text-[10px]">
              {agent.order.status}
            </Badge>
          </div>
        </div>
      )}
    </AppCard>
  );
}
