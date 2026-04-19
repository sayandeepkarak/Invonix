"use client";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AppSidebar } from "@/components/layout/AppSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
interface AppLayoutProps {
  children: React.ReactNode;
}
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background w-full">
          <AppSidebar />
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
    </ProtectedRoute>
  );
}
