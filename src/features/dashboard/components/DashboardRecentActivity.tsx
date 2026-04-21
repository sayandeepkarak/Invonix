"use client";

import { AppCard } from "@/components/wrapper";
import { MessageSquare, Package, Truck, AlertCircle, type LucideIcon } from "lucide-react";
import { ACTIVITY_TYPES } from "@/features/dashboard/const";

interface DashboardRecentActivityProps {
  activity: { id: string; type: string; message: string; timestamp: string }[];
  className?: string;
}

const ACTIVITY_ICONS: Record<string, { icon: LucideIcon; color: string }> = {
  [ACTIVITY_TYPES.ORDER]: {
    icon: Package,
    color: "text-blue-500 bg-blue-500/10",
  },
  [ACTIVITY_TYPES.DELIVERY]: {
    icon: Truck,
    color: "text-green-500 bg-green-500/10",
  },
  [ACTIVITY_TYPES.ALERT]: {
    icon: AlertCircle,
    color: "text-destructive bg-destructive/10",
  },
  [ACTIVITY_TYPES.DEFAULT]: {
    icon: MessageSquare,
    color: "text-muted-foreground bg-muted",
  },
};

export function DashboardRecentActivity({
  activity,
  className,
}: DashboardRecentActivityProps) {
  return (
    <AppCard
      title="Recent Activity"
      description="Latest updates from across the system"
      className={className}
    >
      <div className="space-y-4 pt-2">
        {activity.map((item) => {
          const activityConfig =
            ACTIVITY_ICONS[item.type] ?? ACTIVITY_ICONS[ACTIVITY_TYPES.DEFAULT];
          
          if (!activityConfig) return null;

          const { icon: Icon, color } = activityConfig;
          return (
            <div key={item.id} className="flex items-center gap-3">
              <Icon className={`h-4 w-4 ${color.split(" ")[0]}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.message}</p>
                <p className="text-xs text-muted-foreground">
                  {item.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AppCard>
  );
}
