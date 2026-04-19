import { db } from "@/services/dexie/connection";
import { manageAsyncOperation } from "@/lib/utils";
import type { User } from "@/features/auth/types";

const TABLE_NAME: string = "users";

async function createUser(user: User): Promise<void> {
  await manageAsyncOperation(
    () => db.table(TABLE_NAME).add(user),
    (error) => {
      throw new Error(`Failed to create user: ${error}`);
    },
  );
}

async function getUserByEmail(email: string): Promise<User | undefined> {
  return await manageAsyncOperation(
    () => db.table(TABLE_NAME).where("email").equals(email).first(),
    (error) => {
      throw new Error(`Database error: ${error}`);
    },
  );
}

async function getUserById(id: string): Promise<User | undefined> {
  return await manageAsyncOperation(
    () => db.table(TABLE_NAME).get(id),
    (error) => {
      throw new Error(`Database error: ${error}`);
    },
  );
}

export const usersTable = {
  createUser,
  getUserByEmail,
  getUserById,
};
