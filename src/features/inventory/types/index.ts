export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  salePrice: number;
  stock: number;
  lowStockThreshold: number;
  images: string[];
  description: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  isDialogOpen: boolean;
  isEditMode: boolean;
}

export type CreateProductPayload = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "isActive"
>;

export type UpdateProductPayload = Partial<CreateProductPayload> & {
  id: string;
};
