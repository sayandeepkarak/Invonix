export type AgentStatus = "AVAILABLE" | "BUSY" | "OFFLINE";

export interface DeliveryAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: AgentStatus;
  rating: number;
  completedOrders: number;
  createdAt: string;
}

export interface AgentState {
  agents: DeliveryAgent[];
  isLoading: boolean;
  error: string | null;
}
