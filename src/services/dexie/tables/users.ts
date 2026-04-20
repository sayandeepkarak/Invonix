import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { User } from "@/features/auth/types";
import { DB_TABLES } from "@/services/dexie/const";

function createUser(user: User): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(DB_TABLES.USERS).add(user);
  });
}

function getUserByEmail(email: string): Promise<User | undefined> {
  return manageAsyncOperation<User>(async () => {
    return await db.table(DB_TABLES.USERS).where("email").equals(email).first();
  });
}

function getUserById(id: string): Promise<User | undefined> {
  return manageAsyncOperation<User>(async () => {
    return await db.table(DB_TABLES.USERS).get(id);
  });
}

function updateUser(
  id: string,
  updates: Partial<User>,
): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(DB_TABLES.USERS).update(id, updates);
  });
}

export const usersTable = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
};
