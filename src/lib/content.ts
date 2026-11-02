import { sitePath } from "@/lib/site-path";
export const PLANTS = [
  {
    id: "olivi",
    detailImage: sitePath("/images/optimized/olivi-foto.webp"),
    detailImageAlt: "Filari di olivi in vaso nel vivaio",
    label: "Olivi",
    title: "Olivi",
    text: "Olivi soprattutto per impianti da olio e da mensa, disponibili in più dimensioni, dalle piante di 2 anni fino agli esemplari di 8/10 anni.",
    ages: "Da 2 a 8/10 anni",
    highlights: ["Da olio e da mensa", "Da 2 a 8/10 anni"],
    image: sitePath("/images/optimized/olivo-illustrazione.webp"),
    imageAlt: "Illustrazione botanica di un ramo di olivo",
  },
  {
    id: "mimose",
    detailImage: sitePath("/images/optimized/mimose-foto.webp"),
    detailImageAlt: "Piante di mimosa coltivate sotto la serra",
    label: "Mimose",
    title: "Mimose",
    text: "Mimose di più dimensioni, per rispondere alle diverse esigenze di fornitura.",
    ages: "Più dimensioni",
    highlights: ["Più dimensioni"],
    image: sitePath("/images/optimized/mimosa-illustrazione.webp"),
    imageAlt: "Illustrazione botanica di mimosa in fiore",
  },
  {
    id: "rose",
    detailImage: sitePath("/images/optimized/rose-foto.webp"),
    detailImageAlt: "Rose in fiore coltivate in vaso nel vivaio",
    label: "Rose",
    title: "Rose",
    text: "Rose a grandi fiori, rampicanti e paesaggistiche. Varietà dei più importanti ibridatori.",
    ages: "Varietà dei principali ibridatori",
    highlights: ["Grandi fiori", "Rampicanti", "Paesaggistiche"],
    image: sitePath("/images/optimized/rosa-illustrazione.webp"),
    imageAlt: "Illustrazione botanica di rose rosa",
  },
] as const;

export type PlantId = (typeof PLANTS)[number]["id"];

export const MOMENTS = [
  {
    caption: "Guardiamo",
    text: "Prima di partire riprendiamo in mano ogni lotto, pianta per pianta.",
    space: 96,
    image: sitePath("/images/optimized/olivo-illustrazione.webp"),
    imageAlt: "Foglie e infiorescenza di olivo",
  },
  {
    caption: "Consigliamo",
    text: "In azienda c'è un agronomo. Lo trovi prima dell'acquisto e anche dopo.",
    space: 48,
    image: sitePath("/images/optimized/olivi-foto.webp"),
    imageAlt: "Filari di olivi in vivaio",
  },
  {
    caption: "Selezioniamo",
    text: "Biologico appena possibile, trattamenti solo dove servono.",
    space: 120,
    image: sitePath("/images/optimized/mimosa-illustrazione.webp"),
    imageAlt: "Disegno botanico di mimosa",
  },
  {
    caption: "Imballiamo",
    text: "La cura non è un reparto: è ogni gesto, fino alla cassa.",
    space: 64,
    image: sitePath("/images/optimized/rosa-illustrazione.webp"),
    imageAlt: "Tavola botanica di rosa",
  },
  {
    caption: "Partiamo",
    text: "Le piante crescono lente. Le consegne, per fortuna, no.",
    space: 88,
    image: sitePath("/images/optimized/mimose-foto.webp"),
    imageAlt: "Piante nel vivaio sotto la serra",
  },
  {
    caption: "Arrivano",
    text: "In Italia in due o tre giorni, pronte per la dimora.",
    space: 40,
    image: sitePath("/images/optimized/rose-foto.webp"),
    imageAlt: "Rose in fiore coltivate in vivaio",
  },
] as const;

export const CONTACT_EMAIL = "vivaipapinigiocondo@gmail.com";
export const CONTACT_PHONE = "333 2842010";
export const CONTACT_ADDRESS = "Via Romana, 7 - 51017 Castellare di Pescia (PT)";

export const CONTACT_PHONES = [CONTACT_PHONE, "349 8437257"] as const;
export const COMPANY_NAME = "S.S. AGRI. PAPINI GIOCONDO";
export const COMPANY_PARTNERS = "di Lucia e Paola Papini e C.";
export const COMPANY_VAT = "01983330471";
