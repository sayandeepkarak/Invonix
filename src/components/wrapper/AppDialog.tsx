"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppButton } from "@/components/wrapper/AppButton";

interface AppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  maxWidth?: string;
  footer?: React.ReactNode;
}

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  isLoading = false,
  maxWidth = "sm:max-w-[425px]",
  footer,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={maxWidth}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
        {footer ? (
          <DialogFooter>{footer}</DialogFooter>
        ) : (
          (onSubmit || cancelLabel) && (
            <DialogFooter>
              <AppButton
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {cancelLabel}
              </AppButton>
              {onSubmit && (
                <AppButton onClick={onSubmit} loading={isLoading}>
                  {submitLabel}
                </AppButton>
              )}
            </DialogFooter>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
