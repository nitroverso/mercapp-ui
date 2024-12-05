import { getRequestConfig } from "next-intl/server";
import { routing } from "@/app/lib/i18n/routing";
import { getUserLocale } from "@/app/lib/services/serviceLocale";
import { SupportedLocales } from "@/app/lib/definitions/i18n";

export default getRequestConfig(async () => {
  let locale = await getUserLocale();
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as SupportedLocales)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
