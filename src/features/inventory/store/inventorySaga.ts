import { call, put, takeLatest, all } from "redux-saga/effects";
import { productsTable } from "@/services/dexie/tables/products";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  productSuccess,
  productFailure,
} from "@/features/inventory/store/inventorySlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/features/inventory/types";

function* handleFetchProducts() {
  try {
    const products: Product[] = yield call(productsTable.getAll);
    yield put(fetchProductsSuccess(products));
  } catch (err) {
    yield put(productFailure(String(err)));
  }
}

function* handleCreateProduct(action: PayloadAction<CreateProductPayload>) {
  try {
    const newProduct: Product = {
      ...action.payload,
      id: crypto.randomUUID(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Product;
    yield call(productsTable.create, newProduct);
    yield put(productSuccess());
    yield put(fetchProductsRequest());
  } catch (err) {
    yield put(productFailure(String(err)));
  }
}

function* handleUpdateProduct(action: PayloadAction<UpdateProductPayload>) {
  try {
    const { id, ...changes } = action.payload;
    yield call(productsTable.update, id, changes);
    yield put(productSuccess());
    yield put(fetchProductsRequest());
  } catch (err) {
    yield put(productFailure(String(err)));
  }
}

function* handleDeleteProduct(action: PayloadAction<string>) {
  try {
    yield call(productsTable.softDelete, action.payload);
    yield put(productSuccess());
    yield put(fetchProductsRequest());
  } catch (err) {
    yield put(productFailure(String(err)));
  }
}

export default function* inventorySaga() {
  yield all([
    takeLatest(fetchProductsRequest.type, handleFetchProducts),
    takeLatest(createProductRequest.type, handleCreateProduct),
    takeLatest(updateProductRequest.type, handleUpdateProduct),
    takeLatest(deleteProductRequest.type, handleDeleteProduct),
  ]);
}
