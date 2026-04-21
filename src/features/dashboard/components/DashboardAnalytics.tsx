"use client";

import { useAnalytics } from "@/features/dashboard/hooks/useAnalytics";
import { DashboardStatisticCard } from "@/features/dashboard/components/DashboardStatisticCard";
import { DashboardRevenueChart } from "@/features/dashboard/components/DashboardRevenueChart";
import { DashboardStatusDistribution } from "@/features/dashboard/components/DashboardStatusDistribution";
import { PageHeader } from "@/components/PageHeader";

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
