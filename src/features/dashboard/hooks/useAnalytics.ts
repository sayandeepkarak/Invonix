import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAnalyticsRequest } from "@/features/dashboard/store/dashboardSlice";
import { fetchOrdersRequest } from "@/features/orders/store/orderSlice";
import { fetchProductsRequest } from "@/features/inventory/store";
import { ORDER_STATUS } from "@/features/orders/const";

export function useAnalytics() {
  const dispatch = useAppDispatch();
  const {
    revenueData,
    statusDistribution,
    recentActivity,
    isLoading,
  } = useAppSelector((state) => state.dashboard);
  const { orders } = useAppSelector((state) => state.orders);
  const { products } = useAppSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
    dispatch(fetchAnalyticsRequest());
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalOrders = (orders || []).length;
    const pendingDeliveries = (orders || []).filter((o) =>
      ([ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED] as string[]).includes(
        o.status,
      ),
    ).length;
    const activeProducts = (products || []).filter((p) => p.isActive).length;

    return {
      totalOrders,
      activeProducts,
      pendingDeliveries,
    };
  }, [orders, products]);

  return {
    revenueData,
    statusDistribution,
    recentActivity,
    stats,
    isLoading,
  };
}
