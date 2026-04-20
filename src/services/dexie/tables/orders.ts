import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Order, OrderStatus } from "@/features/orders/types";

const TABLE_NAME = "orders";

export const ordersTable = {
  getAll: () =>
    manageAsyncOperation(async () => {
      return await db
        .table(TABLE_NAME)
        .orderBy("createdAt")
        .reverse()
        .toArray();
    }),

  getById: (id: string) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).get(id);
    }),

  create: (order: Order) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).add(order);
    }),

  updateStatus: (id: string, status: OrderStatus) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).update(id, {
        status,
        updatedAt: new Date().toISOString(),
      });
    }),

  assignAgent: (id: string, agentId: string) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).update(id, {
        assignedAgentId: agentId,
        updatedAt: new Date().toISOString(),
      });
    }),

  delete: (id: string) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).delete(id);
    }),
};
