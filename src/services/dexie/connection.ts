import Dexie from "dexie";
export const db = new Dexie("inventoryManagementDb");
function init(): void {
  db.version(1).stores({
    users: "id, email",
    sessions: "id, userId",
  });
}
init();
