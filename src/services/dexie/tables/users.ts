import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { User } from "@/features/auth/types";
import { DB_TABLES } from "@/services/dexie/const";

export const usersTable = {
  createUser: (user: User): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db.table(DB_TABLES.USERS).add(user);
      },
      () => {
        return undefined;
      },
    );
  },

  getUserByEmail: (email: string): Promise<User | null> => {
    return manageAsyncOperation(
      async () => {
        const user = await db
          .table(DB_TABLES.USERS)
          .where("email")
          .equals(email)
          .first();
        return user || null;
      },
      () => {
        return null;
      },
    );
  },

  getUserById: (id: string): Promise<User | null> => {
    return manageAsyncOperation(
      async () => {
        const user = await db.table(DB_TABLES.USERS).get(id);
        return user || null;
      },
      () => {
        return null;
      },
    );
  },

  updateUser: (id: string, updates: Partial<User>): Promise<void> => {
    return manageAsyncOperation(
      async () => {
        await db.table(DB_TABLES.USERS).update(id, updates);
      },
      () => {
        return undefined;
      },
    );
  },
};
