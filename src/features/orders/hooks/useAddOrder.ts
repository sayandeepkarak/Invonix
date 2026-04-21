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

  const availableProducts = useMemo(() => 
    products.filter(
      (p) => !selectedItems.find((item) => item.product.id === p.id) && p.stock > 0
    ),
    [products, selectedItems]
  );

  const productOptions = useMemo(() => 
    availableProducts.map((p) => ({
      label: `${p.name} (${p.stock} in stock)`,
      value: p.id,
    })),
    [availableProducts]
  );

  const handleAddItem = useCallback(() => {
    const product = products.find((p) => p.id === currentProductId);
    if (product) {
      setSelectedItems((prev) => [...prev, { product, quantity: 1 }]);
      setCurrentProductId("");
    }
  }, [currentProductId, products]);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setSelectedItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, Math.min(item.product.stock, item.quantity + delta));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedItems.length > 0) {
      const mappedItems: OrderItem[] = selectedItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.salePrice,
      }));
      onAddOrder(mappedItems);
      setSelectedItems([]);
      onClose();
    }
  }, [selectedItems, onAddOrder, onClose]);

  const total = useMemo(() => 
    selectedItems.reduce(
      (sum, item) => sum + item.product.salePrice * item.quantity,
      0
    ),
    [selectedItems]
  );

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
