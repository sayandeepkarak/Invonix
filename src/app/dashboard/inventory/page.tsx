"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  openDialog,
  closeDialog,
} from "@/features/inventory/store";
import {
  InventoryToolbar,
  InventoryTable,
  InventoryDialog,
  InventoryDeleteDialog,
} from "@/features/inventory/components";
import { LayoutApp } from "@/components/layout/LayoutApp";
import { PageHeader } from "@/components/PageHeader";
import type { Product } from "@/features/inventory/types";
import type { InventoryFormValues } from "@/features/inventory/schema";

export default function InventoryPage() {
  const dispatch = useAppDispatch();

  const { products, selectedProduct, isLoading, isDialogOpen, isEditMode } =
    useAppSelector((state) => state.inventory);

  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  function handleAddProduct() {
    dispatch(openDialog(null));
  }

  function handleEdit(product: Product) {
    dispatch(openDialog(product));
  }

  function handleDelete(product: Product) {
    setDeleteTarget(product);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    dispatch(deleteProductRequest(deleteTarget.id));
    setDeleteTarget(null);
  }

  function handleDialogSubmit(data: InventoryFormValues) {
    const tags = data.tags
      ? data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    if (isEditMode && selectedProduct) {
      dispatch(
        updateProductRequest({
          id: selectedProduct.id,
          ...data,
          tags,
          images: selectedProduct.images,
        }),
      );
    } else {
      dispatch(
        createProductRequest({
          ...data,
          tags,
          images: [],
        }),
      );
    }
  }

  return (
    <LayoutApp>
      <div className="space-y-6">
        <PageHeader
          title="Inventory"
          subtitle="Manage your products and stock levels."
        />

        <InventoryToolbar
          onSearch={handleSearch}
          onAddProduct={handleAddProduct}
        />

        <InventoryTable
          products={products}
          searchQuery={searchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <InventoryDialog
          open={isDialogOpen}
          isEdit={isEditMode}
          product={selectedProduct}
          isLoading={isLoading}
          onClose={() => dispatch(closeDialog())}
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
