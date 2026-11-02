"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { sitePath } from "@/lib/site-path";

const cards = [
  { title: "Consegna in 2/3 giorni lavorativi.", lines: <>Consegna in 2/3<br />giorni lavorativi.</>, image: "mimose-foto.webp", alt: "Coltivazioni di mimose sotto la serra del vivaio", theme: "delivery", detail: "Le tue piante, dal vivaio alla destinazione in 2/3 giorni lavorativi. Per organizzare la tua fornitura, contattaci e raccontaci quali piante cerchi e dove devono arrivare." },
  { title: "Il mio controllo, su ogni pianta.", lines: <>Il mio controllo,<br />su ogni pianta.</>, image: "rose-foto.webp", alt: "Rose in fiore coltivate in vaso nel vivaio", theme: "roses", detail: "Controllo personalmente ogni pianta prima della spedizione. Un gesto che fa parte del mio lavoro quotidiano: seguire quello che coltiviamo, fino al momento in cui lascia il vivaio." },
  { title: "Verde, per chi lo fa di mestiere.", lines: <>Verde, per chi<br />lo fa di mestiere.</>, theme: "trade", detail: "Ci rivolgiamo ad agrarie, garden center, commercianti, grossisti e aziende agricole. Raccontaci che cosa ti serve: partiamo dalle tue esigenze per scegliere insieme la fornitura per il tuo lavoro." },
];

export function CareCards() {
  const [open, setOpen] = useState<number | null>(null);
  const [roomy, setRoomy] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function reveal(next: number | null) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setOpen(next);
    setFlipped(null);

    // Return the visible face before changing the space between cards.
    const returnTime = flipped !== null && !reducedMotion ? 440 : 0;
    const expand = () => {
      setRoomy(next);
      if (next !== null) {
        timers.current.push(setTimeout(() => setFlipped(next), reducedMotion ? 0 : 320));
      }
    };
    if (returnTime) timers.current.push(setTimeout(expand, returnTime));
    else expand();
  }

  return <section className="care-section" id="approccio">
    <div className="section-heading"><h2>La differenza<br />è nei gesti.</h2></div>
    <div className="care-grid gesture-grid">
      {cards.map((card, index) => {
        const expanded = flipped === index;
        const growing = roomy === index;
        return <motion.article key={card.theme}
          className={`gesture-card gesture-${card.theme}${expanded ? " is-open" : ""}${growing ? " is-roomy" : ""}`}
          initial={false}
          animate={{ flexGrow: roomy === null ? (index === 0 ? 2 : 1) : growing ? (index === 0 ? 3.2 : 2.5) : 1 }}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 23, mass: 0.85 }}
          onKeyDown={event => { if (event.key === "Escape") reveal(null); }}>

          <div className="gesture-turn">
            <div className="gesture-front" inert={expanded} aria-hidden={expanded}>
              {card.image && <img src={sitePath(`/images/optimized/${card.image}`)} alt={card.alt} loading="lazy" />}
              <h3>{card.lines}</h3>
            </div>
            <div className="gesture-back" id={`gesture-detail-${index}`} inert={!expanded} aria-hidden={!expanded}>
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </div>
          </div>
          <button className="gesture-toggle" aria-expanded={open === index} aria-controls={`gesture-detail-${index}`} aria-label={`${expanded ? "Chiudi" : "Scopri"}: ${card.title}`} onClick={() => reveal(open === index ? null : index)}>
            <span className="gesture-toggle-icon" aria-hidden="true"><Plus size={24} weight="regular" /></span>
          </button>
        </motion.article>;
      })}
    </div>
  </section>;
}
