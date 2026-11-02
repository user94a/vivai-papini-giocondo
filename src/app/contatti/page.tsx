import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contatti } from "@/components/sections/Contatti";
import "../restyling.css";

export const metadata = { title: "Contatti | Vivai Papini Giocondo" };

export default function ContattiPage() {
  return <div className="new-site" id="top"><Header /><main><div className="dedicated-intro"><h1>Contatti.</h1><p>Parliamo del tuo progetto e della prossima fornitura.</p></div><Contatti /></main><Footer /></div>;
}
