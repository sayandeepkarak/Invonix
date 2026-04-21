import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginRequest } from "@/features/auth/store";
import type { LoginPayload } from "@/features/auth/types";

export function useSignin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => {
    return state.auth;
  });

  const form = useForm<LoginPayload>();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: LoginPayload) => {
    dispatch(loginRequest(data));
  };

  return {
    form,
    isLoading,
    error,
    onSubmit,
  };
}
