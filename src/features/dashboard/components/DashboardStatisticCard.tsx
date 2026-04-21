"use client";

import { AppCard } from "@/components/wrapper";
import { ShoppingCart, Package, Truck } from "lucide-react";

interface DashboardStatisticCardProps {
  totalOrders: number;
  activeProducts: number;
  pendingDeliveries: number;
}

export function DashboardStatisticCard({
  totalOrders,
  activeProducts,
  pendingDeliveries,
}: DashboardStatisticCardProps) {
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: Package,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Pending Deliveries",
      value: pendingDeliveries,
      icon: Truck,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        return (
          <AppCard
            key={card.title}
            className="overflow-hidden border-none shadow-md"
          >
            <div className="flex items-center gap-3">
              <card.icon className={`h-5 w-5 ${card.color}`} />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <div className="text-2xl font-bold" suppressHydrationWarning>
                  {card.value.toLocaleString()}
                </div>
              </div>
            </div>
          </AppCard>
        );
      })}
    </div>
  );
}
