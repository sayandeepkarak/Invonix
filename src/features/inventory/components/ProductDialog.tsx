"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AppInput, AppSelect, AppButton } from "@/components/common";
import {
  productSchema,
  type ProductFormValues,
} from "@/features/inventory/schema";
import {
  PRODUCT_CATEGORIES,
  DEFAULT_LOW_STOCK_THRESHOLD,
} from "@/features/inventory/const";
import type { Product } from "@/features/inventory/types";

interface ProductDialogProps {
  open: boolean;
  isEdit: boolean;
  product: Product | null;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormValues) => void;
}

export function ProductDialog({
  open,
  isEdit,
  product,
  isLoading,
  onClose,
  onSubmit,
}: ProductDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: product?.name ?? "",
      sku: product?.sku ?? "",
      category: product?.category ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      costPrice: product?.costPrice ?? 0,
      salePrice: product?.salePrice ?? 0,
      stock: product?.stock ?? 0,
      lowStockThreshold:
        product?.lowStockThreshold ?? DEFAULT_LOW_STOCK_THRESHOLD,
      tags: product?.tags?.join(", ") ?? "",
    },
  });

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      reset();
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <AppInput
              id="product-name"
              label="Product Name"
              placeholder="Enter product name"
              error={errors.name?.message}
              {...register("name")}
            />
            <AppInput
              id="product-sku"
              label="SKU"
              placeholder="Enter SKU"
              error={errors.sku?.message}
              {...register("sku")}
            />
          </div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <AppSelect
                id="product-category"
                label="Category"
                placeholder="Select category"
                options={[...PRODUCT_CATEGORIES]}
                value={field.value}
                onChange={field.onChange}
                error={errors.category?.message}
              />
            )}
          />
          <AppInput
            id="product-description"
            label="Description"
            placeholder="Product description"
            error={errors.description?.message}
            {...register("description")}
          />
          <div className="grid grid-cols-3 gap-4">
            <AppInput
              id="product-price"
              label="Price"
              type="number"
              placeholder="0.00"
              error={errors.price?.message}
              {...register("price")}
            />
            <AppInput
              id="product-cost-price"
              label="Cost Price"
              type="number"
              placeholder="0.00"
              error={errors.costPrice?.message}
              {...register("costPrice")}
            />
            <AppInput
              id="product-sale-price"
              label="Sale Price"
              type="number"
              placeholder="0.00"
              error={errors.salePrice?.message}
              {...register("salePrice")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <AppInput
              id="product-stock"
              label="Stock"
              type="number"
              placeholder="0"
              error={errors.stock?.message}
              {...register("stock")}
            />
            <AppInput
              id="product-threshold"
              label="Low Stock Threshold"
              type="number"
              placeholder="10"
              error={errors.lowStockThreshold?.message}
              {...register("lowStockThreshold")}
            />
          </div>
          <AppInput
            id="product-tags"
            label="Tags (comma separated)"
            placeholder="electronics, gadgets"
            error={errors.tags?.message}
            {...register("tags")}
          />
          <DialogFooter className="gap-2">
            <AppButton
              label="Cancel"
              variant="outline"
              type="button"
              onClick={() => handleOpenChange(false)}
            />
            <AppButton
              label={isEdit ? "Save Changes" : "Add Product"}
              type="submit"
              loading={isLoading}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
