import type { Metadata } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-archivo-narrow",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivai Papini Giocondo",
  description:
    "Vivaio B2B dal 1920: olivi, mimose e rose scelti pianta per pianta. Agronomo a disposizione, consegne in Italia in 2-3 giorni.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${archivo.variable} ${archivoNarrow.variable} h-full`}
    >
      <body className={`${archivo.className} min-h-full`}>{children}</body>
    </html>
  );
}
