import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfileRequest } from "@/features/auth/store";
import type { User as UserType } from "@/features/auth/types";

export function useProfile() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useForm<Partial<UserType>>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      businessName: user?.businessName,
      phone: user?.phone,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        businessName: user.businessName,
        phone: user.phone,
      });
    }
  }, [user, reset]);

  const onSubmit = useCallback((data: Partial<UserType>) => {
    dispatch(updateProfileRequest(data));
  }, [dispatch]);

  return {
    form,
    user,
    isLoading,
    onSubmit,
  };
}
