import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Session } from "@/features/auth/types";

const TABLE_NAME: string = "sessions";

function createSession(session: Session): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(TABLE_NAME).clear();
    await db.table(TABLE_NAME).add(session);
  });
}

function getActiveSession(): Promise<Session | undefined> {
  return manageAsyncOperation<Session>(async () => {
    return await db.table(TABLE_NAME).toCollection().first();
  });
}

function clearSessions(): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(TABLE_NAME).clear();
  });
}

export const sessionsTable = {
  createSession,
  getActiveSession,
  clearSessions,
};
