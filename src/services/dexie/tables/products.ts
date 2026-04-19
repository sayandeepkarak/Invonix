import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Product } from "@/features/inventory/types";

const TABLE_NAME = "products";

async function getAll(): Promise<Product[]> {
  const data = await manageAsyncOperation(
    () => db.table(TABLE_NAME).toArray(),
    (error) => {
      throw new Error(`Database error: ${error}`);
    },
  );
  return data || [];
}

async function getById(id: string): Promise<Product | undefined> {
  return await manageAsyncOperation(
    () => db.table(TABLE_NAME).get(id),
    (error) => {
      throw new Error(`Database error: ${error}`);
    },
  );
}

async function create(product: Product): Promise<void> {
  await manageAsyncOperation(
    () => db.table(TABLE_NAME).add(product),
    (error) => {
      throw new Error(`Failed to create product: ${error}`);
    },
  );
}

async function update(id: string, changes: Partial<Product>): Promise<void> {
  await manageAsyncOperation(
    () =>
      db
        .table(TABLE_NAME)
        .update(id, { ...changes, updatedAt: new Date().toISOString() }),
    (error) => {
      throw new Error(`Failed to update product: ${error}`);
    },
  );
}

async function softDelete(id: string): Promise<void> {
  await manageAsyncOperation(
    () =>
      db
        .table(TABLE_NAME)
        .update(id, { isActive: false, updatedAt: new Date().toISOString() }),
    (error) => {
      throw new Error(`Failed to delete product: ${error}`);
    },
  );
}

export const productsTable = {
  getAll,
  getById,
  create,
  update,
  softDelete,
};
