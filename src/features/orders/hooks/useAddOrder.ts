import { useState, useCallback, useMemo } from "react";
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

export function useAddOrder({ products, onAddOrder, onClose }: UseAddOrderProps) {
  const [selectedItems, setSelectedItems] = useState<AddOrderItem[]>([]);
  const [currentProductId, setCurrentProductId] = useState<string>("");

  const availableProducts = useMemo(() => {
    return products.filter((p) => {
      return (
        !selectedItems.find((item) => {
          return item.product.id === p.id;
        }) && p.stock > 0
      );
    });
  }, [products, selectedItems]);

  const productOptions = useMemo(() => {
    return availableProducts.map((p) => {
      return {
        label: `${p.name} (${p.stock} in stock)`,
        value: p.id,
      };
    });
  }, [availableProducts]);

  const handleAddItem = useCallback(() => {
    const product = products.find((p) => {
      return p.id === currentProductId;
    });
    if (product) {
      setSelectedItems((prev) => {
        return [...prev, { product, quantity: 1 }];
      });
      setCurrentProductId("");
    }
  }, [currentProductId, products]);

  const updateQuantity = useCallback((productId: string, delta: number) => {
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
  }, []);

  const removeItem = useCallback((productId: string) => {
    setSelectedItems((prev) => {
      return prev.filter((item) => {
        return item.product.id !== productId;
      });
    });
  }, []);

  const handleSubmit = useCallback(() => {
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
  }, [selectedItems, onAddOrder, onClose]);

  const total = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      return sum + item.product.salePrice * item.quantity;
    }, 0);
  }, [selectedItems]);

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
