"use client";

import { useAddOrder } from "@/features/orders/hooks/useAddOrder";
import { AppDialog, AppButton, AppSelect } from "@/components/wrapper";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import type { Product } from "@/features/inventory/types";
import type { OrderItem } from "@/features/orders/types";

interface AddOrderDialogProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  onAddOrder: (items: OrderItem[]) => void;
  isLoading: boolean;
}

export function AddOrderDialog({
  open,
  onClose,
  products,
  onAddOrder,
  isLoading,
}: AddOrderDialogProps) {
  const {
    selectedItems,
    currentProductId,
    setCurrentProductId,
    productOptions,
    handleAddItem,
    updateQuantity,
    removeItem,
    handleSubmit,
    total,
  } = useAddOrder({ products, onAddOrder, onClose });

  return (
    <AppDialog
      open={open}
      onOpenChange={onClose}
      title="Create New Order"
      maxWidth="sm:max-w-[500px]"
      footer={
        <div className="flex justify-between items-center w-full">
          <div className="text-lg font-bold" suppressHydrationWarning>
            Total: ${total.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <AppButton variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </AppButton>
            <AppButton
              onClick={handleSubmit}
              disabled={selectedItems.length === 0 || isLoading}
              loading={isLoading}
            >
              Add Order
            </AppButton>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <AppSelect
              label="Select Product"
              placeholder="Choose a product..."
              options={productOptions}
              value={currentProductId}
              onChange={setCurrentProductId}
            />
          </div>
          <AppButton onClick={handleAddItem} disabled={!currentProductId}>
            Add
          </AppButton>
        </div>

        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {selectedItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-20" />
              <p>No items added yet</p>
            </div>
          ) : (
            selectedItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.product.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Available Stock: {item.product.stock}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="p-1 hover:bg-muted disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="p-1 hover:bg-muted disabled:opacity-50"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-muted-foreground w-12">
                    (Max: {item.product.stock})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="text-destructive p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppDialog>
  );
}
