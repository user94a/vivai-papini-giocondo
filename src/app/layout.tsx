import type { Metadata } from "next";
import { Suspense } from "react";
import { Archivo, Archivo_Narrow } from "next/font/google";
import "./globals.css";
import "./restyling.css";
import "./typography.css";
import "./motion.css";
import { SiteMotion } from "@/components/SiteMotion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AntEasterEgg } from "@/components/AntEasterEgg";
import { LadybugEasterEgg } from "@/components/LadybugEasterEgg";

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
      <body className={`${archivo.className} min-h-full`}><div className="new-site" id="top"><Header />{children}<Footer /><Suspense fallback={null}><SiteMotion /><AntEasterEgg /><LadybugEasterEgg /></Suspense></div></body>
    </html>
  );
}
