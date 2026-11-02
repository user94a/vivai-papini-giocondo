"use client";
import { sitePath } from "@/lib/site-path";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Footer } from "@/components/Footer";
import { Contatti } from "@/components/sections/Contatti";
import { Catalog } from "@/components/Catalog";
import "./restyling.css";

export default function Home() {
  const [menu, setMenu] = useState(false);
  return <div className="new-site" id="top">
    <header className="new-header"><a href="#top" className="new-brand"><BrandLogo size="sm" priority /></a><nav aria-label="Principale" className={menu ? "new-nav open" : "new-nav"}><a href="#produzioni" onClick={() => setMenu(false)}>Le nostre piante</a><a href="#storia" onClick={() => setMenu(false)}>Le nostre radici</a><a href="#approccio" onClick={() => setMenu(false)}>Il nostro modo</a></nav><a className="round-link header-contact" href="#contatti">Coltiviamo un progetto <span>↗</span></a><button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu}>{menu ? "Chiudi" : "Menu"}</button></header>
    <main><section className="new-hero"><div className="hero-heading"><h1>Coltiviamo<br />il tuo verde.</h1><div className="hero-description"><p>Produciamo piante per il tuo vivaio, il tuo garden center e i tuoi progetti di verde.</p></div></div><div className="hero-landscape"><img src={sitePath("/images/optimized/hero-rosa-tempera.webp")} alt="Illustrazione botanica di una mano che pota una rosa" fetchPriority="high" /><div className="landscape-caption"><span>Dal 1920,<br />stagione dopo stagione.</span></div></div></section>
    <Catalog />
    <section className="roots-section" id="storia"><div className="roots-copy"><h2>Non si cresce<br />in un giorno.</h2><p>Dal 1920, a Pescia, la famiglia Papini coltiva una passione che si tramanda da tre generazioni. Un sapere cresciuto sul campo, che oggi mettiamo al servizio di vivai, garden center e professionisti del verde: dalla cura delle piante alla scelta della fornitura giusta per ogni progetto.</p></div><div className="roots-image"><img src={sitePath("/images/optimized/olivi-foto.webp")} alt="Filari di olivi coltivati in vaso nel vivaio" loading="lazy" /><div className="image-note">Il verde è un lavoro.<br />E un modo di vedere le cose.</div></div></section>
    <section className="care-section" id="approccio"><div className="section-heading"><h2>La differenza<br />è nei gesti.</h2></div><div className="care-grid"><article className="care-main"><img src={sitePath("/images/optimized/mimose-foto.webp")} alt="Coltivazioni di mimose sotto la serra del vivaio" loading="lazy" /><div><h3>Consegna in 2/3<br />giorni lavorativi.</h3></div></article><article className="care-small care-roses"><img src={sitePath("/images/optimized/rose-foto.webp")} alt="Rose in fiore coltivate in vaso nel vivaio" loading="lazy" /><div><h3>Il mio controllo,<br />su ogni pianta.</h3><p>Controllo personalmente ogni pianta prima della spedizione.</p></div></article><article className="care-small care-light"><div><h3>Verde, per chi<br />lo fa di mestiere.</h3><p>Agrarie, garden, commercianti, grossisti e aziende agricole.</p></div></article></div></section><Contatti /></main><Footer /></div>;
}
