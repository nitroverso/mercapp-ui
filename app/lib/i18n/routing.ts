import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { SupportedLocales } from "@/app/lib/definitions/i18n";

const { EN, ES } = SupportedLocales;
export const locales: SupportedLocales[] = [EN, ES]; // A list of all locales that are supported
export const defaultLocale: SupportedLocales = ES; // Used when no locale matches

export const routing = defineRouting({
  defaultLocale,
  locales,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
