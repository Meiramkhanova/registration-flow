import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  LogOut,
  ChevronDown,
  FolderOpen,
  Users,
  UserRoundArrowLeft,
  BookOpenCheck,
  SquareUserRound,
  Pencil,
  Check,
  Loader2,
} from "lucide-react";
import { useRegistrationStore } from "@/store/registrationStore";
import LogoIcon from "@/shared/icons/LogoIcon";
import ActiveIcon from "@/shared/icons/ActiveIcon";
import { cn } from "@/shared/utils/cn";
import CarIcon from "@/shared/icons/CarIcon";
import { Button } from "@/shared/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface EditableRow {
  labelKey: string;
  key: "lastName" | "firstName" | "middleName" | "phone" | "email";
  value: string;
  editable: boolean;
}

type SaveStatus = "idle" | "saving" | "saved";

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const store = useRegistrationStore();

  const [fields, setFields] = useState<EditableRow[]>([
    {
      labelKey: "step3.lastName",
      key: "lastName",
      value: store.lastName,
      editable: true,
    },
    {
      labelKey: "step3.firstName",
      key: "firstName",
      value: store.firstName,
      editable: true,
    },
    {
      labelKey: "step3.middleNameLabel",
      key: "middleName",
      value: store.middleName || "",
      editable: false,
    },
    {
      labelKey: "profile.phone",
      key: "phone",
      value: store.phone,
      editable: false,
    },
    {
      labelKey: "step3.email",
      key: "email",
      value: store.email,
      editable: true,
    },
  ]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const handleChange = (key: string, value: string) => {
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));
  };

  const handleSave = () => {
    setEditingKey(null);
    setSaveStatus("saving");

    const updates: Record<string, string> = {};
    fields.forEach((f) => {
      updates[f.key] = f.value;
    });

    setTimeout(() => {
      store.setProfileData(updates);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 600);
  };

  const handleLogout = () => {
    store.reset();
    navigate("/");
  };

  const initials =
    `${store.firstName?.[0] || ""}${store.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <LogoIcon />
          <span className="font-bold text-lg tracking-wider">TRANSLINE</span>
        </div>

        <div className="flex items-center gap-8">
          <LanguageSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 outline-none">
              <Avatar className="size-10">
                <AvatarFallback className="bg-gray-50 text-gray-800 text-xs font-medium border-none">
                  {initials || "👤"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5 text-xs">
                <div className="font-medium text-gray-800">
                  {store.firstName} {store.lastName}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {store.email}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                {t("profile.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:flex w-60 border-r border-[--color-border-default] flex-col py-4 text-sm bg-gray-50">
          <NavGroup title={t("profile.nav.requests")}>
            <NavItem
              icon={<ActiveIcon className="size-5 stroke-gray-500" />}
              label={t("profile.nav.active")}
              isActive
            />
            <NavItem
              icon={<FolderOpen className="size-5 stroke-gray-500" />}
              label={t("profile.nav.archive")}
            />
          </NavGroup>

          <NavGroup title={t("profile.nav.contractors")}>
            <NavItem
              icon={<Users className="size-5 stroke-gray-500" />}
              label={t("profile.nav.customers")}
            />
            <NavItem
              icon={<UserRoundArrowLeft className="size-5 stroke-gray-500" />}
              label={t("profile.nav.carriers")}
            />
          </NavGroup>
          <NavGroup title={t("profile.nav.fleet")}>
            <NavItem
              icon={
                <CarIcon className="size-5 stroke-gray-500 fill-transparent" />
              }
              label={t("profile.nav.transport")}
            />
          </NavGroup>
          <div className="mt-auto">
            <NavGroup title={t("profile.nav.management")}>
              <NavItem
                icon={
                  <BookOpenCheck className="size-5 stroke-gray-500 fill-transparent" />
                }
                label={t("profile.nav.references")}
              />
              <NavItem
                icon={
                  <SquareUserRound className="size-5 stroke-gray-500 fill-transparent" />
                }
                label={t("profile.nav.managers")}
              />
            </NavGroup>
          </div>
        </aside>

        <main className="flex-1 flex justify-center md:justify-end">
          <div className="w-full max-w-xl border-l py-6">
            <div className="flex justify-between items-center pb-6 border-b px-6">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  className="px-4 py-1.5 text-sm border border-brand text-brand rounded hover:bg-cyan-50 bg-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5">
                  {saveStatus === "saving" && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  )}
                  {saveStatus === "saving"
                    ? t("profile.saving")
                    : t("profile.save")}
                </Button>

                {saveStatus === "saved" && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    {t("profile.saved")}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 px-6 pt-2">
              {fields.map((f) => (
                <div
                  key={f.key}
                  className="flex items-center justify-between py-2 border-b border-[--color-border-default]">
                  <span className="text-gray-500 w-36 shrink-0">
                    {t(f.labelKey)}
                  </span>

                  {editingKey === f.key ? (
                    <input
                      autoFocus
                      type="text"
                      value={f.value}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      onBlur={() => setEditingKey(null)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setEditingKey(null)
                      }
                      className="flex-1 text-sm outline-none border-b border-brand"
                    />
                  ) : (
                    <span className="flex-1 text-gray-800">
                      {f.value || "—"}
                    </span>
                  )}

                  {f.editable && editingKey !== f.key && (
                    <button
                      type="button"
                      onClick={() => setEditingKey(f.key)}
                      className="ml-2 text-gray-800 hover:text-brand">
                      <Pencil className="size-3.5" />
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
      <div className="text-lg tracking-wider font-medium pb-2.5 mb-2 px-4 border-b-2 border-dashed">
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function NavItem({
  label,
  icon,
  isActive = false,
}: {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-1 rounded hover:bg-gray-50 cursor-pointer text-gray-600">
      {icon}
      <div
        className={cn("label text-base", isActive && "text-black font-medium")}>
        {label}
      </div>
    </div>
  );
}
