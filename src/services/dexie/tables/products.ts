import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Product } from "@/features/inventory/types";
import { DB_TABLES } from "@/services/dexie/const";

export const productsTable = {
  getAll: (): Promise<Product[] | undefined> => {
    return manageAsyncOperation(
      async () => {
        return await db.table(DB_TABLES.PRODUCTS).toArray();
      },
      () => {
        return [];
      },
    );
  },

  getById: (id: string): Promise<Product | null> => {
    return manageAsyncOperation(
      async () => {
        const product = await db.table(DB_TABLES.PRODUCTS).get(id);
        return product || null;
      },
      () => {
        return null;
      },
    );
  },

  create: (product: Product): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db.table(DB_TABLES.PRODUCTS).add(product);
      },
      () => {
        return undefined;
      },
    );
  },

  update: (id: string, changes: Partial<Product>): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db
          .table(DB_TABLES.PRODUCTS)
          .update(id, { ...changes, updatedAt: new Date().toISOString() });
      },
      () => {
        return undefined;
      },
    );
  },

  softDelete: (id: string): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db
          .table(DB_TABLES.PRODUCTS)
          .update(id, { isActive: false, updatedAt: new Date().toISOString() });
      },
      () => {
        return undefined;
      },
    );
  },
};
