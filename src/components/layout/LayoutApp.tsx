"use client";
import { LayoutProtectedRoute } from "@/components/layout/LayoutProtectedRoute";
import { LayoutSidebar } from "@/components/layout/LayoutSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface LayoutAppProps {
  children: React.ReactNode;
}

export function LayoutApp({ children }: LayoutAppProps) {
  return (
    <LayoutProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background w-full">
          <LayoutSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 sticky top-0 bg-background/95 backdrop-blur z-10">
              <SidebarTrigger className="-ml-1" />
            </header>
            <main className="p-6 md:p-8 flex-1">
              <div className="max-w-7xl mx-auto w-full">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </LayoutProtectedRoute>
  );
}
