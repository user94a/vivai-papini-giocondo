"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PLANTS } from "@/lib/content";
import { usePlant } from "@/components/PlantContext";
import "./catalog.css";

type Plant = (typeof PLANTS)[number];
const DETAILS = {
  olivi: {
    intro: "Il tempo, nella sua forma più concreta.",
    description: "Dalle piante giovani agli esemplari più maturi, l’olivo è una delle produzioni centrali del vivaio. Partiamo dalle esigenze della tua fornitura per individuare la selezione adatta.",
    specs: [["Produzione", "Olivi"], ["Età", "Da 2 a 10 anni"], ["Selezione", "Piante giovani ed esemplari"], ["Fornitura", "Per professionisti del verde"]],
    imageNote: "Olea europaea. Fotografia botanica di Didier Descouens, CC BY-SA 4.0.",
  },
  mimose: {
    intro: "La primavera ha un carattere preciso.",
    description: "Più misure e lotti omogenei, per chi pianifica il verde con attenzione. Confrontiamoci sulle caratteristiche della fornitura e sulle disponibilità del momento.",
    specs: [["Produzione", "Mimose"], ["Selezione", "Lotti omogenei"], ["Misure", "Più misure, da concordare"], ["Fornitura", "Per professionisti del verde"]],
    imageNote: "Acacia mimosa. Tavola botanica di Lydia Byam, 1797, da Wikimedia Commons.",
  },
  rose: {
    intro: "La bellezza, in tutte le sue forme.",
    description: "Rose a grandi fiori, rampicanti e paesaggistiche, da selezioni di ibridatori. Una produzione da esplorare insieme, a partire dal carattere del tuo progetto.",
    specs: [["Produzione", "Rose"], ["Tipologie", "Grandi fiori, rampicanti, paesaggistiche"], ["Selezione", "Da ibridatori"], ["Fornitura", "Per professionisti del verde"]],
    imageNote: "Rosa Clare. Tavola da Edwards’s Botanical Register, pubblico dominio.",
  },
} as const;

export function Catalog() {
  const [filter, setFilter] = useState("Tutte");
  const [active, setActive] = useState<Plant | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const { setPlantId } = usePlant();

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
    setPlantId(active.id);
    close();
    requestAnimationFrame(() => {
      document.querySelector("#contatti")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      document.querySelector<HTMLInputElement>("#contact-name")?.focus({ preventScroll: true });
    });
  }

  return <section className="plants-section catalog" id="produzioni">
    <div className="section-heading"><h2>Caratteri diversi.<br />La stessa cura.</h2><p>Tre protagoniste del nostro vivaio.<br />Ogni pianta, una storia da scoprire.</p></div>
    <div className="plant-filters" aria-label="Filtra le produzioni">{["Tutte", ...PLANTS.map(p => p.title)].map(label => <button type="button" key={label} onClick={() => setFilter(label)} aria-pressed={filter === label} className={filter === label ? "active" : ""}>{label}<span aria-hidden="true">{filter === label ? "↗" : "+"}</span></button>)}</div>
    <div className="plant-cards">{PLANTS.filter(p => filter === "Tutte" || filter === p.title).map(p => <button type="button" key={p.id} className={`plant-card catalog-card plant-${p.id}`} onClick={() => setActive(p)} aria-haspopup="dialog" aria-label={`Scopri ${p.title}`}>
      <span className="plant-card-top"><span>{p.ages}</span><span className="catalog-discover">Esplora la selezione <span aria-hidden="true">↗</span></span></span>
      <span className="plant-picture"><Image src={p.image} alt={p.imageAlt} width={600} height={600} sizes="(max-width: 600px) 90vw, 30vw" /></span>
      <span className="plant-title"><span className="catalog-card-title">{p.title}</span><span className="catalog-plus" aria-hidden="true"><span /></span></span>
      <span className="catalog-description">{p.text}</span>
      <span className="catalog-card-foot">Scopri tutti i dettagli <span aria-hidden="true">↗</span></span>
    </button>)}</div>
    <div className="other-plants"><p>E intorno, molto altro.</p><div><span>Glicine</span><span>Ortensie</span><span>Piante da siepe</span><a href="#contatti">Cerchi altro? Parliamone ↗</a></div></div>
    <dialog ref={dialog} className={`plant-dialog plant-${active?.id ?? "olivi"}`} aria-labelledby="plant-dialog-title" onClose={() => setActive(null)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }}>
      {active && <div className="plant-dialog-panel">
        <button type="button" className="dialog-close" onClick={close} aria-label="Chiudi dettagli"><span aria-hidden="true">×</span></button>
        <div className="dialog-art"><Image src={active.image} alt={active.imageAlt} width={800} height={1000} sizes="(max-width: 700px) 90vw, 40vw" /><p>{DETAILS[active.id].imageNote}</p></div>
        <div className="dialog-content"><div className="dialog-brand">Vivai Papini Giocondo <span aria-hidden="true">↗</span></div><h2 id="plant-dialog-title">{active.title}</h2><p className="dialog-intro">{DETAILS[active.id].intro}</p><p className="dialog-description">{DETAILS[active.id].description}</p><dl className="dialog-specs">{DETAILS[active.id].specs.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="dialog-request"><p>Varietà, formati, quantità e disponibilità da concordare con il vivaio.</p><button type="button" onClick={request}>Parliamo di {active.title.toLowerCase()} <span aria-hidden="true">↗</span></button></div></div>
      </div>}
    </dialog>
  </section>;
}
