"use client";

import { useInventory } from "@/features/inventory/hooks/useInventory";
import {
  InventoryToolbar,
  InventoryTable,
  InventoryDialog,
  InventoryDeleteDialog,
} from "@/features/inventory/components";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";

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
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </LayoutApp>
  );
}
