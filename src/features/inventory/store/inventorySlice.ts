import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ProductState,
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/features/inventory/types";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  isDialogOpen: false,
  isEditMode: false,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    createProductRequest: (state, _: PayloadAction<CreateProductPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProductRequest: (state, _: PayloadAction<UpdateProductPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteProductRequest: (state, _: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    productSuccess: (state) => {
      state.isLoading = false;
      state.isDialogOpen = false;
      state.isEditMode = false;
      state.selectedProduct = null;
    },
    productFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    openDialog: (state, action: PayloadAction<Product | null>) => {
      state.isDialogOpen = true;
      state.isEditMode = !!action.payload;
      state.selectedProduct = action.payload;
      state.error = null;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
      state.isEditMode = false;
      state.selectedProduct = null;
      state.error = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  productSuccess,
  productFailure,
  openDialog,
  closeDialog,
} = inventorySlice.actions;

export default inventorySlice.reducer;
