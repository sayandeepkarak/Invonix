import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory - Inventory Management",
  description: "Manage your product inventory",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
