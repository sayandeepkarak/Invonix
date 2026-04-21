"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

interface LayoutProtectedRouteProps {
  children: React.ReactNode;
}

export function LayoutProtectedRoute({ children }: LayoutProtectedRouteProps) {
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated && (pathname.startsWith("/dashboard") || pathname !== "/auth/signin" && pathname !== "/auth/signup")) {
    return null;
  }

  return <>{children}</>;
}
