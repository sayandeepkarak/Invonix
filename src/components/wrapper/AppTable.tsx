import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface AppTableColumn<T> {
  header: string;
  key: keyof T | string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface AppTableProps<T> {
  columns: AppTableColumn<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
  maxHeight?: string;
}

export function AppTable<T extends { id: string | number }>({
  columns,
  data,
  className,
  emptyMessage = "No data available.",
  maxHeight = "calc(100vh - 300px)",
}: AppTableProps<T>) {
  return (
    <div className={cn("rounded-md border bg-card overflow-hidden", className)}>
      <ScrollArea style={{ maxHeight }}>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card shadow-sm">
            <TableRow className="bg-muted/50 border-b">
              {columns.map((column) => (
                <TableHead key={column.key as string} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${item.id}-${column.key as string}`}
                      className={column.className}
                    >
                      {column.render
                        ? column.render(item)
                        : (item[column.key as keyof T] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
