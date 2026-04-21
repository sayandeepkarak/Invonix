"use client";

import { AppCard } from "@/components/wrapper";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardKPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  colorClassName?: string;
  className?: string;
}

export function DashboardKPICard({
  label,
  value,
  icon: Icon,
  colorClassName = "text-primary",
  className,
}: DashboardKPICardProps) {
  return (
    <AppCard className={cn("overflow-hidden border-none shadow-md", className)}>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "bg-muted/50 rounded-xl p-2.5",
            colorClassName.replace("text-", "bg-").replace("-500", "-500/10"),
          )}
        >
          <Icon className={cn("h-6 w-6", colorClassName)} />
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            {label}
          </p>
          <div className="mt-0.5 text-2xl font-bold" suppressHydrationWarning>
            {value.toLocaleString()}
          </div>
        </div>
      </div>
    </AppCard>
  );
}
