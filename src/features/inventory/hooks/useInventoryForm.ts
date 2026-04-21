import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InventoryFormValues,
  InventorySchema,
} from "@/features/inventory/schema";
import type { Product } from "@/features/inventory/types";
import { INVENTORY_CATEGORY } from "@/features/inventory/const";

interface UseInventoryFormProps {
  open: boolean;
  isEdit: boolean;
  product: Product | null;
  onSubmit: (data: InventoryFormValues) => void;
  onClose: () => void;
}

export function useInventoryForm({
  open,
  isEdit,
  product,
  onSubmit,
  onClose,
}: UseInventoryFormProps) {
  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(InventorySchema) as any,
    defaultValues: {
      name: "",
      sku: "",
      category: INVENTORY_CATEGORY.ELECTRONICS,
      price: 0,
      costPrice: 0,
      salePrice: 0,
      stock: 0,
      lowStockThreshold: 5,
      description: "",
      tags: "",
    },
  });

  const { reset, setValue, watch, handleSubmit } = form;
  const categoryValue = watch("category");

  useEffect(() => {
    if (open) {
      if (isEdit && product) {
        reset({
          name: product.name,
          sku: product.sku,
          category: product.category,
          price: product.price,
          costPrice: product.costPrice,
          salePrice: product.salePrice,
          stock: product.stock,
          lowStockThreshold: product.lowStockThreshold,
          description: product.description || "",
          tags: product.tags.join(", "),
        });
      } else {
        reset({
          name: "",
          sku: "",
          category: INVENTORY_CATEGORY.ELECTRONICS,
          price: 0,
          costPrice: 0,
          salePrice: 0,
          stock: 0,
          lowStockThreshold: 5,
          description: "",
          tags: "",
        });
      }
    }
  }, [open, isEdit, product, reset]);

  const handleCategoryChange = useCallback(
    (val: string) => {
      setValue("category", val);
    },
    [setValue],
  );

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return {
    form,
    categoryValue,
    handleCategoryChange,
    handleFormSubmit,
  };
}
