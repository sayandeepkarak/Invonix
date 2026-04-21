import { OrderStatus } from "@/features/orders/types";
import { AgentStatus } from "@/features/orders/types/agents";

import { APP_CONSTANTS } from "@/constants";

export const ORDER_STATUS = Object.freeze({
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const);

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.CONFIRMED]: "Confirmed",
  [ORDER_STATUS.PREPARING]: "Preparing",
  [ORDER_STATUS.OUT_FOR_DELIVERY]: "Out for Delivery",
  [ORDER_STATUS.DELIVERED]: "Delivered",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
};

export const ORDER_STATUS_OPTIONS = [
  { label: "All Statuses", value: APP_CONSTANTS.FILTER_ALL },
  ...Object.values(ORDER_STATUS).map((status) => ({
    label: ORDER_STATUS_LABELS[status as OrderStatus],
    value: status,
  })),
] as const;

export type OrderStatusFilter = OrderStatus | typeof APP_CONSTANTS.FILTER_ALL;

export const AGENT_STATUS = Object.freeze({
  AVAILABLE: "AVAILABLE",
  BUSY: "BUSY",
  OFFLINE: "OFFLINE",
} as const);

export const AGENT_STATUS_LABELS: Record<AgentStatus, string> = {
  [AGENT_STATUS.AVAILABLE]: "Available",
  [AGENT_STATUS.BUSY]: "Busy",
  [AGENT_STATUS.OFFLINE]: "Offline",
};

export const AGENT_STATUS_OPTIONS = Object.values(AGENT_STATUS).map(
  (status) => ({
    label: AGENT_STATUS_LABELS[status as AgentStatus],
    value: status,
  }),
);
