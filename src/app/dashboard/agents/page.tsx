"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAgentsRequest,
  updateAgentStatusRequest,
} from "@/features/orders/store/orderSlice";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { AppCard, AppButton } from "@/components/wrapper";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, Star, Package, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import type {
  DeliveryAgent,
  AgentStatus,
} from "@/features/orders/types/agents";
import { AGENT_STATUS, AGENT_STATUS_LABELS } from "@/features/orders/const";

export default function AgentsPage() {
  const dispatch = useAppDispatch();
  const { agents, isLoading } = useAppSelector((state) => state.orders);

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
        <div className="flex justify-between items-end">
          <PageHeader
            title="Delivery Agents"
            subtitle="Monitor and manage your delivery personnel."
            className="mb-0"
          />
          <AppButton>Add New Agent</AppButton>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AppCard key={agent.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
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
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">{agent.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {agent.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {agent.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" /> {agent.completedOrders} orders
                  completed
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex gap-2">
                <AppButton variant="outline" size="sm" className="flex-1">
                  View Info
                </AppButton>
                <AppButton size="sm" className="flex-1">
                  Manage Status
                </AppButton>
              </div>
            </AppCard>
          ))}
        </div>
      </div>
    </LayoutApp>
  );
}
