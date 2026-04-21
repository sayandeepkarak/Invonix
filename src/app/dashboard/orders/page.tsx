"use client";

import dynamic from "next/dynamic";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderTable } from "@/features/orders/components/OrderTable";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";
import { AppButton } from "@/components/wrapper";

const AgentAssignDialog = dynamic(() => {
  return import("@/features/orders/components/AgentAssignDialog").then((mod) => {
    return mod.AgentAssignDialog;
  });
}, { ssr: false });

const AddOrderDialog = dynamic(() => {
  return import("@/features/orders/components/AddOrderDialog").then((mod) => {
    return mod.AddOrderDialog;
  });
}, { ssr: false });

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
          <AppButton onClick={() => {
            return setIsAddOrderOpen(true);
          }}>
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
        onClose={() => {
          return setIsAssignDialogOpen(false);
        }}
        agents={agents}
        onAssign={handleAssignAgent}
        isLoading={isLoading}
      />

      <AddOrderDialog
        open={isAddOrderOpen}
        onClose={() => {
          return setIsAddOrderOpen(false);
        }}
        products={products}
        onAddOrder={handleAddOrder}
        isLoading={isLoading}
      />
    </LayoutApp>
  );
}
