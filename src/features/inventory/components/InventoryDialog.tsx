import { useInventoryForm } from "@/features/inventory/hooks/useInventoryForm";
import { AppDialog } from "@/components/wrapper";
import { INVENTORY_STEPS } from "@/features/inventory/const";
import type { Product } from "@/features/inventory/types";
import { InventoryFormValues } from "@/features/inventory/schema";
import { InventoryStepBasicInfo } from "@/features/inventory/components/InventoryStepBasicInfo";
import { InventoryStepPricingStock } from "@/features/inventory/components/InventoryStepPricingStock";
import { InventoryStepTags } from "@/features/inventory/components/InventoryStepTags";

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
    currentStep, 
    formData, 
    handleNext, 
    handleBack, 
    handleFinalSubmit 
  } = useInventoryForm({
    open,
    isEdit,
    product,
    onSubmit,
  });

  const stepTitles: Record<string, string> = {
    [INVENTORY_STEPS.BASIC_INFO]: "Basic Information",
    [INVENTORY_STEPS.PRICING_STOCK]: "Pricing & Stock",
    [INVENTORY_STEPS.TAGS]: "Tags & Categorization",
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onClose}
      title={isEdit ? `Edit Product: ${stepTitles[currentStep]}` : `Add Product: ${stepTitles[currentStep]}`}
      maxWidth="sm:max-w-[500px]"
      footer={null}
    >
      <div className="py-2">
        {currentStep === INVENTORY_STEPS.BASIC_INFO && (
          <InventoryStepBasicInfo
            onNext={(data) => handleNext(data, INVENTORY_STEPS.PRICING_STOCK)}
            onClose={onClose}
            initialData={formData}
          />
        )}

        {currentStep === INVENTORY_STEPS.PRICING_STOCK && (
          <InventoryStepPricingStock
            onNext={(data) => handleNext(data, INVENTORY_STEPS.TAGS)}
            onBack={() => handleBack(INVENTORY_STEPS.BASIC_INFO)}
            initialData={formData}
          />
        )}

        {currentStep === INVENTORY_STEPS.TAGS && (
          <InventoryStepTags
            onSubmit={handleFinalSubmit}
            onBack={() => handleBack(INVENTORY_STEPS.PRICING_STOCK)}
            initialData={formData}
            isLoading={isLoading}
            isEdit={isEdit}
          />
        )}
      </div>
    </AppDialog>
  );
}
