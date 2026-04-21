# Data Models

## Storage Strategy
Invonix uses **Dexie.js** for client-side persistence. This ensures that all business data remains available offline and persists between browser sessions.

## Tables

### Users
Stores account and business profile information.
- `id`: UUID
- `email`: string (Primary Index)
- `businessName`: string
- `businessType`: string

### Products
Core inventory items.
- `id`: string
- `sku`: string (Unique Index)
- `price`: number
- `stock`: number
- `lowStockThreshold`: number

### Orders
Transaction and fulfillment records.
- `id`: string
- `userId`: string (FK)
- `agentId`: string (FK, optional)
- `status`: PENDING | CONFIRMED | SHIPPED | DELIVERED
- `totalAmount`: number

### Agents
Delivery personnel profiles.
- `id`: string
- `status`: AVAILABLE | BUSY | OFFLINE

## Implementation
- **Sagas**: All database interactions are managed through Redux Sagas to separate side effects from the UI.
- **Joins**: Relational data (like linking an Order to an Agent) is resolved at the service layer during data retrieval.
