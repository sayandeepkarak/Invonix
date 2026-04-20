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
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  notes?: string;
  assignedAgentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

export interface CreateOrderPayload extends Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "status"
> {
  status?: OrderStatus;
}

export interface UpdateOrderStatusPayload {
  orderId: string;
  status: OrderStatus;
}
