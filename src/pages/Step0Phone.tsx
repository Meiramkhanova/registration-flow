import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import { useRegistrationStore } from "../store/registrationStore";

interface FormValues {
  phone: string;
  agree: boolean;
}

function formatPhone(digits: string): string {
  const d = digits.slice(0, 10);
  let result = "";
  if (d.length > 0) result += `(${d.slice(0, 3)}`;
  if (d.length >= 4) result += `) ${d.slice(3, 6)}`;
  if (d.length >= 7) result += `-${d.slice(6, 8)}`;
  if (d.length >= 9) result += `-${d.slice(8, 10)}`;
  return result;
}

export default function Step0Phone() {
  const navigate = useNavigate();
  const setPhone = useRegistrationStore((s) => s.setPhone);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { phone: "", agree: false },
  });

  const phoneValue = watch("phone");
  const rawDigits = (phoneValue || "").replace(/\D/g, "");
  const isPhoneValid = rawDigits.length === 10;

  const onSubmit = () => {
    setLoading(true);
    setPhone(`+7${rawDigits}`);
    setTimeout(() => {
      setLoading(false);
      navigate("/role");
    }, 800);
  };

  return (
    <AuthLayout title="Регистрация">
      <p className="text-sm text-[--color-text-muted] mb-6">
        Для входа в личный кабинет введите свой номер телефона, на него будет
        отправлено SMS с проверочным кодом
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex border border-[--color-border-default] rounded-lg overflow-hidden">
          <div className="flex items-center gap-1 px-3 bg-gray-50 border-r border-[--color-border-default] text-sm text-[--color-text-primary]">
            🇰🇿 +7
          </div>
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: (v) => (v || "").replace(/\D/g, "").length === 10,
            }}
            render={({ field }) => (
              <input
                type="tel"
                placeholder="(000) 000-00-00"
                className="flex-1 px-3 py-2.5 outline-none text-sm"
                value={formatPhone(field.value.replace(/\D/g, ""))}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </div>

        <div className="flex items-start gap-2">
          <Controller
            name="agree"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="mt-1"
              />
            )}
          />
          <span className="text-sm text-[--color-text-muted]">
            Согласен с{" "}
            <a href="#" className="text-brand underline">
              политикой конфиденциальности
            </a>
          </span>
        </div>

        <button
          type="submit"
          disabled={!isValid || !isPhoneValid || loading}
          className="w-full py-3 rounded-lg text-white font-medium transition-colors
            disabled:bg-[--color-brand-light] disabled:cursor-not-allowed
            bg-brand hover:bg-[--color-brand-dark]">
          {loading ? "Отправка..." : "ВОЙТИ"}
        </button>
      </form>
    </AuthLayout>
  );
}
