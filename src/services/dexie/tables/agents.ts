import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type {
  DeliveryAgent,
  AgentStatus,
} from "@/features/orders/types/agents";

const TABLE_NAME = "agents";

export const agentsTable = {
  getAll: () =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).toArray();
    }),

  getById: (id: string) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).get(id);
    }),

  create: (agent: DeliveryAgent) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).add(agent);
    }),

  updateStatus: (id: string, status: AgentStatus) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).update(id, { status });
    }),

  delete: (id: string) =>
    manageAsyncOperation(async () => {
      return await db.table(TABLE_NAME).delete(id);
    }),
};
