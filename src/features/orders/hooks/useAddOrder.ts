import { useState } from "react";
import type { Product } from "@/features/inventory/types";
import type { OrderItem } from "@/features/orders/types";

interface AddOrderItem {
  product: Product;
  quantity: number;
}

interface UseAddOrderProps {
  products: Product[];
  onAddOrder: (items: OrderItem[]) => void;
  onClose: () => void;
}

export function useAddOrder({
  products,
  onAddOrder,
  onClose,
}: UseAddOrderProps) {
  const [selectedItems, setSelectedItems] = useState<AddOrderItem[]>([]);
  const [currentProductId, setCurrentProductId] = useState<string>("");

  const availableProducts = products.filter((p) => {
    return (
      !selectedItems.find((item) => {
        return item.product.id === p.id;
      }) && p.stock > 0
    );
  });

  const productOptions = availableProducts.map((p) => {
    return {
      label: `${p.name} (${p.stock} in stock)`,
      value: p.id,
    };
  });

  const handleAddItem = () => {
    const product = products.find((p) => {
      return p.id === currentProductId;
    });
    if (product) {
      setSelectedItems((prev) => {
        return [...prev, { product, quantity: 1 }];
      });
      setCurrentProductId("");
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSelectedItems((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(
            1,
            Math.min(item.product.stock, item.quantity + delta),
          );
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const removeItem = (productId: string) => {
    setSelectedItems((prev) => {
      return prev.filter((item) => {
        return item.product.id !== productId;
      });
    });
  };

  const handleSubmit = () => {
    if (selectedItems.length > 0) {
      const mappedItems: OrderItem[] = selectedItems.map((item) => {
        return {
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.salePrice,
        };
      });
      onAddOrder(mappedItems);
      setSelectedItems([]);
      onClose();
    }
  };

  const total = selectedItems.reduce((sum, item) => {
    return sum + item.product.salePrice * item.quantity;
  }, 0);

  return {
    selectedItems,
    currentProductId,
    setCurrentProductId,
    productOptions,
    handleAddItem,
    updateQuantity,
    removeItem,
    handleSubmit,
    total,
  };
}
