"use client";

import { useForm } from "react-hook-form";
import { AppInput, AppButton } from "@/components/wrapper";
import { InventoryFormValues } from "@/features/inventory/schema";

interface InventoryStepTagsProps {
  onSubmit: (data: Partial<InventoryFormValues>) => void;
  onBack: () => void;
  initialData: Partial<InventoryFormValues>;
  isLoading: boolean;
  isEdit: boolean;
}

export function InventoryStepTags({
  onSubmit,
  onBack,
  initialData,
  isLoading,
  isEdit,
}: InventoryStepTagsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: InventoryFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <AppInput
        label="Tags (comma separated)"
        id="tags"
        placeholder="gadget, tech, wireless"
        {...register("tags")}
        error={errors.tags?.message}
        autoFocus
      />

      <div className="flex justify-end gap-3 pt-2">
        <AppButton type="button" variant="outline" onClick={onBack}>
          Back
        </AppButton>
        <AppButton type="submit" className="px-8" loading={isLoading}>
          {isEdit ? "Update Product" : "Create Product"}
        </AppButton>
      </div>
    </form>
  );
}
