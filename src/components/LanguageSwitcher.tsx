import { cn } from "@/shared/utils/cn";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang: "ru" | "en") => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => toggleLanguage("ru")}
        className={cn(
          "cursor-pointer border-r pr-2.5",
          i18n.language === "ru" ? "font-bold text-brand" : "text-brand/50",
        )}>
        RU
      </button>

      <span className="text-white/30">|</span>
      <button
        type="button"
        onClick={() => toggleLanguage("en")}
        className={cn(
          "cursor-pointer pl-2.5",
          i18n.language === "en" ? "font-bold text-brand" : "text-brand/50",
        )}>
        EN
      </button>
    </div>
  );
}
