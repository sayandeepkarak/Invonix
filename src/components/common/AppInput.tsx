import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
interface AppInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
}
export function AppInput({
  label = "Input Label",
  error = "",
  className,
  id,
  ref,
  ...props
}: AppInputProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        ref={ref}
        id={id}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
