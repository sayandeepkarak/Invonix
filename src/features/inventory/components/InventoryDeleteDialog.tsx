"use client";

import { AppDialog } from "@/components/wrapper";

interface InventoryDeleteDialogProps {
  open: boolean;
  productName: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function InventoryDeleteDialog({
  open,
  productName,
  isLoading,
  onClose,
  onConfirm,
}: InventoryDeleteDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onClose}
      title="Delete Product"
      submitLabel={isLoading ? "Deleting..." : "Delete Product"}
      cancelLabel="Cancel"
      onSubmit={onConfirm}
      isLoading={isLoading}
      maxWidth="sm:max-w-[425px]"
    >
      <p className="text-muted-foreground text-sm">
        Are you sure you want to delete{" "}
        <strong className="text-foreground">&quot;{productName}&quot;</strong>?
        This action cannot be undone and will remove the item from your
        inventory.
      </p>
    </AppDialog>
  );
}
