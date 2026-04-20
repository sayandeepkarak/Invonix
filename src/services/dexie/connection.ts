import Dexie from "dexie";

export const db = new Dexie("inventoryManagementDb");

function init(): void {
  db.version(1).stores({
    users: "id, &email, businessName, businessType",
    sessions: "id, userId, createdAt",
    products:
      "id, name, sku, category, price, stock, isActive, createdAt, *tags",
    orders:
      "id, customerName, customerEmail, status, createdAt, assignedAgentId",
    agents: "id, name, email, status, createdAt",
  });
}

init();
