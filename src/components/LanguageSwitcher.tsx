import { cn } from "@/shared/utils/cn";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher({ color }: { color?: string }) {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang: "ru" | "en") => {
    i18n.changeLanguage(lang);
  };

  const isRu = i18n.language === "ru";
  const isEn = i18n.language === "en";

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => toggleLanguage("ru")}
        style={color ? { color } : undefined}
        className={cn(
          "cursor-pointer border-r pr-2.5",
          isRu && "font-bold",
          !color && (isRu ? "text-brand" : "text-brand/50"),
        )}>
        RU
      </button>

      <button
        type="button"
        onClick={() => toggleLanguage("en")}
        style={color ? { color } : undefined}
        className={cn(
          "cursor-pointer pl-2.5",
          isEn && "font-bold",
          !color && (isEn ? "text-brand" : "text-brand/50"),
        )}>
        EN
      </button>
    </div>
  );
}
