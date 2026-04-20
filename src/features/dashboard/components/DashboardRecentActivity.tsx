"use client";

import { AppCard } from "@/components/wrapper";
import { MessageSquare, Package, Truck, AlertCircle } from "lucide-react";

interface DashboardRecentActivityProps {
  activity: { id: string; type: string; message: string; timestamp: string }[];
  className?: string;
}

export function DashboardRecentActivity({
  activity,
  className,
}: DashboardRecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return Package;
      case "delivery":
        return Truck;
      case "alert":
        return AlertCircle;
      default:
        return MessageSquare;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "order":
        return "text-blue-500 bg-blue-500/10";
      case "delivery":
        return "text-green-500 bg-green-500/10";
      case "alert":
        return "text-destructive bg-destructive/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <AppCard
      title="Recent Activity"
      description="Latest updates from across the system"
      className={className}
    >
      <div className="space-y-4 pt-2">
        {activity.map((item) => {
          const Icon = getIcon(item.type);
          return (
            <div key={item.id} className="flex items-start gap-4">
              <div
                className={`mt-1 rounded-full p-2 ${getIconColor(item.type)}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {item.message}
                </p>
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
