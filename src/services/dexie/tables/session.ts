import { db } from "@/services/dexie/connection"
import type { Session } from "@/features/auth/types"

const TABLE_NAME: string = "sessions"

async function createSession(session: Session): Promise<void> {
  await db.table(TABLE_NAME).clear()
  await db.table(TABLE_NAME).add(session)
}

async function getActiveSession(): Promise<Session | undefined> {
  return db.table(TABLE_NAME).toCollection().first()
}

async function clearSessions(): Promise<void> {
  await db.table(TABLE_NAME).clear()
}

export const sessionsTable = {
  createSession,
  getActiveSession,
  clearSessions,
}
