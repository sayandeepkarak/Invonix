import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useDebounce } from "@/hooks/use-debounce";
import {
  fetchProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  openDialog,
  closeDialog,
} from "@/features/inventory/store";
import type { Product } from "@/features/inventory/types";
import type { InventoryFormValues } from "@/features/inventory/schema";

export function useInventory() {
  const dispatch = useAppDispatch();
  const { products, selectedProduct, isLoading, isDialogOpen, isEditMode } =
    useAppSelector((state) => {
      return state.inventory;
    });

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleAddProduct = () => {
    return dispatch(openDialog(null));
  };

  const handleEdit = (product: Product) => {
    return dispatch(openDialog(product));
  };

  const handleDelete = (product: Product) => {
    return setDeleteTarget(product);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteProductRequest(deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleDialogSubmit = (data: InventoryFormValues) => {
    const tags = data.tags
      ? data.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => {
            return Boolean(t);
          })
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
  };

  const handleCloseDialog = () => {
    return dispatch(closeDialog());
  };

  return {
    products,
    selectedProduct,
    isLoading,
    isDialogOpen,
    isEditMode,
    searchQuery,
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
  };
}
