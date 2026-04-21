"use client";

// In Recharts 3, the props passed to the custom content component 
// are actually TooltipContentProps, which includes the payload.
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
      <div className="rounded-lg border bg-card p-3 shadow-xl ring-1 ring-border">
        <p className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {displayLabel}
        </p>
        <p className="text-sm font-bold text-primary">
          {valuePrefix}{displayValue?.toLocaleString()}{valueSuffix}
        </p>
      </div>
    );
  }

  return null;
}
