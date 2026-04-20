import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type {
  DeliveryAgent,
  AgentStatus,
} from "@/features/orders/types/agents";
import { ordersTable } from "@/services/dexie/tables/orders";
import { DB_TABLES } from "@/services/dexie/const";

export const agentsTable = {
  getAll: (): Promise<DeliveryAgent[] | undefined> =>
    manageAsyncOperation(async () => {
      const agents = await db.table(DB_TABLES.AGENTS).toArray();
      return await Promise.all(
        agents.map(async (agent: DeliveryAgent) => {
          if (agent.orderId) {
            const order: any = await ordersTable.getById(agent.orderId);
            return { ...agent, order };
          }
          return agent;
        }),
      );
    }),

  getById: (id: string): Promise<DeliveryAgent | undefined> =>
    manageAsyncOperation(async () => {
      const agent = await db.table(DB_TABLES.AGENTS).get(id);
      if (agent?.orderId) {
        const order: any = await ordersTable.getById(agent.orderId);
        return { ...agent, order };
      }
      return agent;
    }),

  create: (agent: DeliveryAgent): Promise<any> =>
    manageAsyncOperation(async () => {
      return await db.table(DB_TABLES.AGENTS).add(agent);
    }),

  update: (id: string, updates: Partial<DeliveryAgent>): Promise<any> =>
    manageAsyncOperation(async () => {
      return await db.table(DB_TABLES.AGENTS).update(id, updates);
    }),

  updateStatus: (id: string, status: AgentStatus): Promise<any> =>
    manageAsyncOperation(async () => {
      return await db.table(DB_TABLES.AGENTS).update(id, { status });
    }),

  delete: (id: string): Promise<any> =>
    manageAsyncOperation(async () => {
      return await db.table(DB_TABLES.AGENTS).delete(id);
    }),
};
