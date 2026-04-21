"use client";

import {
  AppButton,
  AppSelect,
  AppTable,
  type AppTableColumn,
} from "@/components/wrapper";
import { MoreHorizontal, Truck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Order, OrderStatus } from "@/features/orders/types";
import { ORDER_STATUS_OPTIONS } from "@/features/orders/const";
import { APP_CONSTANTS } from "@/constants";

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onAssign: (order: Order) => void;
}

export function OrderTable({
  orders,
  onUpdateStatus,
  onAssign,
}: OrderTableProps) {
  const statusOptions = ORDER_STATUS_OPTIONS.filter((o) => o.value !== APP_CONSTANTS.FILTER_ALL);

  const columns: AppTableColumn<Order>[] = [
    {
      header: "Order ID",
      key: "id",
      render: (order) => (
        <span>#{order.id.slice(0, 8).toUpperCase()}</span>
      ),
    },
    {
      header: "Customer",
      key: "user",
      render: (order) => (
        <div className="flex flex-col">
          <span className="font-medium">{order.user?.name || "Unknown"}</span>
          <span className="text-xs text-muted-foreground">
            {order.user?.email}
          </span>
        </div>
      ),
    },
    {
      header: "Total",
      key: "totalAmount",
      className: "font-semibold",
      render: (order) => `$${order.totalAmount.toLocaleString()}`,
    },
    {
      header: "Status",
      key: "status",
      render: (order) => (
        <AppSelect
          options={statusOptions}
          value={order.status}
          onChange={(val) => onUpdateStatus(order.id, val as OrderStatus)}
          className="h-8 w-[140px] text-xs"
          disabled={!order.agent}
        />
      ),
    },
    {
      header: "Agent",
      key: "agent",
      render: (order) =>
        order.agent ? (
          <div className="flex flex-col">
            <span className="text-sm font-medium">{order.agent.name}</span>
            <span className="text-[10px] text-muted-foreground">
              {order.agent.phone}
            </span>
          </div>
        ) : (
          <AppButton
            variant="outline"
            size="sm"
            className="h-8 text-xs px-3"
            onClick={() => onAssign(order)}
          >
            Assign Agent
          </AppButton>
        ),
    },
    {
      header: "Date",
      key: "createdAt",
      render: (order) => (
        <span className="text-sm text-muted-foreground" suppressHydrationWarning>
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <AppTable columns={columns} data={orders} emptyMessage="No orders found." />
  );
}
