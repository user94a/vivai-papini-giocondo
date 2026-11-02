"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PLANTS } from "@/lib/content";
import "./catalog.css";

type Plant = (typeof PLANTS)[number];
const DETAILS = {
  olivi: {
    intro: "Più dimensioni, da 2 a 8/10 anni.",
    description: "Produciamo olivi di più dimensioni: dalle piante di 2 anni fino agli esemplari di 8/10 anni. Confrontiamoci sulle esigenze del tuo progetto per individuare le dimensioni e le quantità adatte.",
    specs: [["Produzione", "Olivi"], ["Età", "Da 2 a 8/10 anni"], ["Selezione", "Più dimensioni"], ["Fornitura", "Per professionisti del verde"]],
  },
  mimose: {
    intro: "Mimose di più dimensioni.",
    description: "Le mimose sono una delle nostre produzioni principali. Le coltiviamo in più dimensioni, per rispondere alle diverse esigenze di fornitura. Chiedici le misure e le disponibilità del momento.",
    specs: [["Produzione", "Mimose"], ["Dimensioni", "Più dimensioni"], ["Misure disponibili", "Da concordare con il vivaio"], ["Fornitura", "Per professionisti del verde"]],
  },
  rose: {
    intro: "Grandi fiori, rampicanti e paesaggistiche.",
    description: "Coltiviamo rose a grandi fiori, rampicanti e paesaggistiche. Abbiamo le varietà dei più importanti ibridatori: chiedici quali sono disponibili per la tua fornitura.",
    specs: [["Produzione", "Rose"], ["Tipologie", "Grandi fiori, rampicanti, paesaggistiche"], ["Varietà", "Dei più importanti ibridatori"], ["Fornitura", "Per professionisti del verde"]],
  },
} as const;

export function Catalog() {
  const [filter, setFilter] = useState("Tutte");
  const [active, setActive] = useState<Plant | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!active) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  function close() { dialog.current?.close(); }
  function request() {
    if (!active) return;
    close();
    requestAnimationFrame(() => {
      document.querySelector("#contatti")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      document.querySelector<HTMLInputElement>("#contact-name")?.focus({ preventScroll: true });
    });
  }

  return <section className="plants-section catalog" id="produzioni">
    <div className="section-heading"><h2>Le nostre<br />produzioni.</h2><p>Le produzioni principali sono olivi, mimose e rose. Più dimensioni e varietà per i tuoi progetti di verde.</p></div>
    <div className="plant-filters" aria-label="Filtra le produzioni">{["Tutte", ...PLANTS.map(p => p.title)].map(label => <button type="button" key={label} onClick={() => setFilter(label)} aria-pressed={filter === label} className={filter === label ? "active" : ""}>{label}<span aria-hidden="true">{filter === label ? "↗" : "+"}</span></button>)}</div>
    <div className="plant-cards">{PLANTS.filter(p => filter === "Tutte" || filter === p.title).map(p => <button type="button" key={p.id} className={`plant-card catalog-card plant-${p.id}`} onClick={() => setActive(p)} aria-haspopup="dialog" aria-label={`Scopri ${p.title}`}>
      <span className="plant-card-top"><span>{p.ages}</span><span className="catalog-discover">Esplora la selezione <span aria-hidden="true">↗</span></span></span>
      <span className="plant-picture"><Image src={p.image} alt={p.imageAlt} width={600} height={600} sizes="(max-width: 600px) 90vw, 30vw" /></span>
      <span className="plant-title"><span className="catalog-card-title">{p.title}</span><span className="catalog-plus" aria-hidden="true"><span /></span></span>
      <span className="catalog-highlights">{p.highlights.map(item => <span key={item}>{item}</span>)}</span>
      <span className="catalog-description">{p.text}</span>
      <span className="catalog-card-foot">Scopri tutti i dettagli <span aria-hidden="true">↗</span></span>
    </button>)}</div>
    <div className="catalog-other"><div><h3>Non solo olivi,<br />mimose e rose.</h3><p>Alle produzioni principali affianchiamo altre coltivazioni. Il nostro vivaio cresce anche con le esigenze dei tuoi progetti.</p></div><div className="catalog-other-list"><ul><li>Glicine</li><li>Ortensie</li><li>Piante da siepe</li><li>E altre coltivazioni</li></ul><a href="#contatti">Cerchi una pianta in particolare? Parliamone <span aria-hidden="true">↗</span></a></div></div>
    <dialog ref={dialog} className={`plant-dialog plant-${active?.id ?? "olivi"}`} aria-labelledby="plant-dialog-title" onClose={() => setActive(null)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }}>
      {active && <div className="plant-dialog-panel"><span className="sheet-handle" aria-hidden="true" />
        <button type="button" className="dialog-close" onClick={close} aria-label="Chiudi dettagli"><span aria-hidden="true">×</span></button>
        <div className="dialog-art"><Image src={active.image} alt={active.imageAlt} width={800} height={1000} sizes="(max-width: 700px) 90vw, 40vw" /></div>
        <div className="dialog-content"><div className="dialog-brand">Vivai Papini Giocondo <span aria-hidden="true">↗</span></div><h2 id="plant-dialog-title">{active.title}</h2><p className="dialog-intro">{DETAILS[active.id].intro}</p><p className="dialog-description">{DETAILS[active.id].description}</p><dl className="dialog-specs">{DETAILS[active.id].specs.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="dialog-request"><p>Varietà, formati, quantità e disponibilità da concordare con il vivaio.</p><button type="button" onClick={request}>Parliamone <span aria-hidden="true">↗</span></button></div></div>
      </div>}
    </dialog>
  </section>;
}
