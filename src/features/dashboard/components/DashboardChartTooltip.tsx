"use client";

// In Recharts 3, the props passed to the custom content component 
// are actually TooltipContentProps, which includes the payload.
interface DashboardChartTooltipProps {
  active?: boolean;
  payload?: any[];
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
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const displayLabel = labelKey ? data[labelKey] : label;
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
