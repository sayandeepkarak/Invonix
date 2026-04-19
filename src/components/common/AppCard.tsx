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
  title = "Card Title",
  description = "Card Description",
  className,
  headerContent,
  children,
}: AppCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {headerContent}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
