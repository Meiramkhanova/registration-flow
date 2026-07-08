import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import type { UserRole } from "../types/registration";
import { useRegistrationStore } from "../store/registrationStore";

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
      <p className="text-sm text-[--color-text-muted] mb-6">
        Выберите, как вы хотите использовать приложение
      </p>

      <div className="space-y-3 mb-6">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelected(role.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-colors flex items-start gap-3
              ${
                selected === role.id
                  ? "border-brand bg-cyan-50"
                  : "border-[--color-border-default] bg-white hover:border-gray-300"
              }`}>
            <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
              <RoleIcon roleId={role.id} />
            </div>
            <div>
              <div className="font-semibold text-[--color-text-primary]">
                {role.title}
              </div>
              <div className="text-sm text-[--color-text-muted] mt-1">
                {role.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!selected}
        className="w-full py-3 rounded-lg text-white font-medium transition-colors
          disabled:bg-[--color-brand-light] disabled:cursor-not-allowed
          bg-brand hover:bg-[--color-brand-dark]">
        ПРОДОЛЖИТЬ
      </button>
    </AuthLayout>
  );
}

function RoleIcon({ roleId }: { roleId: UserRole }) {
  if (roleId === "customer") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    );
  }
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-brand)"
      strokeWidth="2">
      <rect x="2" y="9" width="12" height="8" rx="1" />
      <path d="M14 12h5l3 3v2h-3" />
      <circle cx="6" cy="19" r="1.5" fill="var(--color-brand)" />
      <circle cx="17" cy="19" r="1.5" fill="var(--color-brand)" />
    </svg>
  );
}
