"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AppBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
  className?: string;
}

export function AppBadge({
  children,
  variant = "default",
  className,
}: AppBadgeProps) {
  const variantClasses = {
    default: "",
    secondary: "",
    destructive: "",
    outline: "",
    success:
      "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20",
  };

  return (
    <Badge
      variant={variant === "success" ? "outline" : variant}
      className={cn(
        "rounded-full px-2.5 py-0.5 font-medium",
        variant === "success" && variantClasses.success,
        className,
      )}
    >
      {children}
    </Badge>
  );
}
