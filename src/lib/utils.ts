import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function manageAsyncOperation<T>(
  callback: () => Promise<T>,
  errCallback?: (error: unknown) => T,
  loadingCallback?: (loading: boolean) => void,
): Promise<T | undefined> {
  try {
    loadingCallback?.(true);
    return await callback?.();
  } catch (error) {
    return errCallback?.(error);
  } finally {
    loadingCallback?.(false);
  }
}
