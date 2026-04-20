"use client";

import { AppCard } from "@/components/wrapper";

interface DashboardTopProductsProps {
  products: { name: string; sales: number; revenue: number }[];
  className?: string;
}

export function DashboardTopProducts({
  products,
  className,
}: DashboardTopProductsProps) {
  const displayProducts =
    products.length > 0
      ? products
      : [
          { name: "Premium Wireless Headphones", sales: 124, revenue: 18600 },
          { name: "Smart Watch Series 5", sales: 98, revenue: 24500 },
          { name: "Eco-friendly Water Bottle", sales: 86, revenue: 2150 },
          { name: "Minimalist Leather Wallet", sales: 72, revenue: 3600 },
        ];

  return (
    <AppCard
      title="Top Performing Products"
      description="Highest grossing items this month"
      className={className}
    >
      <div className="space-y-4 pt-2">
        {displayProducts.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{product.name}</p>
              <p className="text-xs text-muted-foreground">
                {product.sales} units sold
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">
                ${product.revenue.toLocaleString()}
              </p>
              <p className="text-[10px] text-green-500 font-medium">+12%</p>
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
