"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AppCard } from "@/components/wrapper";
import { DashboardChartTooltip } from "@/features/dashboard/components/DashboardChartTooltip";

interface DashboardRevenueChartProps {
  data: { month: string; amount: number }[];
  className?: string;
}

export function DashboardRevenueChart({
  data,
  className,
}: DashboardRevenueChartProps) {
  return (
    <AppCard title="Revenue Trend" className={className}>
      <div className="h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -20, right: 10, top: 10, bottom: 10 }}>
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
              tickFormatter={(value) => {
                return `$${value}`;
              }}
            />
            <Tooltip
              content={<DashboardChartTooltip valuePrefix="$" />}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="var(--chart-primary)"
              strokeWidth={3}
              dot={{ fill: "var(--chart-primary)", r: 4, strokeWidth: 2, stroke: "var(--card)" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AppCard>
  );
}
