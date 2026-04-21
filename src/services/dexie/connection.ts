import Dexie from "dexie";
import { DB_TABLES } from "@/services/dexie/const";

export const db = new Dexie("inventoryManagementDb");

function init(): void {
  db.version(1).stores({
    [DB_TABLES.USERS]: "id, &email, businessName, businessType",
    [DB_TABLES.SESSIONS]: "id, userId, createdAt",
    [DB_TABLES.PRODUCTS]:
      "id, name, sku, category, price, stock, isActive, createdAt, *tags",
    [DB_TABLES.ORDERS]: "id, userId, agentId, status, createdAt",
    [DB_TABLES.AGENTS]: "id, name, email, status, orderId, createdAt",
  });
}

init();
