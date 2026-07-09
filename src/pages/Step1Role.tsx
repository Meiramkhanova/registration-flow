import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthLayout from "../app/AuthLayout";
import type { UserRole } from "../types/registration";
import { useRegistrationStore } from "../store/registrationStore";
import { Button } from "@/shared/ui/button";
import Card from "@/shared/components/Card";

export default function Step1Role() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setRole = useRegistrationStore((s) => s.setRole);
  const [selected, setSelected] = useState<UserRole | null>(null);

  const roles: { id: UserRole; title: string; desc: string }[] = [
    {
      id: "customer",
      title: t("step1.customerTitle"),
      desc: t("step1.customerDesc"),
    },
    {
      id: "carrier",
      title: t("step1.carrierTitle"),
      desc: t("step1.carrierDesc"),
    },
  ];

  const handleContinue = () => {
    if (!selected) return;
    setRole(selected);
    navigate("/otp");
  };

  return (
    <AuthLayout title={t("step0.title")}>
      <p className="text-gray-800 md:max-w-[80%] pb-6">
        {t("step1.description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {roles.map((role) => (
          <Card
            key={role.id}
            title={role.title}
            description={role.desc}
            roleId={role.id}
            selected={selected === role.id}
            onSelect={setSelected}
          />
        ))}
      </div>

      <Button type="button" onClick={handleContinue} disabled={!selected}>
        {t("step1.continue")}
      </Button>
    </AuthLayout>
  );
}
