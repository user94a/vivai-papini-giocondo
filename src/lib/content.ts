import { sitePath } from "@/lib/site-path";
export const PLANTS = [
  {
    id: "olivi",
    label: "Olivi",
    title: "Olivi",
    text: "Olivi di più dimensioni, dalle piante di 2 anni fino agli esemplari di 8/10 anni.",
    ages: "Da 2 a 8/10 anni",
    highlights: ["Più dimensioni", "Da 2 a 8/10 anni"],
    image: sitePath("/assets/mhnt-olea-europaea-inflorescence-and-leaves.jpg"),
    imageAlt: "Infiorescenza e foglie di Olea europaea, fotografia da museo",
  },
  {
    id: "mimose",
    label: "Mimose",
    title: "Mimose",
    text: "Mimose di più dimensioni, per rispondere alle diverse esigenze di fornitura.",
    ages: "Più dimensioni",
    highlights: ["Più dimensioni"],
    image: sitePath("/assets/byam-acacia-mimosa.jpg"),
    imageAlt: "Tavola botanica storica di Acacia mimosa (Lydia Byam, 1797)",
  },
  {
    id: "rose",
    label: "Rose",
    title: "Rose",
    text: "Rose a grandi fiori, rampicanti e paesaggistiche. Varietà dei più importanti ibridatori.",
    ages: "Varietà dei principali ibridatori",
    highlights: ["Grandi fiori", "Rampicanti", "Paesaggistiche"],
    image: sitePath("/assets/edwards-s-botanical-register-plate-1438-7794919072.jpg"),
    imageAlt: "Tavola botanica Rosa Clare, Edwards's Botanical Register",
  },
] as const;

export type PlantId = (typeof PLANTS)[number]["id"];

export const MOMENTS = [
  {
    caption: "Guardiamo",
    text: "Prima di partire riprendiamo in mano ogni lotto, pianta per pianta.",
    space: 96,
    image: sitePath("/assets/mhnt-olea-europaea-inflorescence-and-leaves.jpg"),
    imageAlt: "Foglie e infiorescenza di olivo",
  },
  {
    caption: "Consigliamo",
    text: "In azienda c'è un agronomo. Lo trovi prima dell'acquisto e anche dopo.",
    space: 48,
    image: sitePath("/assets/lun-olive-gardens-2.jpg"),
    imageAlt: "Oliveto mediterraneo",
  },
  {
    caption: "Selezioniamo",
    text: "Biologico appena possibile, trattamenti solo dove servono.",
    space: 120,
    image: sitePath("/assets/byam-acacia-mimosa.jpg"),
    imageAlt: "Disegno botanico di mimosa",
  },
  {
    caption: "Imballiamo",
    text: "La cura non è un reparto: è ogni gesto, fino alla cassa.",
    space: 64,
    image: sitePath("/assets/edwards-s-botanical-register-plate-1438-7794919072.jpg"),
    imageAlt: "Tavola botanica di rosa",
  },
  {
    caption: "Partiamo",
    text: "Le piante crescono lente. Le consegne, per fortuna, no.",
    space: 88,
    image: sitePath("/assets/parc-gonzalez-acacia-verticillata.jpg"),
    imageAlt: "Fronde di acacia al sole",
  },
  {
    caption: "Arrivano",
    text: "In Italia in due o tre giorni, pronte per la dimora.",
    space: 40,
    image: sitePath("/assets/annual-illustrated-descriptive-catalogue-of-seeds-plants.jpg"),
    imageAlt: "Illustrazione da catalogo sementi e piante",
  },
] as const;

export const CONTACT_EMAIL = "vivaipapinigiocondo@gmail.com";
export const CONTACT_PHONE = "333 2842010";
export const CONTACT_ADDRESS = "Via Romana, 7 - 51017 Castellare di Pescia (PT)";

export const CONTACT_PHONES = [CONTACT_PHONE, "349 8437257"] as const;
export const COMPANY_NAME = "S.S. AGRI. PAPINI GIOCONDO";
export const COMPANY_PARTNERS = "di Lucia e Paola Papini e C.";
export const COMPANY_VAT = "01983330471";
