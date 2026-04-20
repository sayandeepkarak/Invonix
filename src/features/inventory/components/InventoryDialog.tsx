"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppDialog,
  AppInput,
  AppSelect,
  AppTextarea,
  AppButton,
} from "@/components/wrapper";
import {
  InventoryFormValues,
  InventorySchema,
} from "@/features/inventory/schema";
import type { Product } from "@/features/inventory/types";
import {
  INVENTORY_CATEGORY,
  INVENTORY_CATEGORY_OPTIONS,
} from "@/features/inventory/const";

interface InventoryDialogProps {
  open: boolean;
  isEdit: boolean;
  product: Product | null;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryFormValues) => void;
}

export function InventoryDialog({
  open,
  isEdit,
  product,
  isLoading,
  onClose,
  onSubmit,
}: InventoryDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(InventorySchema) as any,
  });

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

  return (
    <AppDialog
      open={open}
      onOpenChange={onClose}
      title={isEdit ? "Edit Product" : "Add Product"}
      maxWidth="sm:max-w-[600px]"
      footer={
        <div className="flex gap-2 justify-end w-full">
          <AppButton variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </AppButton>
          <AppButton
            form="inventory-form"
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            {isEdit ? "Update Product" : "Create Product"}
          </AppButton>
        </div>
      }
    >
      <form
        id="inventory-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid gap-4">
          <AppInput
            label="Product Name"
            id="name"
            placeholder="e.g. Wireless Mouse"
            {...register("name")}
            error={errors.name?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <AppInput
              label="SKU"
              id="sku"
              placeholder="PROD-001"
              {...register("sku")}
              error={errors.sku?.message}
            />
            <AppSelect
              label="Category"
              options={INVENTORY_CATEGORY_OPTIONS}
              defaultValue={product?.category || INVENTORY_CATEGORY.ELECTRONICS}
              onChange={(val) => setValue("category", val)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <AppInput
              label="Base Price ($)"
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              error={errors.price?.message}
            />
            <AppInput
              label="Cost Price ($)"
              id="costPrice"
              type="number"
              step="0.01"
              {...register("costPrice", { valueAsNumber: true })}
              error={errors.costPrice?.message}
            />
            <AppInput
              label="Sale Price ($)"
              id="salePrice"
              type="number"
              step="0.01"
              {...register("salePrice", { valueAsNumber: true })}
              error={errors.salePrice?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AppInput
              label="Initial Stock"
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              error={errors.stock?.message}
            />
            <AppInput
              label="Low Stock Threshold"
              id="lowStockThreshold"
              type="number"
              {...register("lowStockThreshold", { valueAsNumber: true })}
              error={errors.lowStockThreshold?.message}
            />
          </div>

          <AppTextarea
            label="Description"
            id="description"
            placeholder="Product details and specifications..."
            className="min-h-25"
            {...register("description")}
            error={errors.description?.message}
          />

          <AppInput
            label="Tags (comma separated)"
            id="tags"
            placeholder="gadget, tech, wireless"
            {...register("tags")}
          />
        </div>
      </form>
    </AppDialog>
  );
}
