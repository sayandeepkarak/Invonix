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
  const statusOptions = ORDER_STATUS_OPTIONS.filter((o) => o.value !== "ALL");

  const columns: AppTableColumn<Order>[] = [
    {
      header: "Order ID",
      key: "id",
      className: "font-mono text-xs font-bold",
      render: (order) => `#${order.id.slice(0, 8).toUpperCase()}`,
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
          <span className="text-xs text-muted-foreground italic">
            Unassigned
          </span>
        ),
    },
    {
      header: "Date",
      key: "createdAt",
      className: "text-muted-foreground text-xs font-mono",
      render: (order) => new Date(order.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      key: "actions",
      className: "text-right",
      render: (order) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props: any) => (
              <AppButton {...props} variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </AppButton>
            )}
          />
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onAssign(order)} className="gap-2">
              <Truck className="h-4 w-4" /> Assign Agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AppTable columns={columns} data={orders} emptyMessage="No orders found." />
  );
}
