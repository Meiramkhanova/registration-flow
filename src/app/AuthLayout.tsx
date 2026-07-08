import CarIcon from "@/shared/icons/CarIcon";
import CoverIcon from "@/shared/icons/CoverIcon";
import MapIcon from "@/shared/icons/MapIcon";
import { cn } from "@/shared/utils/cn";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function AuthLayout({
  title,
  children,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "h-screen md:max-h-screen md:overflow-hidden flex flex-col",
        className,
      )}>
      <div className="grid grid-cols-1 sm:grid-cols-7 h-full">
        <div
          className={cn(
            "left-info col-span-3 relative bg-brand text-white",
            "flex flex-col justify-between py-12 md:py-24 px-8 md:px-16 h-full",
          )}>
          <div className="icon-title flex flex-col gap-4">
            <CoverIcon className="size-12" />

            <h1 className="title text-3xl md:text-5xl font-bold leading-tight tracking-wider">
              Добро пожаловать
              <br />в личный кабинет
              <br />
              для бизнеса!
            </h1>
          </div>

          <CarIcon className="size-12 md:size-20" />

          <div className="absolute bottom-20 left-0 right-0 bg-white h-1" />
        </div>

        <div
          className={cn(
            "right-info relative col-span-4 py-6 md:py-24 px-12 md:px-24",
            "flex flex-col justify-between h-full gap-4",
          )}>
          <div className="top-info flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              {title}
            </h2>

            {children}
          </div>

          <div className="w-full flex justify-end">
            <MapIcon className="size-12 md:size-20" />
          </div>

          <div className="absolute bottom-20 left-0 right-0 bg-brand h-1" />
        </div>
      </div>
    </div>
  );
}
