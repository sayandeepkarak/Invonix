import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVirtualizer } from "@tanstack/react-virtual";
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
  estimateRowHeight?: number;
}

export function AppTable<T extends { id: string | number }>({
  columns,
  data,
  className,
  emptyMessage = "No data available.",
  maxHeight = "calc(100vh - 300px)",
  estimateRowHeight = 52,
}: AppTableProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 5,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  return (
    <div className={cn("rounded-md border bg-card overflow-hidden", className)}>
      <div
        ref={parentRef}
        className="overflow-auto relative"
        style={{ maxHeight }}
      >
        <Table className="relative">
          <TableHeader className="sticky top-0 z-20 bg-card shadow-sm">
            <TableRow className="bg-muted/50 border-b">
              {columns.map((column) => {
                return (
                  <TableHead
                    key={column.key as string}
                    className={column.className}
                  >
                    {column.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data.length ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {virtualRows.length > 0 && (
                  <tr style={{ height: `${virtualRows[0]?.start ?? 0}px` }} />
                )}
                {virtualRows.map((virtualRow) => {
                  const item = data[virtualRow.index];
                  if (!item) return null;
                  return (
                    <TableRow
                      key={item.id}
                      data-index={virtualRow.index}
                      ref={virtualizer.measureElement}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {columns.map((column) => {
                        return (
                          <TableCell
                            key={`${item.id}-${column.key as string}`}
                            className={column.className}
                          >
                            {column.render
                              ? column.render(item)
                              : (item[column.key as keyof T] as React.ReactNode)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                {/* Spacer to push content up */}
                {virtualRows.length > 0 && (
                  <tr
                    style={{
                      height: `${totalHeight - (virtualRows[virtualRows.length - 1]?.end ?? totalHeight)}px`,
                    }}
                  />
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
