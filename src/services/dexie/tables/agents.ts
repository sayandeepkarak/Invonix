import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type {
  DeliveryAgent,
  AgentStatus,
} from "@/features/orders/types/agents";
import { DB_TABLES } from "@/services/dexie/const";

export const agentsTable = {
  getAll: (): Promise<DeliveryAgent[] | undefined> => {
    return manageAsyncOperation(
      async () => {
        const agents = await db.table(DB_TABLES.AGENTS).toArray();
        const results = agents.map(async (agent: DeliveryAgent) => {
          if (agent.orderId) {
            const order = await db.table(DB_TABLES.ORDERS).get(agent.orderId);
            return { ...agent, order: order || undefined };
          }
          return agent;
        });
        return await Promise.all(results);
      },
      () => {
        return [];
      },
    );
  },

  getById: (id: string): Promise<DeliveryAgent | null> => {
    return manageAsyncOperation(
      async () => {
        const agent = await db.table(DB_TABLES.AGENTS).get(id);
        if (!agent) return null;

        if (agent.orderId) {
          const order = await db.table(DB_TABLES.ORDERS).get(agent.orderId);
          return { ...agent, order: order || undefined };
        }
        return agent;
      },
      () => {
        return null;
      },
    );
  },

  create: (agent: DeliveryAgent): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db.table(DB_TABLES.AGENTS).add(agent);
      },
      () => {
        return undefined;
      },
    );
  },

  update: (id: string, updates: Partial<DeliveryAgent>): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db.table(DB_TABLES.AGENTS).update(id, updates);
      },
      () => {
        return undefined;
      },
    );
  },

  updateStatus: (id: string, status: AgentStatus): Promise<void> => {
    return agentsTable.update(id, { status });
  },

  delete: (id: string): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        return await db.table(DB_TABLES.AGENTS).delete(id);
      },
      () => {
        return undefined;
      },
    );
  },
};
