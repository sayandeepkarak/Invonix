import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/components/layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Invonix — Inventory Management",
  description: "Industry-grade inventory management platform",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <StoreProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
