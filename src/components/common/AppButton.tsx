import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppButtonProps extends ButtonProps {
  label?: string;
  loading?: boolean;
}

export function AppButton({
  label,
  loading,
  children,
  className,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <Button
      className={cn("gap-2", className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {label || children}
    </Button>
  );
}
