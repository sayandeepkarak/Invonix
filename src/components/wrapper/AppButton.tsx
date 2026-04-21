import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface AppButtonProps extends ButtonProps {
  label?: string;
  loading?: boolean;
  tooltip?: string;
}

export function AppButton({
  label = "Button",
  loading = false,
  tooltip,
  children,
  className,
  disabled,
  ...props
}: AppButtonProps) {
  const button = (
    <Button
      className={cn("gap-2", className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        children || label
      )}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger render={button} />
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
