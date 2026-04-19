import { db } from "@/services/dexie/connection"
import type { Product } from "@/features/inventory/types"

const TABLE_NAME: string = "products"

async function getAll(): Promise<Product[]> {
  return db.table(TABLE_NAME).toArray()
}

async function getById(id: string): Promise<Product | undefined> {
  return db.table(TABLE_NAME).get(id)
}

async function create(product: Product): Promise<void> {
  await db.table(TABLE_NAME).add(product)
}

async function update(id: string, data: Partial<Product>): Promise<void> {
  await db.table(TABLE_NAME).update(id, { ...data, updatedAt: new Date().toISOString() })
}

async function softDelete(id: string): Promise<void> {
  await db.table(TABLE_NAME).update(id, { isActive: false, updatedAt: new Date().toISOString() })
}

async function hardDelete(id: string): Promise<void> {
  await db.table(TABLE_NAME).delete(id)
}

async function getByCategory(category: string): Promise<Product[]> {
  return db.table(TABLE_NAME).where("category").equals(category).toArray()
}

async function searchByName(query: string): Promise<Product[]> {
  const all = await db.table(TABLE_NAME).toArray()
  const lower = query.toLowerCase()
  return all.filter((p: Product) => p.name.toLowerCase().includes(lower) || p.sku.toLowerCase().includes(lower))
}

export const productsTable = {
  getAll,
  getById,
  create,
  update,
  softDelete,
  hardDelete,
  getByCategory,
  searchByName,
}
