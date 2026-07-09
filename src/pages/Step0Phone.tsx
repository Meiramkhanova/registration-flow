import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { useRegistrationStore } from "@/store/registrationStore";
import AuthLayout from "@/app/AuthLayout";
import { Checkbox } from "@/shared/ui/checkbox";
import { Button } from "@/shared/ui/button";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { useTranslation } from "react-i18next";

interface FormValues {
  phone: string;
  agree: boolean;
}

export default function Step0Phone() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setPhone = useRegistrationStore((s) => s.setPhone);

  const { t } = useTranslation();

  const { handleSubmit, watch, setValue } = useForm<FormValues>({
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
    <AuthLayout title={t("step0.title")}>
      <p className="text-gray-800 md:max-w-[80%] pb-6">
        {t("step0.description")}
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
              {t("step0.phoneError")}
            </p>
          )}
        </div>

        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox
              id="terms-checkbox-basic"
              name="terms-checkbox-basic"
              checked={agreeValue}
              onCheckedChange={(checked) =>
                setValue("agree", checked === true, { shouldValidate: true })
              }
            />

            <FieldLabel htmlFor="terms-checkbox-basic">
              {t("step0.agree")}{" "}
              <a href="#" className="text-brand underline">
                {t("step0.privacyPolicy")}
              </a>
            </FieldLabel>
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          disabled={!agreeValue || !isPhoneValid || loading}>
          {loading ? t("step0.submitting") : t("step0.submit")}
        </Button>
      </form>
    </AuthLayout>
  );
}
