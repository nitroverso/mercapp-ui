"use server";

import { SupportedLocales } from "@/app/lib/definitions/i18n";
import { defaultLocale } from "@/app/lib/i18n/routing";
import { cookies } from "next/headers";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const storedCookies = await cookies();
  return storedCookies.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: SupportedLocales) {
  const storedCookies = await cookies();
  storedCookies.set(COOKIE_NAME, locale);
}
