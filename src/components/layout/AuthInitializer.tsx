"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { autoLoginRequest } from "@/features/auth/store";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(autoLoginRequest());
  }, [dispatch]);

  return <>{children}</>;
}
