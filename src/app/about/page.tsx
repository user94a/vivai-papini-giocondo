import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareCards } from "@/components/CareCards";
import { sitePath } from "@/lib/site-path";
import "../restyling.css";

export const metadata = { title: "About | Vivai Papini Giocondo" };

export default function AboutPage() {
  return <div className="new-site" id="top"><Header /><main><div className="dedicated-intro"><h1>Le nostre radici.</h1><p>Una storia di famiglia, a Pescia dal 1920.</p></div><section className="roots-section" id="storia"><div className="roots-copy"><h2>Non si cresce<br />in un giorno.</h2><p>Dal 1920, a Pescia, la famiglia Papini coltiva una passione che si tramanda da tre generazioni. Un sapere cresciuto sul campo, che oggi mettiamo al servizio di vivai, garden center e professionisti del verde: dalla cura delle piante alla scelta della fornitura giusta per ogni progetto.</p></div><div className="roots-image"><img src={sitePath("/images/optimized/olivi-foto.webp")} alt="Filari di olivi coltivati in vaso nel vivaio" loading="lazy" /><div className="image-note">Il verde è un lavoro.<br />E un modo di vedere le cose.</div></div></section><CareCards /></main><Footer /></div>;
}
