"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
interface AppPasswordInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
}
export function AppPasswordInput({
  label = "Password",
  error = "",
  id,
  className,
  ref,
  ...props
}: AppPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          ref={ref}
          id={id}
          type={showPassword ? "text" : "password"}
          className={cn(
            "pr-10",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );
}
