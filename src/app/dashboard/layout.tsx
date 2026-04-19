import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Dashboard - Inventory Management",
  description: "Your inventory management dashboard",
}
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
