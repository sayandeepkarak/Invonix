"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AppTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const AppTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AppTextareaProps
>(({ label, error, id, className, ...props }, ref) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea
        id={id}
        ref={ref}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        {...props}
      />
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );
});

AppTextarea.displayName = "AppTextarea";
