import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Order, OrderStatus } from "@/features/orders/types";
import { usersTable } from "@/services/dexie/tables/users";
import { DB_TABLES } from "@/services/dexie/const";
import { agentsTable } from "@/services/dexie/tables/agents";
import { ORDER_STATUS, AGENT_STATUS } from "@/features/orders/const";

export const ordersTable = {
  getAll: (): Promise<Order[] | undefined> => {
    return manageAsyncOperation(
      async () => {
        const orders = await db
          .table(DB_TABLES.ORDERS)
          .orderBy("createdAt")
          .reverse()
          .toArray();

        const results = orders.map(async (order) => {
          const user = await usersTable.getUserById(order.userId);
          const agent = await agentsTable.getById(order.agentId);
          return { ...order, user, agent };
        });

        return await Promise.all(results);
      },
      () => {
        return [];
      },
    );
  },

  getById: (id: string): Promise<Order | null> => {
    return manageAsyncOperation(
      async () => {
        const order = await db.table(DB_TABLES.ORDERS).get(id);
        if (!order) return null;

        const user = await usersTable.getUserById(order.userId);
        const agent = order.agentId
          ? await agentsTable.getById(order.agentId)
          : null;
        return { ...order, user, agent };
      },
      () => {
        return null;
      },
    );
  },

  create: (order: Order): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db.table(DB_TABLES.ORDERS).add(order);
      },
      () => {
        return undefined;
      },
    );
  },

  update: (id: string, updates: Partial<Order>): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db
          .table(DB_TABLES.ORDERS)
          .update(id, { ...updates, updatedAt: new Date().toISOString() });
      },
      () => {
        return undefined;
      },
    );
  },

  updateStatus: (id: string, status: OrderStatus): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        const order = await ordersTable.getById(id);
        
        await ordersTable.update(id, { status });

        const finalizedStatuses: string[] = [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED];
        if (order?.agentId && finalizedStatuses.includes(status)) {
          await agentsTable.update(order.agentId, {
            status: AGENT_STATUS.AVAILABLE,
            orderId: undefined,
          });
        }
      },
      () => {
        return undefined;
      },
    );
  },

  assignAgent: (id: string, agentId: string): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await ordersTable.update(id, { agentId });

        await agentsTable.update(agentId, {
          status: "BUSY",
          orderId: id,
        });
      },
      () => {
        return undefined;
      },
    );
  },

  delete: (id: string): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        return await db.table(DB_TABLES.ORDERS).delete(id);
      },
      () => {
        return undefined;
      },
    );
  },
};
