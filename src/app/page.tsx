"use client";
import { Header } from "@/components/Header";
import { sitePath } from "@/lib/site-path";
import { Footer } from "@/components/Footer";
import { Contatti } from "@/components/sections/Contatti";
import { CareCards } from "@/components/CareCards";
import { Catalog } from "@/components/Catalog";
import "./restyling.css";

export default function Home() {
  return <div className="new-site" id="top">
    <Header />
    <main><section className="new-hero"><div className="hero-heading"><h1>Coltiviamo<br />il tuo verde.</h1><div className="hero-description"><p>Produciamo piante per il tuo vivaio, il tuo garden center e i tuoi progetti di verde.</p></div></div><div className="hero-landscape"><img src={sitePath("/images/optimized/hero-rosa-tempera.webp")} alt="Illustrazione botanica di una mano che pota una rosa" fetchPriority="high" /><div className="landscape-caption"><span>Dal 1920,<br />stagione dopo stagione.</span></div></div></section>
    <Catalog />
    <section className="roots-section" id="storia"><div className="roots-copy"><h2>Non si cresce<br />in un giorno.</h2><p>Dal 1920, a Pescia, la famiglia Papini coltiva una passione che si tramanda da tre generazioni. Un sapere cresciuto sul campo, che oggi mettiamo al servizio di vivai, garden center e professionisti del verde: dalla cura delle piante alla scelta della fornitura giusta per ogni progetto.</p></div><div className="roots-image"><img src={sitePath("/images/optimized/olivi-foto.webp")} alt="Filari di olivi coltivati in vaso nel vivaio" loading="lazy" /><div className="image-note">Il verde è un lavoro.<br />E un modo di vedere le cose.</div></div></section>
    <CareCards /><Contatti /></main><Footer /></div>;
}
