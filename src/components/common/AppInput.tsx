import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface AppInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input
          ref={ref}
          id={id}
          className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
          {...props}
        />
        {error && <p className="text-xs font-medium text-destructive">{error}</p>}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";
