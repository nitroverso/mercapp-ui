import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
// fonts
import { geistMono, geistSans } from "@/app/ui/typography/fonts";
// styles
import "@/app/ui/styles/globals.css";
import theme from "@/app/ui/styles/theme";

export const metadata: Metadata = {
  title: "Mercapp",
  description: "Simplify your shopping, elevate your life!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
