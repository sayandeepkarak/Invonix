"use client";

import { useForm } from "react-hook-form";
import { AppInput, AppSelect, AppTextarea, AppButton } from "@/components/wrapper";
import { INVENTORY_CATEGORY_OPTIONS } from "@/features/inventory/const";
import { InventoryFormValues } from "@/features/inventory/schema";

interface InventoryStepBasicInfoProps {
  onNext: (data: Partial<InventoryFormValues>) => void;
  onClose: () => void;
  initialData: Partial<InventoryFormValues>;
}

export function InventoryStepBasicInfo({
  onNext,
  onClose,
  initialData,
}: InventoryStepBasicInfoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    defaultValues: initialData,
  });

  const categoryValue = watch("category");

  const onSubmit = (data: InventoryFormValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AppInput
        label="Product Name *"
        id="name"
        placeholder="e.g. Wireless Mouse"
        {...register("name", { required: "Product name is required" })}
        error={errors.name?.message}
        autoFocus
      />

      <div className="grid grid-cols-2 gap-4">
        <AppInput
          label="SKU *"
          id="sku"
          placeholder="PROD-001"
          {...register("sku", { required: "SKU is required" })}
          error={errors.sku?.message}
        />
        <AppSelect
          label="Category *"
          options={INVENTORY_CATEGORY_OPTIONS}
          value={categoryValue}
          onChange={(val) => setValue("category", val)}
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

      <div className="flex justify-end gap-3 pt-2">
        <AppButton type="button" variant="ghost" onClick={onClose}>
          Cancel
        </AppButton>
        <AppButton type="submit" className="px-8">
          Continue
        </AppButton>
      </div>
    </form>
  );
}
