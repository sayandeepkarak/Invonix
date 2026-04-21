"use client";

import {
  AppButton,
  AppSelect,
  AppTable,
  AppBadge,
  type AppTableColumn,
} from "@/components/wrapper";
import type { Order, OrderStatus } from "@/features/orders/types";
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_OPTIONS,
} from "@/features/orders/const";
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
  const statusOptions = ORDER_STATUS_OPTIONS.filter(
    (o) => o.value !== APP_CONSTANTS.FILTER_ALL,
  );

  const columns: AppTableColumn<Order>[] = [
    {
      header: "Order ID",
      key: "id",
      render: (order) => {
        return <span>#{order.id.slice(0, 8).toUpperCase()}</span>;
      },
    },
    {
      header: "Customer",
      key: "user",
      render: (order) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium">{order.user?.name || "Unknown"}</span>
            <span className="text-muted-foreground text-xs">
              {order.user?.email}
            </span>
          </div>
        );
      },
    },
    {
      header: "Items",
      key: "items",
      render: (order) => {
        const totalQty = order.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        return <span className="font-medium">{totalQty}</span>;
      },
    },
    {
      header: "Total",
      key: "totalAmount",
      className: "font-semibold",
      render: (order) => {
        return `$${order.totalAmount.toLocaleString()}`;
      },
    },
    {
      header: "Status",
      key: "status",
      render: (order) => {
        const isFinalized = (
          [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED] as OrderStatus[]
        ).includes(order.status);

        if (isFinalized) {
          return (
            <AppBadge
              variant={
                order.status === ORDER_STATUS.DELIVERED
                  ? "success"
                  : "destructive"
              }
              className="text-xs"
            >
              {ORDER_STATUS_LABELS[order.status]}
            </AppBadge>
          );
        }

        return (
          <AppSelect
            options={statusOptions}
            value={order.status}
            onChange={(val) => onUpdateStatus(order.id, val as OrderStatus)}
            className="h-8 w-[140px] text-xs"
            disabled={!order.agent}
          />
        );
      },
    },
    {
      header: "Agent",
      key: "agent",
      render: (order) => {
        if (order.agent) {
          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{order.agent.name}</span>
              <span className="text-muted-foreground text-[10px]">
                {order.agent.phone}
              </span>
            </div>
          );
        }

        const isFinalized = (
          [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED] as OrderStatus[]
        ).includes(order.status);
        if (isFinalized)
          return (
            <span className="text-muted-foreground text-sm italic">N/A</span>
          );

        return (
          <AppButton
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs"
            onClick={() => {
              return onAssign(order);
            }}
          >
            Assign Agent
          </AppButton>
        );
      },
    },
    {
      header: "Date",
      key: "createdAt",
      render: (order) => {
        return (
          <span
            className="text-muted-foreground text-sm"
            suppressHydrationWarning
          >
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        );
      },
    },
  ];

  return (
    <AppTable columns={columns} data={orders} emptyMessage="No orders found." />
  );
}
