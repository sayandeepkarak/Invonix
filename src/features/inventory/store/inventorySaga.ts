import { call, put, takeLatest } from "redux-saga/effects";
import { productsTable } from "@/services/dexie/tables/products";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  productSuccess,
  productFailure,
} from "./inventorySlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/features/inventory/types";

function* handleFetchProducts() {
  try {
    const products: Product[] = yield call(productsTable.getAll);
    yield put(fetchProductsSuccess(products.filter((p) => p.isActive)));
  } catch (err) {
    yield put(productFailure(String(err)));
  }
}

function* handleCreateProduct(action: PayloadAction<CreateProductPayload>) {
  try {
    const product: Product = {
      id: crypto.randomUUID(),
      ...action.payload,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    yield call(productsTable.create, product);
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
  yield takeLatest(fetchProductsRequest.type, handleFetchProducts);
  yield takeLatest(createProductRequest.type, handleCreateProduct);
  yield takeLatest(updateProductRequest.type, handleUpdateProduct);
  yield takeLatest(deleteProductRequest.type, handleDeleteProduct);
}
