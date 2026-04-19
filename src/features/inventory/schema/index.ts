import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().min(2, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  costPrice: z.coerce.number().min(0, "Cost price must be positive"),
  salePrice: z.coerce.number().min(0, "Sale price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock must be a whole number"),
  lowStockThreshold: z.coerce
    .number()
    .int()
    .min(0, "Threshold must be a whole number"),
  tags: z.string().optional(),
});

export type ProductFormValues = {
  name: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  costPrice: number;
  salePrice: number;
  stock: number;
  lowStockThreshold: number;
  tags?: string;
};
