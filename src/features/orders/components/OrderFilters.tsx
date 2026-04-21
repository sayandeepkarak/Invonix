"use client";

import { ChangeEvent } from "react";
import { AppInput, AppSelect } from "@/components/wrapper";
import { Search } from "lucide-react";

import {
  ORDER_STATUS_OPTIONS,
  type OrderStatusFilter,
} from "@/features/orders/const";

interface OrderFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: OrderStatusFilter;
  onStatusChange: (status: OrderStatusFilter) => void;
}

export function OrderFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
      <div className="w-full sm:max-w-xs">
        <AppInput
          placeholder="Search by customer or ID..."
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            return onSearchChange(e.target.value);
          }}
          icon={<Search className="h-4 w-4" />}
          className="h-9"
        />
      </div>
      <div className="w-full sm:w-48">
        <AppSelect
          options={ORDER_STATUS_OPTIONS}
          value={statusFilter}
          onChange={(val) => {
            return onStatusChange(val as OrderStatusFilter);
          }}
          placeholder="Filter by status"
          className="h-9"
        />
      </div>
    </div>
  );
}
