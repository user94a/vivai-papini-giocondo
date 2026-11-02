"use client";
import Link from "next/link";
import { sitePath } from "@/lib/site-path";
import { Contatti } from "@/components/sections/Contatti";
import { CareCards } from "@/components/CareCards";
import { Catalog } from "@/components/Catalog";

export default function Home() {
  return <div>
    
    <main><section className="new-hero"><div className="hero-heading"><h1>Coltiviamo<br />il tuo verde.</h1><div className="hero-description"><p>Produciamo piante per il tuo vivaio, il tuo garden center e i tuoi progetti di verde.</p></div></div><div className="hero-landscape"><img src={sitePath("/images/optimized/hero-rosa-tempera.webp")} alt="Illustrazione botanica di una mano che pota una rosa" fetchPriority="high" /><div className="landscape-caption"><span>Dal 1920,<br />stagione dopo stagione.</span></div></div></section>
    <Catalog />
    <section className="roots-section" id="storia"><div className="roots-copy"><h2>Non si cresce<br />in un giorno.</h2><p>Dal 1920, a Pescia, coltiviamo piante e un sapere che si tramanda da tre generazioni.</p><Link href="/about" className="round-link roots-cta">Scopri la nostra storia </Link></div><div className="roots-image"><img src={sitePath("/images/optimized/olivi-foto.webp")} alt="Filari di olivi coltivati in vaso nel vivaio" loading="lazy" /></div></section>
    <CareCards /><Contatti /></main></div>;
}
