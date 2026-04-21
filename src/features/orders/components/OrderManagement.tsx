"use client";

import dynamic from "next/dynamic";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderTable } from "@/features/orders/components/OrderTable";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { PageHeader } from "@/components/PageHeader";
import { AppButton } from "@/components/wrapper";

const AgentAssignDialog = dynamic(
  () => import("@/features/orders/components/AgentAssignDialog"),
  { ssr: false },
);
const AddOrderDialog = dynamic(
  () => import("@/features/orders/components/AddOrderDialog"),
  { ssr: false },
);

export default function OrderManagement() {
  const {
    orders,
    agents,
    products,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    isAddOrderOpen,
    setIsAddOrderOpen,
    handleUpdateStatus,
    handleAssignClick,
    handleAssignAgent,
    handleAddOrder,
  } = useOrders();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <PageHeader
          title="Orders"
          subtitle="Manage customer orders and delivery updates."
          className="mb-0"
        />
        <AppButton onClick={() => setIsAddOrderOpen(true)}>Add Order</AppButton>
      </div>

      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <OrderTable
        orders={orders}
        onUpdateStatus={handleUpdateStatus}
        onAssign={handleAssignClick}
      />

      <AgentAssignDialog
        open={isAssignDialogOpen}
        onClose={() => setIsAssignDialogOpen(false)}
        agents={agents}
        onAssign={handleAssignAgent}
        isLoading={isLoading}
      />

      <AddOrderDialog
        open={isAddOrderOpen}
        onClose={() => setIsAddOrderOpen(false)}
        products={products}
        onAddOrder={handleAddOrder}
        isLoading={isLoading}
      />
    </div>
  );
}
