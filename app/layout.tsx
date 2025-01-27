import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import AppInitializer from "@/app/AppInitializer";
// fonts
import { geistMono, geistSans } from "@/app/ui/typography/fonts";
// i18n
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
// styles
import "@/app/ui/styles/globals.css";
import theme from "@/app/ui/styles/theme";

export const metadata: Metadata = {
  description: "Simplify your shopping, elevate your life!",
  title: "Mercapp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <NextIntlClientProvider messages={messages}>
              <SessionProvider>
                <AppInitializer>{children}</AppInitializer>
              </SessionProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
