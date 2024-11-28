import { Inter, Lusitana, Roboto } from "next/font/google";
import localFont from "next/font/local";

/** ******* Google Fonts ******* */
export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
/** ******* ******* ******* ******* */

/** ******* Local Fonts ******* */
export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
/** ******* ******* ******* ******* */
