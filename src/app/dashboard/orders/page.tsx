"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchOrdersRequest,
  fetchAgentsRequest,
  updateOrderStatusRequest,
  assignOrderRequest,
} from "@/features/orders/store/orderSlice";
import { OrderTable } from "@/features/orders/components/OrderTable";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";
import { AppButton } from "@/components/wrapper";
import type { Order, OrderStatus } from "@/features/orders/types";
import { type OrderStatusFilter } from "@/features/orders/const";
import { useOrderGenerator } from "@/features/orders/hooks/useOrderGenerator";
import { AgentAssignDialog } from "@/features/orders/components/AgentAssignDialog";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, agents, isLoading } = useAppSelector((state) => state.orders);
  const { generateRandomOrder } = useOrderGenerator();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
    dispatch(fetchAgentsRequest());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchStr = searchQuery.toLowerCase();
      const userName = order.user?.name?.toLowerCase() || "";
      const userEmail = order.user?.email?.toLowerCase() || "";
      const orderId = order.id.toLowerCase();

      const matchesSearch =
        userName.includes(searchStr) ||
        userEmail.includes(searchStr) ||
        orderId.includes(searchStr);

      const matchesStatus =
        statusFilter === "ALL" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    dispatch(updateOrderStatusRequest({ orderId, status }));
  };

  const handleAssignClick = (order: Order) => {
    setSelectedOrder(order);
    setIsAssignDialogOpen(true);
  };

  const handleAssignAgent = (agentId: string) => {
    if (selectedOrder) {
      dispatch(assignOrderRequest({ orderId: selectedOrder.id, agentId }));
      setIsAssignDialogOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <LayoutApp>
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <PageHeader
            title="Orders"
            subtitle="Manage customer orders and delivery updates."
            className="mb-0"
          />
          <AppButton onClick={generateRandomOrder} loading={isLoading}>
            Generate Order
          </AppButton>
        </div>

        <OrderFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <OrderTable
          orders={filteredOrders}
          onUpdateStatus={handleUpdateStatus}
          onAssign={handleAssignClick}
        />
      </div>

      <AgentAssignDialog
        open={isAssignDialogOpen}
        onClose={() => setIsAssignDialogOpen(false)}
        agents={agents}
        onAssign={handleAssignAgent}
        isLoading={isLoading}
      />
    </LayoutApp>
  );
}
