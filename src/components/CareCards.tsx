"use client";

import { useState } from "react";
import { Handshake, MagnifyingGlass, Plus, Truck } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { sitePath } from "@/lib/site-path";

const cards = [
  { title: "Consegna in 2/3 giorni lavorativi.", lines: <>Consegna in 2/3<br />giorni lavorativi.</>, image: "mimose-foto.webp", alt: "Coltivazioni di mimose sotto la serra del vivaio", theme: "delivery", icon: Truck, detail: "Coltivare richiede pazienza. Consegnare richiede rispetto per i tuoi tempi. Le piante arrivano in 2/3 giorni lavorativi: concordiamo insieme la fornitura e la destinazione, perché la nostra cura accompagni il tuo lavoro." },
  { title: "Il nostro controllo, su ogni pianta.", lines: <>Il nostro controllo,<br />su ogni pianta.</>, image: "rose-foto.webp", alt: "Rose in fiore coltivate in vaso nel vivaio", theme: "roses", icon: MagnifyingGlass, detail: "Ogni pianta porta con sé il tempo che le abbiamo dedicato. Prima della spedizione la controlliamo una per una: prendercene cura significa seguirla fino all’ultimo gesto, prima che lasci il vivaio." },
  { title: "Verde, per chi lo fa di mestiere.", lines: <>Verde, per chi<br />lo fa di mestiere.</>, theme: "trade", icon: Handshake, detail: "Dietro ogni fornitura c’è il lavoro di qualcuno. Per questo ascoltiamo le esigenze di agrarie, garden center, commercianti, grossisti e aziende agricole. Scegliamo insieme le piante, pensando al percorso che faranno con te." },
];

export function CareCards() {
  const [open, setOpen] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  function reveal(index: number | null) {
    setOpen(index);
  }

  return <section className="care-section" id="approccio">
    <div className="section-heading"><h2>La differenza<br />è nei gesti.</h2></div>
    <div className="care-grid gesture-grid">
      {cards.map((card, index) => {
        const expanded = open === index;
        const Icon = card.icon;
        return <motion.article key={card.theme}
          className={`gesture-card gesture-${card.theme}${expanded ? " is-open" : ""}`}
          initial={false}
          animate={{ flexGrow: open === null ? (index === 0 ? 2 : 1) : open === index ? 3.2 : 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onKeyDown={event => { if (event.key === "Escape") reveal(null); }}>
          <div className="gesture-turn">
            <motion.div className="gesture-front" inert={expanded} aria-hidden={expanded}
              initial={false} animate={{ opacity: expanded ? 0 : 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}>
              {card.image && <img src={sitePath(`/images/optimized/${card.image}`)} alt={card.alt} loading="lazy" />}
              <h3>{card.lines}</h3>
            </motion.div>
            <motion.div className="gesture-back" id={`gesture-detail-${index}`} inert={!expanded} aria-hidden={!expanded}
              initial={false} animate={{ opacity: expanded ? 1 : 0, y: expanded || reducedMotion ? 0 : 10 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}>
              <Icon className="gesture-detail-icon" size={88} weight="duotone" aria-hidden="true" />
              <div className="gesture-detail-copy"><h3>{card.title}</h3><p>{card.detail}</p></div>
            </motion.div>
          </div>
          <button className="gesture-toggle" aria-expanded={open === index} aria-controls={`gesture-detail-${index}`} aria-label={`${open === index ? "Chiudi" : "Scopri"}: ${card.title}`} onClick={() => reveal(open === index ? null : index)}>
            <span className="gesture-toggle-icon" aria-hidden="true"><Plus size={24} /></span>
          </button>
        </motion.article>;
      })}
    </div>
  </section>;
}
