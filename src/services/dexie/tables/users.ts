import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { User } from "@/features/auth/types";

const TABLE_NAME: string = "users";

function createUser(user: User): Promise<void | undefined> {
  return manageAsyncOperation<void>(async () => {
    await db.table(TABLE_NAME).add(user);
  });
}

function getUserByEmail(email: string): Promise<User | undefined> {
  return manageAsyncOperation<User>(async () => {
    return await db.table(TABLE_NAME).where("email").equals(email).first();
  });
}

function getUserById(id: string): Promise<User | undefined> {
  return manageAsyncOperation<User>(async () => {
    return await db.table(TABLE_NAME).get(id);
  });
}

export const usersTable = {
  createUser,
  getUserByEmail,
  getUserById,
};
