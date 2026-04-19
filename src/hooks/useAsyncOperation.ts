"use client";
import { useState } from "react";
export function useAsyncOperation() {
  const [isLoading, setIsLoading] = useState(false);
  async function manageAsyncOperation(
    callback: () => Promise<unknown>,
    errCallback?: (error: unknown) => unknown,
    loadingCallback?: (loading: boolean) => void,
  ) {
    try {
      setIsLoading(true);
      loadingCallback?.(true);
      return await callback?.();
    } catch (error) {
      return errCallback?.(error);
    } finally {
      setIsLoading(false);
      loadingCallback?.(false);
    }
  }
  return {
    isLoading,
    manageAsyncOperation,
  };
}
