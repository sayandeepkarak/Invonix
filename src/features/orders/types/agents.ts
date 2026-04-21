import type { Order } from "@/features/orders/types/index";

export type AgentStatus = "AVAILABLE" | "BUSY" | "OFFLINE";

export interface DeliveryAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: AgentStatus;
  orderId?: string;
  createdAt: string;
  order?: Order;
}

export interface AgentState {
  agents: DeliveryAgent[];
  isLoading: boolean;
  error: string | null;
}
