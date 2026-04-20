"use client";

import { AppInput, AppButton } from "@/components/wrapper";
import { Search, Plus } from "lucide-react";

interface InventoryToolbarProps {
  onSearch: (query: string) => void;
  onAddProduct: () => void;
}

export function InventoryToolbar({
  onSearch,
  onAddProduct,
}: InventoryToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full max-w-sm">
        <AppInput
          placeholder="Search products..."
          icon={<Search className="h-4 w-4" />}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <AppButton onClick={onAddProduct} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Product
      </AppButton>
    </div>
  );
}
