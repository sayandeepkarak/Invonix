"use client";

import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/features/orders/types";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "@/features/orders/const";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300";
      case ORDER_STATUS.CONFIRMED:
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
      case ORDER_STATUS.PREPARING:
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400";
      case ORDER_STATUS.OUT_FOR_DELIVERY:
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400";
      case ORDER_STATUS.DELIVERED:
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400";
      case ORDER_STATUS.CANCELLED:
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <Badge variant="outline" className={getStatusStyles(status)}>
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
}
