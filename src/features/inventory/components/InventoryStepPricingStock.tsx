"use client";

import { useForm } from "react-hook-form";
import { AppInput, AppButton } from "@/components/wrapper";
import { InventoryFormValues } from "@/features/inventory/schema";

interface InventoryStepPricingStockProps {
  onNext: (data: Partial<InventoryFormValues>) => void;
  onBack: () => void;
  initialData: Partial<InventoryFormValues>;
}

export function InventoryStepPricingStock({
  onNext,
  onBack,
  initialData,
}: InventoryStepPricingStockProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    defaultValues: initialData,
  });

  const onSubmit = (data: InventoryFormValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <AppInput
          label="Base Price ($) *"
          id="price"
          type="number"
          step="0.01"
          {...register("price", { 
            required: "Price is required",
            valueAsNumber: true,
            min: { value: 0, message: "Price must be positive" }
          })}
          error={errors.price?.message}
        />
        <AppInput
          label="Cost Price ($) *"
          id="costPrice"
          type="number"
          step="0.01"
          {...register("costPrice", { 
            required: "Cost price is required",
            valueAsNumber: true,
            min: { value: 0, message: "Cost price must be positive" }
          })}
          error={errors.costPrice?.message}
        />
        <AppInput
          label="Sale Price ($) *"
          id="salePrice"
          type="number"
          step="0.01"
          {...register("salePrice", { 
            required: "Sale price is required",
            valueAsNumber: true,
            min: { value: 0, message: "Sale price must be positive" }
          })}
          error={errors.salePrice?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AppInput
          label="Initial Stock *"
          id="stock"
          type="number"
          {...register("stock", { 
            required: "Stock is required",
            valueAsNumber: true,
            min: { value: 0, message: "Stock must be positive" }
          })}
          error={errors.stock?.message}
        />
        <AppInput
          label="Low Stock Threshold *"
          id="lowStockThreshold"
          type="number"
          {...register("lowStockThreshold", { 
            required: "Threshold is required",
            valueAsNumber: true,
            min: { value: 0, message: "Threshold must be positive" }
          })}
          error={errors.lowStockThreshold?.message}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <AppButton type="button" variant="outline" onClick={onBack}>
          Back
        </AppButton>
        <AppButton type="submit" className="px-8">
          Continue
        </AppButton>
      </div>
    </form>
  );
}
