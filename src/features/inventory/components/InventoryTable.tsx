"use client";

import { useMemo } from "react";
import { AppButton, AppTable, type AppTableColumn } from "@/components/wrapper";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "@/features/inventory/types";

interface InventoryTableProps {
  products: Product[];
  searchQuery: string;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function InventoryTable({
  products,
  searchQuery,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.isActive) {
        return false;
      }
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [products, searchQuery]);

  const columns: AppTableColumn<Product>[] = [
    {
      header: "SKU",
      key: "sku",
    },
    {
      header: "Product",
      key: "name",
      render: (product) => <span className="font-medium">{product.name}</span>,
    },
    {
      header: "Category",
      key: "category",
      render: (product) => (
        <Badge variant="secondary">{product.category}</Badge>
      ),
    },
    {
      header: "Price",
      key: "price",
      className: "text-right",
      render: (product) => `$${product.price.toFixed(2)}`,
    },
    {
      header: "Stock",
      key: "stock",
      className: "text-right",
      render: (product) => (
        <span
          className={
            product.stock <= product.lowStockThreshold
              ? "text-destructive font-bold"
              : ""
          }
        >
          {product.stock}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      className: "text-right",
      render: (product) => (
        <div className="flex items-center justify-end gap-2">
          <AppButton
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(product)}
            tooltip="Edit product"
          >
            <Edit className="h-4 w-4" />
          </AppButton>
          <AppButton
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(product)}
            tooltip="Delete product"
          >
            <Trash2 className="h-4 w-4" />
          </AppButton>
        </div>
      ),
    },
  ];

  return (
    <AppTable
      columns={columns}
      data={filteredProducts}
      emptyMessage="No products found."
    />
  );
}
