"use client";

import dynamic from "next/dynamic";
import { useInventory } from "@/features/inventory/hooks/useInventory";
import {
  InventoryToolbar,
  InventoryTable,
} from "@/features/inventory/components";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";

const InventoryDialog = dynamic(() => {
  return import("@/features/inventory/components/InventoryDialog").then((mod) => {
    return mod.InventoryDialog;
  });
}, { ssr: false });

const InventoryDeleteDialog = dynamic(() => {
  return import("@/features/inventory/components/InventoryDeleteDialog").then((mod) => {
    return mod.InventoryDeleteDialog;
  });
}, { ssr: false });

export default function InventoryPage() {
  const {
    products,
    selectedProduct,
    isLoading,
    isDialogOpen,
    isEditMode,
    setSearchQuery,
    debouncedSearchQuery,
    deleteTarget,
    setDeleteTarget,
    handleAddProduct,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleDialogSubmit,
    handleCloseDialog,
  } = useInventory();

  return (
    <LayoutApp>
      <div className="space-y-6">
        <PageHeader
          title="Inventory"
          subtitle="Manage your products and stock levels."
        />

        <InventoryToolbar
          onSearch={setSearchQuery}
          onAddProduct={handleAddProduct}
        />

        <InventoryTable
          products={products}
          searchQuery={debouncedSearchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <InventoryDialog
          open={isDialogOpen}
          isEdit={isEditMode}
          product={selectedProduct}
          isLoading={isLoading}
          onClose={handleCloseDialog}
          onSubmit={handleDialogSubmit}
        />

        <InventoryDeleteDialog
          open={!!deleteTarget}
          productName={deleteTarget?.name ?? ""}
          isLoading={isLoading}
          onClose={() => {
            return setDeleteTarget(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </LayoutApp>
  );
}
