import { useTranslations } from "next-intl";

export default function ComingSoon() {
  const t = useTranslations("ui");

  return (
    <div className="flex items-center justify-center text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t("coming")}</h1>
        <p className="text-lg mb-6">{t("comingSoon")}</p>
      </div>
    </div>
  );
}
