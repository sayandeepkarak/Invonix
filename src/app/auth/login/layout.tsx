import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Login - Inventory Management",
  description: "Sign in to your inventory management account",
}
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
