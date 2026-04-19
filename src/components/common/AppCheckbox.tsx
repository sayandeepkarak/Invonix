import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AppCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  label: string;
  error?: string;
}

export function AppCheckbox({ label, error, className, id, ...props }: AppCheckboxProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center space-x-2">
        <Checkbox id={id} className={cn(className)} {...props} />
        <Label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      </div>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
