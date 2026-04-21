"use client";
import { LayoutProtectedRoute } from "@/components/layout/LayoutProtectedRoute";
import { LayoutSidebar } from "@/components/layout/LayoutSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";

interface LayoutAppProps {
  children: React.ReactNode;
}

export function LayoutApp({ children }: LayoutAppProps) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <LayoutProtectedRoute>
      <SidebarProvider>
        <div className="bg-background flex min-h-screen w-full">
          <LayoutSidebar />
          <SidebarInset>
            <header className="bg-background/95 sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6 backdrop-blur">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {user?.businessName || "Invonix"}
                </span>
              </div>
            </header>
            <main className="flex-1 p-6 md:p-8">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </LayoutProtectedRoute>
  );
}
