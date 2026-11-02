import { Fasthand } from "next/font/google";
import { sitePath } from "@/lib/site-path";
import "./about.css";

const signatureFont = Fasthand({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata = {
  title: "About | Vivai Papini Giocondo",
  description: "Dagli ortaggi e dagli olivi del bisnonno alle scelte di oggi: una storia di continuità familiare, portata avanti da Luca Becucci insieme a Lucia e Paola Papini.",
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
        <p>Oggi portiamo avanti questa storia in tre: io, mia mamma e mia zia, Lucia e Paola Papini. Il vivaio è di tutti e tre, nel segno di una continuità familiare che unisce il lavoro delle generazioni prima di noi alle scelte di oggi. La mia passione e la mia formazione di agronomo mi hanno portato ad assumere un ruolo di guida nello sviluppo dell’attività, con il loro sostegno.</p>
        <p>In questo percorso ho scelto di lasciare le produzioni di gerani, stelle di Natale e ciclamini, introducendo rose, piante ornamentali, glicini e altre varietà. Gli olivi sono rimasti, a legare le prime coltivazioni a quelle di oggi. È così che portiamo avanti il nostro vivaio: conoscere quello che c’era prima, scegliere cosa tenere e avere la libertà di cambiare. Un lavoro che condividiamo, dentro una storia di famiglia che continua.</p>
        <p className={`about-signature ${signatureFont.className}`}>Luca Becucci</p>
      </article>

      <div className="about-photo-single">
        <img src={sitePath("/images/about-vivaio-consegne-finale.png")} alt="Preparazione di un carico di rose in vaso sul furgone" width={1760} height={2374} loading="lazy" />
      </div>
      </div>
    </main>
  );
}
