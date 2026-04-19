"use client";

import { useState, useEffect } from "react";
import { AppInput, AppButton } from "@/components/common";
import { Plus, Search } from "lucide-react";

interface ProductToolbarProps {
  onSearch: (query: string) => void;
  onAddProduct: () => void;
}

export function ProductToolbar({
  onSearch,
  onAddProduct,
}: ProductToolbarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 max-w-sm">
        <AppInput
          id="product-search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </div>
      <AppButton onClick={onAddProduct}>
        <Plus className="h-4 w-4" />
        Add Product
      </AppButton>
    </div>
  );
}
