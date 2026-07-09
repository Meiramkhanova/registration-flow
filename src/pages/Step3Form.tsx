import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";
import {
  profileFormSchema,
  type ProfileFormValues,
} from "../schemas/profileFormSchema";
import { useRegistrationStore } from "@/store/registrationStore";
import AuthLayout from "@/app/AuthLayout";

export default function Step3Form() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const role = useRegistrationStore((s) => s.role);
  const setProfileData = useRegistrationStore((s) => s.setProfileData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      lastName: "",
      firstName: "",
      middleName: "",
      email: "",
      password: "",
      confirmPassword: "",
      idNumber: "",
    },
  });

  const idLabel = role === "customer" ? t("step3.bin") : t("step3.iin");

  const onSubmit = (data: ProfileFormValues) => {
    setProfileData({
      lastName: data.lastName,
      firstName: data.firstName,
      middleName: data.middleName,
      email: data.email,
      password: data.password,
      idNumber: data.idNumber,
    });

    navigate("/profile");
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder={`${t("step3.lastName")}*`}
          className={cn(
            "input",
            errors.lastName ? "border-red-400" : "focus:border-brand",
          )}
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-xs text-red-500 mt-1">
            {t(errors.lastName.message as string)}
          </p>
        )}

        <Input
          type="text"
          placeholder={`${t("step3.firstName")}*`}
          className={cn(
            "input",
            errors.firstName ? "border-red-400" : "focus:border-brand",
          )}
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-xs text-red-500 mt-1">
            {t(errors.firstName.message as string)}
          </p>
        )}

        <Input
          type="text"
          placeholder={t("step3.middleName")}
          className={cn("input", "focus:border-brand")}
          {...register("middleName")}
        />

        <Input
          type="email"
          placeholder={`${t("step3.email")}*`}
          className={cn(
            "input",
            errors.email ? "border-red-400" : "focus:border-brand",
          )}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">
            {t(errors.email.message as string)}
          </p>
        )}

        <Input
          type="text"
          placeholder={`${idLabel}*`}
          maxLength={12}
          className={cn(
            "input",
            errors.idNumber ? "border-red-400" : "focus:border-brand",
          )}
          {...register("idNumber")}
        />
        {errors.idNumber && (
          <p className="text-xs text-red-500 mt-1">
            {idLabel} {t(errors.idNumber.message as string)}
          </p>
        )}

        <Input
          type="password"
          placeholder={`${t("step3.password")}*`}
          className={cn(
            "input",
            errors.password ? "border-red-400" : "focus:border-brand",
          )}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">
            {t(errors.password.message as string)}
          </p>
        )}

        <Input
          type="password"
          placeholder={`${t("step3.confirmPassword")}*`}
          className={cn(
            "input",
            errors.confirmPassword ? "border-red-400" : "focus:border-brand",
          )}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {t(errors.confirmPassword.message as string)}
          </p>
        )}

        <Button type="submit" className="w-full mt-4 uppercase">
          {t("step3.submit")}
        </Button>
      </form>
    </AuthLayout>
  );
}
