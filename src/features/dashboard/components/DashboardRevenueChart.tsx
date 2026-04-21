"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AppCard } from "@/components/wrapper";
import { DashboardChartTooltip } from "./DashboardChartTooltip";

interface DashboardRevenueChartProps {
  data: { month: string; amount: number }[];
  className?: string;
}

export function DashboardRevenueChart({
  data,
  className,
}: DashboardRevenueChartProps) {
  return (
    <AppCard
      title="Revenue Trend"
      className={className}
    >
      <div className="h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--muted)/0.5)"
            />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)", opacity: 0.1 }}
              content={<DashboardChartTooltip valuePrefix="$" />}
            />
            <Bar
              dataKey="amount"
              fill="var(--chart-primary)"
              radius={[6, 6, 0, 0]}
              barSize={24}
              activeBar={{ fill: "var(--chart-primary)", opacity: 0.8 }}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AppCard>
  );
}
