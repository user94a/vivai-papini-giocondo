import { Fasthand } from "next/font/google";
import { sitePath } from "@/lib/site-path";
import "./about.css";

const signatureFont = Fasthand({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata = {
  title: "About | Vivai Papini Giocondo",
  description: "Dagli ortaggi e dagli olivi del bisnonno alle scelte di oggi: la storia del vivaio di famiglia, raccontata da chi lo ha ripreso in mano.",
};

export default function AboutPage() {
  return (
    <main className="about-editorial">
      <header className="hero-heading about-editorial-title">
        <h1>About.</h1>
      </header>


      <div className="about-editorial-content">
      <article className="about-editorial-body" aria-label="La storia del vivaio">
        <p>La storia del nostro vivaio comincia con il mio bisnonno, che coltivava ortaggi e olivi. Mio nonno, insieme ai suoi fratelli, ha dato al lavoro di famiglia una direzione nuova: agli olivi ha affiancato i fiori recisi, le piante fiorite in vaso e quelle da interno. Il vivaio è cambiato con loro, nelle coltivazioni e nel modo di intendere questo mestiere.</p>
        <p>Da mio nonno la storia è arrivata a me, saltando una generazione. Riprendere il vivaio di famiglia è stata una scelta personale, nata da una grande passione e accompagnata dalla mia formazione di agronomo. Ho ritrovato un’attività con una storia già lunga e ho cominciato a darle una direzione mia.</p>
        <p>Ho scelto di lasciare le produzioni di gerani, stelle di Natale e ciclamini, introducendo rose, piante ornamentali, glicini e altre varietà. Gli olivi sono rimasti, a legare le prime coltivazioni a quelle di oggi. È il mio modo di portare avanti il vivaio: conoscere quello che c’era prima, scegliere cosa tenere e avere la libertà di cambiare. Un lavoro che sento mio, dentro una storia cominciata molto prima di me.</p>
        <p className={`about-signature ${signatureFont.className}`}>Luca Becucci</p>
      </article>

      <div className="about-photo-single">
        <img src={sitePath("/images/about-vivaio-consegne-finale.png")} alt="Preparazione di un carico di rose in vaso sul furgone" width={1760} height={2374} loading="lazy" />
      </div>
      </div>
    </main>
  );
}
