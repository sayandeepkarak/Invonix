import type { User } from "@/features/auth/types";
import type { DeliveryAgent } from "@/features/orders/types/agents";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  agentId?: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  user?: User;
  agent?: DeliveryAgent;
}

export interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

export interface UpdateOrderStatusPayload {
  orderId: string;
  status: OrderStatus;
}
