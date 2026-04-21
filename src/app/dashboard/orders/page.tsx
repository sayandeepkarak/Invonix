"use client";

import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderTable } from "@/features/orders/components/OrderTable";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";
import { AppButton } from "@/components/wrapper";
import { AgentAssignDialog } from "@/features/orders/components/AgentAssignDialog";
import { AddOrderDialog } from "@/features/orders/components/AddOrderDialog";

export default function OrdersPage() {
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
    <LayoutApp>
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <PageHeader
            title="Orders"
            subtitle="Manage customer orders and delivery updates."
            className="mb-0"
          />
          <AppButton onClick={() => setIsAddOrderOpen(true)}>
            Add Order
          </AppButton>
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
      </div>

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
    </LayoutApp>
  );
}
