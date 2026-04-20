import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({
  title = "Page Title",
  subtitle = "Page description goes here.",
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 mb-6", className)}>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
