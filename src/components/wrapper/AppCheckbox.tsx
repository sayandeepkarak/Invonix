"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
interface AppCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  label: string;
  error?: string;
  onChange?: (checked: boolean) => void;
}
export function AppCheckbox({
  label = "Checkbox Label",
  error = "",
  className,
  id,
  onChange,
  onCheckedChange,
  ref,
  ...props
}: AppCheckboxProps) {
  const handleCheckedChange = (
    checked: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: any,
  ) => {
    onCheckedChange?.(checked, event);
    onChange?.(checked);
  };
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center space-x-2">
        <Checkbox
          ref={ref}
          id={id}
          className={cn(className)}
          onCheckedChange={handleCheckedChange}
          {...props}
        />
        <Label
          htmlFor={id}
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      </div>
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );
}
