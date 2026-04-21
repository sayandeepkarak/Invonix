# System Architecture

## Project Structure
The application follows a modular, feature-based architecture to keep logic isolated and maintainable.

```text
src/
├── app/               # Application routes and page layouts
├── components/        # Shared UI components
│   ├── layout/        # Shared layouts like the Sidebar and Navigation
│   ├── ui/            # Base Shadcn/UI components
│   └── wrapper/       # Custom wrappers for consistent component behavior
├── features/          # Core business features
│   ├── auth/          # Account management and security
│   ├── dashboard/     # Data visualization and business insights
│   ├── inventory/     # Product tracking and management
│   └── orders/        # Order fulfillment and agent coordination
├── services/          # Data persistence (Dexie/IndexedDB)
├── store/             # Global state management and side effects
├── hooks/             # Shared application hooks
├── lib/               # Helper functions and utilities
└── constants/         # Global constants and configurations
```

## Page Implementation
All `page.tsx` files are server-side by default. However, to optimize performance and reduce initial bundle size:
- **Root Components**: The actual feature logic is encapsulated in "Management" components (e.g., `OrderManagement`).
- **Dynamic Imports**: These root components are client-side and dynamically imported in the `page.tsx` using `next/dynamic` (except for the Dashboard which is loaded normally).

## Component Wrappers
We use a wrapper pattern over our base UI components (found in `src/components/wrapper/`). This approach ensures:
- **Consistent UI Control**: Global changes to a component (like Button loading states) can be made in one place.
- **Minimal Code**: Reduces repetitive styling and prop drilling across features.
- **Project Standards**: Enforces accessibility and design tokens automatically.
