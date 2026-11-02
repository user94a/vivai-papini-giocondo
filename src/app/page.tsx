"use client";
import { sitePath } from "@/lib/site-path";
import { Contatti } from "@/components/sections/Contatti";
import { CareCards } from "@/components/CareCards";
import { Catalog } from "@/components/Catalog";

export default function Home() {
  return <div>
    
    <main><section className="new-hero"><div className="hero-heading"><h1>Coltiviamo<br />il tuo verde.</h1><div className="hero-description"><p>Produciamo piante per il tuo vivaio, il tuo garden center e i tuoi progetti di verde.</p></div></div><div className="hero-landscape"><img src={sitePath("/images/hero-unsplash.jpg")} alt="Ramo di olivo con olive illuminato dalla luce del sole" fetchPriority="high" /><div className="landscape-caption"><span>Dal 1920,<br />stagione dopo stagione.</span></div></div></section>
    <Catalog />
    <section className="roots-section" id="storia"><div className="roots-copy"><h2>Non si cresce<br />in un giorno.</h2><p>Dal 1920, a Pescia, la nostra famiglia coltiva piante e tramanda il proprio sapere. Dagli ortaggi e dagli olivi delle origini, il vivaio è cresciuto fino alle rose, ai glicini e alle piante ornamentali di oggi.</p><p>Oggi Luca Becucci, agronomo, porta avanti questa storia insieme a Lucia e Paola Papini. Cambiano le coltivazioni, resta la cura di famiglia. E gli olivi, da cui tutto è cominciato.</p></div><div className="roots-image"><img src={sitePath("/images/optimized/olivi-foto.webp")} alt="Filari di olivi coltivati in vaso nel vivaio" loading="lazy" /></div></section>
    <CareCards /><Contatti /></main></div>;
}
