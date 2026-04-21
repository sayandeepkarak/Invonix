import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfileRequest } from "@/features/auth/store";
import type { User as UserType } from "@/features/auth/types";

export function useProfile() {
  const { user, isLoading } = useAppSelector((state) => {
    return state.auth;
  });
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

  const onSubmit = (data: Partial<UserType>) => {
    dispatch(updateProfileRequest(data));
  };

  return {
    form,
    user,
    isLoading,
    onSubmit,
  };
}
