"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { autoLoginRequest } from "@/features/auth/store";
import { Loader2 } from "lucide-react";
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isInitialized } = useAppSelector(
    (state) => state.auth,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!isInitialized && !isLoading) {
      dispatch(autoLoginRequest());
    } else if (isInitialized && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isInitialized, isAuthenticated, router]);
  if (!isInitialized || (isLoading && !isAuthenticated)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
