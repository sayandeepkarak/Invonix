"use client";

import dynamic from "next/dynamic";
import { useAnalytics } from "@/features/dashboard/hooks/useAnalytics";
import { DashboardStatisticCard } from "@/features/dashboard/components/DashboardStatisticCard";
import { PageHeader } from "@/components/PageHeader";

const DashboardRevenueChart = dynamic(() => {
  return import("@/features/dashboard/components/DashboardRevenueChart").then((mod) => {
    return mod.DashboardRevenueChart;
  });
}, { ssr: false, loading: () => {
  return <div className="h-80 w-full animate-pulse bg-muted rounded-xl" />;
} });

const DashboardStatusDistribution = dynamic(() => {
  return import("@/features/dashboard/components/DashboardStatusDistribution").then((mod) => {
    return mod.DashboardStatusDistribution;
  });
}, { ssr: false, loading: () => {
  return <div className="h-80 w-full animate-pulse bg-muted rounded-xl" />;
} });

export function DashboardAnalytics() {
  const { revenueData, statusDistribution, stats } = useAnalytics();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Real-time analytics and system performance overview."
      />

      <DashboardStatisticCard
        totalOrders={stats.totalOrders}
        activeProducts={stats.activeProducts}
        pendingDeliveries={stats.pendingDeliveries}
      />

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
