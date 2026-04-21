"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { AppCard } from "@/components/wrapper";
import { DashboardChartTooltip } from "@/features/dashboard/components/DashboardChartTooltip";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "@/features/orders/const";

interface DashboardStatusDistributionProps {
  data: { status: string; count: number }[];
  className?: string;
}

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

export function DashboardStatusDistribution({
  data,
  className,
}: DashboardStatusDistributionProps) {
  const chartData =
    data.length > 0
      ? data
      : [
          { status: ORDER_STATUS_LABELS[ORDER_STATUS.PENDING], count: 12 },
          { status: ORDER_STATUS_LABELS[ORDER_STATUS.CONFIRMED], count: 8 },
          { status: ORDER_STATUS_LABELS[ORDER_STATUS.PREPARING], count: 13 },
          { status: ORDER_STATUS_LABELS[ORDER_STATUS.DELIVERED], count: 42 },
        ];

  return (
    <AppCard title="Order Distribution" className={className}>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="count"
              nameKey="status"
            >
              {chartData.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
            </Pie>
            <Tooltip
              content={<DashboardChartTooltip labelKey="status" valueSuffix=" Orders" />}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AppCard>
  );
}
