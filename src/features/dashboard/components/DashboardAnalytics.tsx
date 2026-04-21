"use client";

import dynamic from "next/dynamic";
import { useAnalytics } from "@/features/dashboard/hooks/useAnalytics";
import { DashboardKPICard } from "@/features/dashboard/components/DashboardKPICard";
import { ShoppingCart, Package, Truck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const DashboardRevenueChart = dynamic(
  () => import("@/features/dashboard/components/DashboardRevenueChart"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted h-80 w-full animate-pulse rounded-xl" />
    ),
  },
);

const DashboardStatusDistribution = dynamic(
  () => import("@/features/dashboard/components/DashboardStatusDistribution"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted h-80 w-full animate-pulse rounded-xl" />
    ),
  },
);

export function DashboardAnalytics() {
  const { revenueData, statusDistribution, stats } = useAnalytics();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Real-time analytics and system performance overview."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardKPICard
          label="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          colorClassName="text-blue-500"
        />
        <DashboardKPICard
          label="Active Products"
          value={stats.activeProducts}
          icon={Package}
          colorClassName="text-purple-500"
        />
        <DashboardKPICard
          label="Pending Deliveries"
          value={stats.pendingDeliveries}
          icon={Truck}
          colorClassName="text-orange-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <DashboardRevenueChart data={revenueData} className="md:col-span-4" />
        <DashboardStatusDistribution
          data={statusDistribution}
          className="md:col-span-3"
        />
      </div>
    </div>
  );
}
