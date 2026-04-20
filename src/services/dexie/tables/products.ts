import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Product } from "@/features/inventory/types";
import { DB_TABLES } from "@/services/dexie/const";

function getAll(): Promise<Product[] | undefined> {
  return manageAsyncOperation<Product[]>(
    async () => {
      return await db.table(DB_TABLES.PRODUCTS).toArray();
    },
    () => {
      return [];
    },
  );
}

function getById(id: string): Promise<Product | undefined> {
  return manageAsyncOperation(async () => {
    return await db.table(DB_TABLES.PRODUCTS).get(id);
  });
}

function create(product: Product): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(DB_TABLES.PRODUCTS).add(product);
  });
}

function update(
  id: string,
  changes: Partial<Product>,
): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db
      .table(DB_TABLES.PRODUCTS)
      .update(id, { ...changes, updatedAt: new Date().toISOString() });
  });
}

function softDelete(id: string): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db
      .table(DB_TABLES.PRODUCTS)
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
