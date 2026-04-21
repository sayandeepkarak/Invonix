import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AppInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function AppInput({
  label,
  error = "",
  className,
  id,
  ref,
  icon,
  ...props
}: AppInputProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        {icon && (
          <div className="text-muted-foreground absolute top-1/2 left-2.5 -translate-y-1/2">
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          id={id}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive",
            icon && "pl-9",
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );
}
