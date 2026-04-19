import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Product } from "@/features/inventory/types";

const TABLE_NAME = "products";

function getAll(): Promise<Product[] | undefined> {
  return manageAsyncOperation<Product[]>(
    async () => {
      return await db.table(TABLE_NAME).toArray();
    },
    () => {
      return [];
    },
  );
}

function getById(id: string): Promise<Product | undefined> {
  return manageAsyncOperation(async () => {
    return await db.table(TABLE_NAME).get(id);
  });
}

function create(product: Product): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(TABLE_NAME).add(product);
  });
}

function update(
  id: string,
  changes: Partial<Product>,
): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db
      .table(TABLE_NAME)
      .update(id, { ...changes, updatedAt: new Date().toISOString() });
  });
}

function softDelete(id: string): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db
      .table(TABLE_NAME)
      .update(id, { isActive: false, updatedAt: new Date().toISOString() });
  });
}

export const productsTable = {
  getAll,
  getById,
  create,
  update,
  softDelete,
};
