"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchOrdersRequest,
  updateOrderStatusRequest,
} from "@/features/orders/store/orderSlice";
import { OrderTable } from "@/features/orders/components/OrderTable";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";
import type { Order, OrderStatus } from "@/features/orders/types";
import { ORDER_STATUS, type OrderStatusFilter } from "@/features/orders/const";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("ALL");

  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleView = (order: Order) => {
    console.log("View order", order);
  };

  const handleUpdateStatus = (order: Order) => {
    const statuses: OrderStatus[] = [
      ORDER_STATUS.PENDING,
      ORDER_STATUS.CONFIRMED,
      ORDER_STATUS.PREPARING,
      ORDER_STATUS.OUT_FOR_DELIVERY,
      ORDER_STATUS.DELIVERED,
    ];
    const currentIndex = statuses.indexOf(order.status);
    if (currentIndex !== -1 && currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      if (nextStatus) {
        dispatch(
          updateOrderStatusRequest({ orderId: order.id, status: nextStatus }),
        );
      }
    }
  };

  const handleAssign = (order: Order) => {
    console.log("Assign order", order);
  };

  return (
    <LayoutApp>
      <div className="space-y-6">
        <PageHeader
          title="Orders"
          subtitle="Manage customer orders and delivery updates."
        />

        <OrderFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <OrderTable
          orders={filteredOrders}
          onView={handleView}
          onUpdateStatus={handleUpdateStatus}
          onAssign={handleAssign}
        />
      </div>
    </LayoutApp>
  );
}
