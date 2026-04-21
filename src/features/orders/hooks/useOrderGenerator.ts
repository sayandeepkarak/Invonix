import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createOrderRequest } from "@/features/orders/store/orderSlice";
import { ORDER_STATUS } from "@/features/orders/const";
import { fetchProductsRequest } from "@/features/inventory/store/inventorySlice";
import { useEffect } from "react";
import type { Order } from "@/features/orders/types";

export function useOrderGenerator() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.inventory);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProductsRequest());
    }
  }, [dispatch, products.length]);

  const generateRandomOrder = () => {
    if (!products.length || !user) return;

    const randomProduct = products[Math.floor(Math.random() * products.length)];
    if (!randomProduct) return;

    const quantity = Math.floor(Math.random() * 3) + 1;

    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: user.id,
      items: [
        {
          productId: randomProduct.id,
          name: randomProduct.name,
          quantity,
          price: randomProduct.price,
        },
      ],
      totalAmount: randomProduct.price * quantity,
      status: ORDER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(createOrderRequest(newOrder));
  };

  return { generateRandomOrder };
}
