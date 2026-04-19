import { db } from "@/services/dexie/connection"
import type { User } from "@/features/auth/types"
const TABLE_NAME: string = "users"
async function createUser(user: User): Promise<void> {
  await db.table(TABLE_NAME).add(user)
}
async function getUserByEmail(email: string): Promise<User | undefined> {
  return db.table(TABLE_NAME).where("email").equals(email).first()
}
async function getUserById(id: string): Promise<User | undefined> {
  return db.table(TABLE_NAME).get(id)
}
export const usersTable = {
  createUser,
  getUserByEmail,
  getUserById,
}
