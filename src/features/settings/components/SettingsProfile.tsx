import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { AppButton, AppInput } from "@/components/wrapper";
import { useForm } from "react-hook-form";
import { User as UserType } from "@/features/auth/types";
import { User as UserIcon, Mail, Building2, Phone } from "lucide-react";
import { updateProfileRequest } from "@/features/auth/store";
import { useEffect } from "react";

export function SettingsProfile() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<Partial<UserType>>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      businessName: user?.businessName,
      phone: user?.phone,
    },
  });

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

  return (
    <div className="grid gap-6 md:grid-cols-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <AppInput
              label="Full Name"
              icon={<UserIcon className="h-4 w-4" />}
              {...register("name")}
            />
            <AppInput
              label="Email Address"
              icon={<Mail className="h-4 w-4" />}
              disabled
              {...register("email")}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Business Information</h2>
            <AppInput
              label="Business Name"
              icon={<Building2 className="h-4 w-4" />}
              {...register("businessName")}
            />
            <AppInput
              label="Phone Number"
              icon={<Phone className="h-4 w-4" />}
              {...register("phone")}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <AppButton
            type="submit"
            disabled={!isDirty || isLoading}
            loading={isLoading}
          >
            Update Profile
          </AppButton>
        </div>
      </form>
    </div>
  );
}
