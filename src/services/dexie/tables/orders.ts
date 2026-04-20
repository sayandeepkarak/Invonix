import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Order, OrderStatus } from "@/features/orders/types";
import { usersTable } from "@/services/dexie/tables/users";
import { agentsTable } from "@/services/dexie/tables/agents";
import { DB_TABLES } from "@/services/dexie/const";

export const ordersTable = {
  getAll: () =>
    manageAsyncOperation(async () => {
      const orders = await db
        .table(DB_TABLES.ORDERS)
        .orderBy("createdAt")
        .reverse()
        .toArray();

      return await Promise.all(
        orders.map(async (order) => {
          const user = await usersTable.getUserById(order.userId);
          const agent = order.agentId
            ? await agentsTable.getById(order.agentId)
            : null;
          return { ...order, user, agent };
        }),
      );
    }),

  getById: (id: string) =>
    manageAsyncOperation(async () => {
      const order = await db.table(DB_TABLES.ORDERS).get(id);
      if (!order) return null;

      const user = await usersTable.getUserById(order.userId);
      const agent = order.agentId
        ? await agentsTable.getById(order.agentId)
        : null;
      return { ...order, user, agent };
    }),

  create: (order: Order) =>
    manageAsyncOperation(async () => {
      return await db.table(DB_TABLES.ORDERS).add(order);
    }),

  updateStatus: (id: string, status: OrderStatus) =>
    manageAsyncOperation(async () => {
      return await db.table(DB_TABLES.ORDERS).update(id, {
        status,
        updatedAt: new Date().toISOString(),
      });
    }),

  assignAgent: (id: string, agentId: string) =>
    manageAsyncOperation(async () => {
      await db.table(DB_TABLES.ORDERS).update(id, {
        agentId: agentId,
        updatedAt: new Date().toISOString(),
      });

      await agentsTable.update(agentId, {
        status: "BUSY",
        orderId: id,
      });
    }),

  delete: (id: string) =>
    manageAsyncOperation(async () => {
      return await db.table(DB_TABLES.ORDERS).delete(id);
    }),
};
