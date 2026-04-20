"use client";

import { AppCard } from "@/components/wrapper";
import {
  ShoppingCart,
  DollarSign,
  Package,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface DashboardKpiCardsProps {
  totalOrders: number;
  monthlyIncome: number;
  activeProducts: number;
  pendingDeliveries: number;
}

export function DashboardKpiCards({
  totalOrders,
  monthlyIncome,
  activeProducts,
  pendingDeliveries,
}: DashboardKpiCardsProps) {
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      description: "+12.5% from last month",
      trend: "up",
      color: "text-blue-500",
    },
    {
      title: "Monthly Income",
      value: `$${monthlyIncome.toLocaleString()}`,
      icon: DollarSign,
      description: "+8.2% from last month",
      trend: "up",
      color: "text-green-500",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: Package,
      description: "2 new added today",
      trend: "up",
      color: "text-purple-500",
    },
    {
      title: "Pending Deliveries",
      value: pendingDeliveries,
      icon: Truck,
      description: "-4% from yesterday",
      trend: "down",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <AppCard key={card.title}>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {card.title}
            </span>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </div>
          <div>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {card.trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500" />
              )}
              {card.description}
            </p>
          </div>
        </AppCard>
      ))}
    </div>
  );
}
