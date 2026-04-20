"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAnalyticsRequest } from "@/features/dashboard/store/dashboardSlice";
import { fetchOrdersRequest } from "@/features/orders/store/orderSlice";
import { DashboardKpiCards } from "@/features/dashboard/components/DashboardKpiCards";
import { DashboardRevenueChart } from "@/features/dashboard/components/DashboardRevenueChart";
import { DashboardStatusDistribution } from "@/features/dashboard/components/DashboardStatusDistribution";
import { DashboardRecentActivity } from "@/features/dashboard/components/DashboardRecentActivity";
import { DashboardTopProducts } from "@/features/dashboard/components/DashboardTopProducts";
import { PageHeader } from "@/components/PageHeader";
import { ORDER_STATUS } from "@/features/orders/const";

export function DashboardAnalytics() {
  const dispatch = useAppDispatch();
  const {
    revenueData,
    statusDistribution,
    recentActivity,
    topProducts,
    isLoading,
  } = useAppSelector((state) => state.dashboard);
  const { orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
    dispatch(fetchAnalyticsRequest());
  }, [dispatch]);

  const totalOrders = orders.length;
  const pendingDeliveries = orders.filter(
    (o) => o.status === ORDER_STATUS.OUT_FOR_DELIVERY,
  ).length;
  const monthlyIncome = revenueData.reduce((acc, curr) => acc + curr.amount, 0);
  const activeProducts = 24;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Real-time analytics and system performance overview."
      />

      <DashboardKpiCards
        totalOrders={totalOrders}
        monthlyIncome={monthlyIncome}
        activeProducts={activeProducts}
        pendingDeliveries={pendingDeliveries}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <DashboardRevenueChart data={revenueData} className="md:col-span-4" />
        <DashboardStatusDistribution
          data={statusDistribution}
          className="md:col-span-3"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <DashboardRecentActivity
          activity={recentActivity}
          className="md:col-span-3"
        />
        <DashboardTopProducts
          products={topProducts}
          className="md:col-span-4"
        />
      </div>
    </div>
  );
}
