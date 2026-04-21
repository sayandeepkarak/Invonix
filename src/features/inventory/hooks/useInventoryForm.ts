import { useEffect, useCallback, useState } from "react";
import {
  InventoryFormValues,
} from "@/features/inventory/schema";
import type { Product } from "@/features/inventory/types";
import { INVENTORY_CATEGORY, INVENTORY_STEPS } from "@/features/inventory/const";

interface UseInventoryFormProps {
  open: boolean;
  isEdit: boolean;
  product: Product | null;
  onSubmit: (data: InventoryFormValues) => void;
}

export function useInventoryForm({
  open,
  isEdit,
  product,
  onSubmit,
}: UseInventoryFormProps) {
  const [currentStep, setCurrentStep] = useState<string>(INVENTORY_STEPS.BASIC_INFO);
  const [formData, setFormData] = useState<Partial<InventoryFormValues>>({});

  useEffect(() => {
    if (open) {
      if (isEdit && product) {
        setFormData({
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
        setFormData({
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
      setCurrentStep(INVENTORY_STEPS.BASIC_INFO);
    }
  }, [open, isEdit, product]);

  const handleNext = useCallback((stepData: Partial<InventoryFormValues>, nextStep: string) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep(nextStep);
  }, []);

  const handleBack = useCallback((prevStep: string) => {
    setCurrentStep(prevStep);
  }, []);

  const handleFinalSubmit = useCallback((finalData: Partial<InventoryFormValues>) => {
    const fullData = { ...formData, ...finalData } as InventoryFormValues;
    onSubmit(fullData);
  }, [formData, onSubmit]);

  return {
    currentStep,
    formData,
    handleNext,
    handleBack,
    handleFinalSubmit,
  };
}
