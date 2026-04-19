import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Sign Up - Inventory Management",
  description: "Create your inventory management account",
}
export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
