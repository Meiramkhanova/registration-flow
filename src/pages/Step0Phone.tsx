import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { useRegistrationStore } from "@/store/registrationStore";
import AuthLayout from "@/components/AuthLayout";
import { Field, FieldGroup, FieldLabel, Checkbox } from "@/shared/ui/checkbox";
import { Button } from "@/shared/ui/button";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";

interface FormValues {
  phone: string;
  agree: boolean;
}

export default function Step0Phone() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setPhone = useRegistrationStore((s) => s.setPhone);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { phone: "", agree: false },
  });

  const phoneValue = watch("phone");
  const agreeValue = watch("agree");

  const isPhoneValid = phoneValue ? isValidPhoneNumber(phoneValue) : false;

  const onSubmit = () => {
    setLoading(true);
    setPhone(phoneValue);

    setTimeout(() => {
      setLoading(false);
      navigate("/role");
    }, 800);
  };

  return (
    <AuthLayout title="Регистрация">
      <p className="text-gray-800 md:max-w-[80%] pb-6">
        Для входа в личный кабинет введите свой номер телефона, на него будет
        отправлено SMS с проверочным кодом
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="phone-input-wrapper">
          <PhoneInput
            defaultCountry="kz"
            value={phoneValue}
            onChange={(phone) =>
              setValue("phone", phone, { shouldValidate: true })
            }
            className="phone-input-wrapper"
          />
          {phoneValue && !isPhoneValid && (
            <p className="text-sm text-red-500 mt-1.5 font-medium">
              Введите корректный номер телефона
            </p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="agree"
            checked={agreeValue}
            onCheckedChange={(checked) =>
              setValue("agree", checked === true, { shouldValidate: true })
            }
            className="mt-0.5"
          />

          <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <FieldLabel htmlFor="terms-checkbox-basic">
                Accept terms and conditions
              </FieldLabel>
            </Field>
          </FieldGroup>

          <label
            htmlFor="agree"
            className="text-sm text-[--color-text-muted] cursor-pointer">
            Согласен с{" "}
            <a href="#" className="text-brand underline">
              политикой конфиденциальности
            </a>
          </label>
        </div>

        <Button
          type="submit"
          disabled={!isValid || !isPhoneValid || loading}
          className="w-full py-6 rounded-full text-white font-medium
            disabled:bg-[--color-brand-light] disabled:cursor-not-allowed
            bg-brand hover:bg-[--color-brand-dark]">
          {loading ? "Отправка..." : "ВОЙТИ"}
        </Button>
      </form>
    </AuthLayout>
  );
}
