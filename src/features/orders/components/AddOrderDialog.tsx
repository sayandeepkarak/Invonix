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

export default function AddOrderDialog({
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
        <>
          <div className="text-lg font-bold" suppressHydrationWarning>
            Total: ${total.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <AppButton variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </AppButton>
            <AppButton
              onClick={handleSubmit}
              disabled={!selectedItems.length || isLoading}
              loading={isLoading}
            >
              Add Order
            </AppButton>
          </div>
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex items-end gap-2">
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

        <div className="max-h-[300px] space-y-4 overflow-y-auto pr-2">
          {!selectedItems.length ? (
            <div className="text-muted-foreground rounded-lg border-2 border-dashed py-8 text-center">
              <ShoppingCart className="mx-auto mb-2 h-8 w-8 opacity-20" />
              <p>No items added yet</p>
            </div>
          ) : (
            selectedItems.map((item) => {
              return (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-muted-foreground text-xs">
                      Available Stock: {item.product.stock}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md border">
                      <button
                        type="button"
                        onClick={() => {
                          return updateQuantity(item.product.id, -1);
                        }}
                        className="hover:bg-muted p-1 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          return updateQuantity(item.product.id, 1);
                        }}
                        className="hover:bg-muted p-1 disabled:opacity-50"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-muted-foreground w-12 text-[10px]">
                      (Max: {item.product.stock})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        return removeItem(item.product.id);
                      }}
                      className="text-destructive p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppDialog>
  );
}
