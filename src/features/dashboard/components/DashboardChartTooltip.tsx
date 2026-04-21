"use client";

interface TooltipPayload {
  value: number | string;
  name: string;
  payload: Record<string, unknown>;
  color?: string;
  dataKey?: string | number;
}

interface DashboardChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  labelKey?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function DashboardChartTooltip({
  active,
  payload,
  label,
  labelKey,
  valuePrefix = "",
  valueSuffix = "",
}: DashboardChartTooltipProps) {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    const displayLabel = labelKey ? (data[labelKey] as string | number) : label;
    const displayValue = payload[0].value;

    return (
      <div className="bg-card ring-border rounded-lg border p-3 shadow-xl ring-1">
        <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
          {displayLabel}
        </p>
        <p className="text-primary text-sm font-bold">
          {valuePrefix}
          {displayValue?.toLocaleString()}
          {valueSuffix}
        </p>
      </div>
    );
  }

  return null;
}
