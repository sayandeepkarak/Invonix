"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AppButton } from "./AppButton";
import { cn } from "@/lib/utils";

interface AppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  maxWidth?: string;
  className?: string;
  footer?: React.ReactNode;
}

export function AppDialog({
  open,
  onOpenChange,
  title,
  children,
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  isLoading = false,
  maxWidth = "sm:max-w-[500px]",
  className,
  footer,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(maxWidth, className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="py-2">{children}</div>

        {footer !== null && (
          <DialogFooter>
            {footer || (
              <>
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={onCancel || (() => onOpenChange(false))}
                  disabled={isLoading}
                >
                  {cancelLabel}
                </AppButton>
                {onSubmit && (
                  <AppButton
                    onClick={onSubmit}
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    {submitLabel}
                  </AppButton>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
