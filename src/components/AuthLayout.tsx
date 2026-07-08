import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  topLabel?: string;
}

export default function AuthLayout({
  title,
  children,
  topLabel = "Регистрация",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[--color-topbar] text-white text-sm px-4 py-2">
        {topLabel}
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="relative bg-brand text-white flex flex-col justify-between p-8 md:p-12 md:w-1/2 min-h-70 md:min-h-0">
          <div>
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
              <rect y="0" width="32" height="4" fill="white" />
              <rect y="10" width="32" height="4" fill="white" />
              <rect y="20" width="20" height="4" fill="white" />
            </svg>
            <h1 className="mt-6 text-3xl md:text-4xl font-bold leading-tight">
              Добро пожаловать
              <br />в личный кабинет
              <br />
              для бизнеса!
            </h1>
          </div>

          <div className="flex justify-between items-end mt-8">
            <TruckIcon />
            <div className="hidden md:block" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/40" />
        </div>

        <div className="relative flex-1 flex flex-col justify-center p-8 md:p-12 md:w-1/2">
          <h2 className="text-2xl font-bold text-[--color-text-primary] mb-2">
            {title}
          </h2>
          {children}
          <PinIcon className="hidden md:block absolute bottom-8 right-8" />
        </div>
      </div>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      stroke="white"
      strokeWidth="2">
      <rect x="2" y="10" width="20" height="14" rx="1" />
      <path d="M22 14h8l6 6v4h-6" />
      <circle cx="9" cy="26" r="3" fill="white" />
      <circle cx="27" cy="26" r="3" fill="white" />
    </svg>
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="var(--color-brand)"
      strokeWidth="2">
      <path d="M16 2C10 2 6 6.5 6 12c0 8 10 18 10 18s10-10 10-18c0-5.5-4-10-10-10z" />
      <circle cx="16" cy="12" r="3" />
    </svg>
  );
}
