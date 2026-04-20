import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Session } from "@/features/auth/types";
import { DB_TABLES } from "@/services/dexie/const";

function createSession(session: Session): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(DB_TABLES.SESSIONS).clear();
    await db.table(DB_TABLES.SESSIONS).add(session);
  });
}

function getActiveSession(): Promise<Session | undefined> {
  return manageAsyncOperation<Session>(async () => {
    return await db.table(DB_TABLES.SESSIONS).toCollection().first();
  });
}

function clearSessions(): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(DB_TABLES.SESSIONS).clear();
  });
}

export const sessionsTable = {
  createSession,
  getActiveSession,
  clearSessions,
};
