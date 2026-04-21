# Invonix - Inventory Management System

Invonix is a professional inventory management solution designed for businesses to track stock, manage orders, and coordinate delivery agents in real-time. It provides a clean, offline-first experience with a focus on speed and ease of use.

## Core Features
- **Dashboard**: Get a quick overview of your business performance with real-time analytics and revenue insights (Static).
- **Inventory Management**: Track products, manage stock levels, and set low-stock thresholds to stay ahead of demand.
- **Order Tracking**: Handle the full lifecycle of customer orders from initial placement to final delivery.
- **Agent Coordination**: Manage delivery agents and assign them to active orders to ensure timely fulfillment.
- **Authentication**: Simple and secure sign-in and sign-up flows for business account management.

## Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Build & Lint
```bash
pnpm build
```

### Formatting
```bash
pnpm format
```

## How It Works
- **Orders & Inventory**: The system automatically links orders to your current product inventory, calculating totals and tracking assignments.
- **Persistence**: Built with an offline-first approach using Dexie (IndexedDB), ensuring your data remains accessible even without a stable internet connection.
- **Component System**: Uses a custom wrapper system over Shadcn UI for a consistent, premium user experience throughout the application.

## Branching Strategy
- **`main`**: Production-ready code.
- **`staging`**: Development and feature integration.

