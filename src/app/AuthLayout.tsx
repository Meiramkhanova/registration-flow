import LanguageSwitcher from "@/components/LanguageSwitcher";
import CarIcon from "@/shared/icons/CarIcon";
import CoverIcon from "@/shared/icons/CoverIcon";
import MapIcon from "@/shared/icons/MapIcon";
import { cn } from "@/shared/utils/cn";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface AuthLayoutProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function AuthLayout({
  title,
  children,
  className,
}: AuthLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("min-h-screen sm:h-screen flex flex-col", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-7 h-full">
        <div
          className={cn(
            "left-info sm:col-span-3 relative bg-brand text-white",
            "py-12 md:py-24 px-8 md:px-16 md:h-full z-40",
          )}>
          <div className="lang-switcher absolute sm:hidden top-10 right-10 px-4 py-2 items-center justify-between">
            <LanguageSwitcher color="text-white" />
          </div>

          <div className="icon-title flex flex-col gap-4">
            <CoverIcon className="size-12" />

            <h1 className="title text-3xl md:text-5xl font-bold leading-tight tracking-wider">
              {t("layout.welcomeLine1")}
              <br />
              {t("layout.welcomeLine2")}
              <br />
              {t("layout.welcomeLine3")}
            </h1>
          </div>

          <CarIcon className="hidden md:block absolute bottom-24 size-12 left-8 md:left-16 md:size-20 -z-20 stroke-white" />

          <div className="absolute bottom-4 md:bottom-20 left-0 right-0 bg-white h-1 -z-20" />
        </div>

        <div
          className={cn(
            "right-info relative sm:col-span-4 py-6 md:py-24 px-12 md:px-24",
            "h-full gap-4 z-40",
          )}>
          <div className="lang-switcher absolute hidden sm:flex top-10 right-10 px-4 py-2 items-center justify-between">
            <LanguageSwitcher />
          </div>

          <div className="top-info flex flex-col gap-4">
            {title && (
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                {title}
              </h2>
            )}

            {children}
          </div>

          <MapIcon className="hidden sm:block absolute bottom-24 right-12 md:right-24 size-12 md:size-20 -z-20" />

          <div className="hidden sm:block absolute bottom-20 left-0 right-0 bg-brand h-1 -z-20" />
        </div>
      </div>
    </div>
  );
}
