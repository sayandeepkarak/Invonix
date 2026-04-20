"use client";

import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppButton } from "@/components/wrapper";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import { MoreHorizontal, Eye, Truck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Order } from "@/features/orders/types";

interface OrderTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onUpdateStatus: (order: Order) => void;
  onAssign: (order: Order) => void;
}

export function OrderTable({
  orders,
  onView,
  onUpdateStatus,
  onAssign,
}: OrderTableProps) {
  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">
                  #{order.id.slice(0, 8).toUpperCase()}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.customerName}</span>
                    <span className="text-xs text-muted-foreground">
                      {order.customerEmail}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  ${order.totalAmount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-muted-foreground text-xs font-mono">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={(props: any) => (
                        <AppButton {...props} variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </AppButton>
                      )}
                    />
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => onView(order)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAssign(order)}
                        className="gap-2"
                      >
                        <Truck className="h-4 w-4" /> Assign Agent
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(order)}
                        className="gap-2"
                      >
                        Change Status
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
