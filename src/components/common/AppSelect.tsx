"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
interface SelectOption {
  label: string;
  value: string;
}
interface AppSelectProps {
  label?: string;
  options: Readonly<Array<SelectOption>>;
  error?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}
export function AppSelect({
  label = "Select Label",
  options = [],
  error = "",
  placeholder = "Select an option",
  id,
  className,
  value,
  onChange,
  disabled,
  ref,
}: AppSelectProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={value}
        onValueChange={(val) => onChange?.(val || "")}
        disabled={disabled}
      >
        <SelectTrigger
          ref={ref}
          id={id}
          className={cn(
            error && "border-destructive focus:ring-destructive",
            className,
          )}
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
