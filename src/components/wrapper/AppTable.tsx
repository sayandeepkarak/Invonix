import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface AppTableColumn<T> {
  header: string;
  key: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface AppTableProps<T> {
  columns: AppTableColumn<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
}

export function AppTable<T extends { id: string | number }>({
  columns,
  data,
  className,
  emptyMessage = "No data available.",
}: AppTableProps<T>) {
  return (
    <div className={cn("rounded-md border bg-card overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
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
                    key={`${item.id}-${column.key}`}
                    className={column.className}
                  >
                    {column.render
                      ? column.render(item)
                      : (item as any)[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
