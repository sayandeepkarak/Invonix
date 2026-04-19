import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Session } from "@/features/auth/types";

const TABLE_NAME: string = "sessions";

async function createSession(session: Session): Promise<void> {
  await manageAsyncOperation(
    async () => {
      await db.table(TABLE_NAME).clear();
      await db.table(TABLE_NAME).add(session);
    },
    (error) => {
      throw new Error(`Failed to create session: ${error}`);
    },
  );
}

async function getActiveSession(): Promise<Session | undefined> {
  return await manageAsyncOperation(
    () => db.table(TABLE_NAME).toCollection().first(),
    (error) => {
      throw new Error(`Database error: ${error}`);
    },
  );
}

async function clearSessions(): Promise<void> {
  await manageAsyncOperation(
    () => db.table(TABLE_NAME).clear(),
    (error) => {
      throw new Error(`Failed to clear sessions: ${error}`);
    },
  );
}

export const sessionsTable = {
  createSession,
  getActiveSession,
  clearSessions,
};
