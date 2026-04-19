import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface AppSelectProps {
  label: string;
  options: Readonly<Array<SelectOption>>;
  error?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const AppSelect = forwardRef<HTMLButtonElement, AppSelectProps>(
  ({ label, options, error, placeholder, id, className, value, onChange, disabled, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id}>{label}</Label>
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger 
            ref={ref}
            id={id} 
            className={cn(error && "border-destructive focus:ring-destructive", className)}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-xs font-medium text-destructive">{error}</p>}
      </div>
    );
  }
);

AppSelect.displayName = "AppSelect";
