import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../app/AuthLayout";
import type { UserRole } from "../types/registration";
import { useRegistrationStore } from "../store/registrationStore";
import { Button } from "@/shared/ui/button";
import Card from "@/shared/components/Card";

const roles: { id: UserRole; title: string; desc: string }[] = [
  {
    id: "customer",
    title: "как заказчик",
    desc: "Контролируйте выполнение заявок в реальном времени",
  },
  {
    id: "carrier",
    title: "как перевозчик",
    desc: "Получайте актуальную информацию о своих перевозках",
  },
];

export default function Step1Role() {
  const navigate = useNavigate();
  const setRole = useRegistrationStore((s) => s.setRole);
  const [selected, setSelected] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    setRole(selected);
    navigate("/otp");
  };

  return (
    <AuthLayout title="Регистрация">
      <p className="text-gray-800 md:max-w-[80%] pb-6">
        Выберите, как вы хотите использовать приложение
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
        ПРОДОЛЖИТЬ
      </Button>
    </AuthLayout>
  );
}
