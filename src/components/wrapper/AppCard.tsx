import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AppCardProps {
  title?: string;
  description?: string;
  className?: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

export function AppCard({
  title,
  description,
  className,
  headerContent,
  children,
}: AppCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      {(title || description || headerContent) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {headerContent}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
