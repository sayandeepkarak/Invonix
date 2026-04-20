import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppButton, AppInput } from "@/components/wrapper";
import { Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { updatePasswordRequest } from "@/features/auth/store";
import { toast } from "sonner";

export function SettingsSecurity() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      return;
    }
    dispatch(
      updatePasswordRequest({
        current: data.currentPassword,
        next: data.newPassword,
      }),
    );
    reset();
    toast.success("Password updated successfully");
  };

  return (
    <div className="space-y-8 ">
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="grid gap-4">
            <AppInput
              label="Current Password"
              type="password"
              placeholder="********"
              {...register("currentPassword", { required: "Required" })}
              error={errors.currentPassword?.message}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <AppInput
                label="New Password"
                type="password"
                placeholder="********"
                {...register("newPassword", {
                  required: "Required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
                error={errors.newPassword?.message}
              />
              <AppInput
                label="Confirm New Password"
                type="password"
                placeholder="********"
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (val) =>
                    val === watch("newPassword") || "Passwords do not match",
                })}
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <AppButton type="submit" loading={isLoading} disabled={isLoading}>
              Update Password
            </AppButton>
          </div>
        </form>
      </section>
    </div>
  );
}
