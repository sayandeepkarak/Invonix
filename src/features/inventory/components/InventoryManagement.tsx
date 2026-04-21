"use client";

import dynamic from "next/dynamic";
import { useInventory } from "@/features/inventory/hooks/useInventory";
import {
  InventoryToolbar,
  InventoryTable,
} from "@/features/inventory/components";
import { PageHeader } from "@/components/PageHeader";

const InventoryDialog = dynamic(
  () => import("@/features/inventory/components/InventoryDialog"),
  { ssr: false },
);
const InventoryDeleteDialog = dynamic(
  () => import("@/features/inventory/components/InventoryDeleteDialog"),
  { ssr: false },
);

export default function InventoryManagement() {
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
  );
}
