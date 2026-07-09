import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../app/AuthLayout";
import { useRegistrationStore } from "../store/registrationStore";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";
import {
  profileFormSchema,
  type ProfileFormValues,
} from "../schemas/profileFormSchema";

export default function Step3Form() {
  const navigate = useNavigate();
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

  const idLabel = role === "customer" ? "БИН" : "ИИН";

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
          placeholder="Фамилия*"
          className={cn(
            "input",
            errors.lastName ? "border-red-400" : "focus:border-brand",
          )}
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
        )}

        <Input
          type="text"
          placeholder="Имя*"
          className={cn(
            "input",
            errors.firstName ? "border-red-400" : "focus:border-brand",
          )}
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-xs text-red-500 mt-1">
            {errors.firstName.message}
          </p>
        )}

        <Input
          type="text"
          placeholder="Отчество (необязательно)"
          className={cn("input", "focus:border-brand")}
          {...register("middleName")}
        />

        <Input
          type="email"
          placeholder="Email*"
          className={cn(
            "input",
            errors.email ? "border-red-400" : "focus:border-brand",
          )}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
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
            {idLabel} {errors.idNumber.message}
          </p>
        )}

        <Input
          type="password"
          placeholder="Пароль*"
          className={cn(
            "input",
            errors.password ? "border-red-400" : "focus:border-brand",
          )}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}

        <Input
          type="password"
          placeholder="Повторите пароль*"
          className={cn(
            "input",
            errors.confirmPassword ? "border-red-400" : "focus:border-brand",
          )}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

        <Button type="submit" className="w-full mt-4">
          ВОЙТИ
        </Button>
      </form>
    </AuthLayout>
  );
}
