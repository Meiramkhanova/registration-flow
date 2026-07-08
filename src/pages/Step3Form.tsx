import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import { useRegistrationStore } from "../store/registrationStore";

interface FormValues {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  password: string;
  confirmPassword: string;
  idNumber: string;
}

export default function Step3Form() {
  const navigate = useNavigate();
  const role = useRegistrationStore((s) => s.role);
  const setProfileData = useRegistrationStore((s) => s.setProfileData);

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isValid },
  } = useForm<FormValues>({
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

  const password = watch("password");
  const idLabel = role === "customer" ? "БИН" : "ИИН";

  const onSubmit = (data: FormValues) => {
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

  const onInvalid = (formErrors: typeof errors) => {
    const firstErrorField = Object.keys(formErrors)[0] as keyof FormValues;
    if (firstErrorField) setFocus(firstErrorField);
  };

  return (
    <AuthLayout title="Регистрация" topLabel="Регистрация 2">
      <p className="text-sm text-[--color-text-muted] mb-6">
        Заполните анкету для завершения регистрации
      </p>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Фамилия*"
            className={`w-full px-3 py-2.5 border rounded-lg outline-none text-sm
              ${errors.lastName ? "border-red-400" : "border-[--color-border-default] focus:border-brand"}`}
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">Обязательное поле</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Имя*"
            className={`w-full px-3 py-2.5 border rounded-lg outline-none text-sm
              ${errors.firstName ? "border-red-400" : "border-[--color-border-default] focus:border-brand"}`}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">Обязательное поле</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Отчество"
            className="w-full px-3 py-2.5 border border-[--color-border-default] rounded-lg outline-none text-sm focus:border-brand"
            {...register("middleName")}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email*"
            className={`w-full px-3 py-2.5 border rounded-lg outline-none text-sm
              ${errors.email ? "border-red-400" : "border-[--color-border-default] focus:border-brand"}`}
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">Некорректный email</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder={`${idLabel}*`}
            maxLength={12}
            className={`w-full px-3 py-2.5 border rounded-lg outline-none text-sm
              ${errors.idNumber ? "border-red-400" : "border-[--color-border-default] focus:border-brand"}`}
            {...register("idNumber", {
              required: true,
              pattern: /^\d{12}$/,
            })}
          />
          {errors.idNumber && (
            <p className="text-xs text-red-500 mt-1">
              {idLabel} должен содержать ровно 12 цифр
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль*"
            className={`w-full px-3 py-2.5 border rounded-lg outline-none text-sm
              ${errors.password ? "border-red-400" : "border-[--color-border-default] focus:border-brand"}`}
            {...register("password", {
              required: true,
              minLength: 8,
              pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
            })}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              Минимум 8 символов, буквы и цифры
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Повторите пароль*"
            className={`w-full px-3 py-2.5 border rounded-lg outline-none text-sm
              ${errors.confirmPassword ? "border-red-400" : "border-[--color-border-default] focus:border-brand"}`}
            {...register("confirmPassword", {
              required: true,
              validate: (v) => v === password || "Пароли не совпадают",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message || "Обязательное поле"}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-medium transition-colors bg-brand hover:bg-[--color-brand-dark]">
          ВОЙТИ
        </button>
      </form>
    </AuthLayout>
  );
}
