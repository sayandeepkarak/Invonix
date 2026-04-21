import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { Session } from "@/features/auth/types";
import { DB_TABLES } from "@/services/dexie/const";

export const sessionsTable = {
  createSession: (session: Session): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db.table(DB_TABLES.SESSIONS).clear();
        await db.table(DB_TABLES.SESSIONS).add(session);
      },
      () => {
        return undefined;
      },
    );
  },

  getActiveSession: (): Promise<Session | null> => {
    return manageAsyncOperation(
      async () => {
        const session = await db.table(DB_TABLES.SESSIONS).toCollection().first();
        return session || null;
      },
      () => {
        return null;
      },
    );
  },

  clearSessions: (): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db.table(DB_TABLES.SESSIONS).clear();
      },
      () => {
        return undefined;
      },
    );
  },
};
