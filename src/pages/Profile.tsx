import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../store/registrationStore";

interface EditableRow {
  label: string;
  key: "lastName" | "firstName" | "middleName" | "phone" | "email";
  value: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const store = useRegistrationStore();

  const [fields, setFields] = useState<EditableRow[]>([
    { label: "Фамилия", key: "lastName", value: store.lastName },
    { label: "Имя", key: "firstName", value: store.firstName },
    { label: "Отчество", key: "middleName", value: store.middleName || "" },
    { label: "Номер телефона", key: "phone", value: store.phone },
    { label: "Email", key: "email", value: store.email },
  ]);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const handleClear = (key: string) => {
    setFields((prev) =>
      prev.map((f) => (f.key === key ? { ...f, value: "" } : f)),
    );
  };

  const handleChange = (key: string, value: string) => {
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));
  };

  const handleSave = () => {
    const updates: Record<string, string> = {};
    fields.forEach((f) => {
      updates[f.key] = f.value;
    });
    store.setProfileData(updates);
    setEditingKey(null);
  };

  const handleLogout = () => {
    store.reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[--color-border-default]">
        <div className="flex items-center gap-2">
          <MenuIcon />
          <span className="font-bold text-lg tracking-wide">TRANSLINE</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
          👤
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex w-56 border-r border-[--color-border-default] flex-col py-4 px-3 text-sm">
          <NavGroup title="заявки">
            <NavItem label="Активные" />
            <NavItem label="Архивные" />
          </NavGroup>
          <NavGroup title="контрагенты">
            <NavItem label="Заказчики" />
            <NavItem label="Перевозчики" />
          </NavGroup>
          <NavGroup title="автопарк">
            <NavItem label="Транспорт" />
          </NavGroup>
          <div className="mt-auto">
            <NavGroup title="управление">
              <NavItem label="Справочники" />
              <NavItem label="Менеджеры" />
            </NavGroup>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-2 py-2 mt-2 text-red-500 hover:bg-red-50 rounded">
              Выйти
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 flex justify-center md:justify-end">
          <div className="w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 text-sm border border-brand text-brand rounded hover:bg-cyan-50">
                Сохранить
              </button>
              <span className="text-[--color-text-muted]">›</span>
            </div>

            <div className="space-y-1">
              {fields.map((f) => (
                <div
                  key={f.key}
                  className="flex items-center justify-between py-2 border-b border-[--color-border-default]">
                  <span className="text-sm text-[--color-text-muted] w-36 shrink-0">
                    {f.label}
                  </span>
                  {editingKey === f.key ? (
                    <input
                      autoFocus
                      type="text"
                      value={f.value}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      onBlur={() => setEditingKey(null)}
                      className="flex-1 text-sm outline-none border-b border-brand"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingKey(f.key)}
                      className="flex-1 text-left text-sm font-medium text-[--color-text-primary]">
                      {f.value || "—"}
                    </button>
                  )}
                  {f.value && (
                    <button
                      type="button"
                      onClick={() => handleClear(f.key)}
                      className="ml-2 text-[--color-text-muted] hover:text-red-500 text-sm">
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="text-xs uppercase text-[--color-text-muted] px-2 mb-1">
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <div className="px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer text-[--color-text-primary]">
      {label}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
