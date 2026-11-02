import data from './catalog-data.json';
export type Product = { slug: string; name: string; family: string; variants: { attributes: Record<string, string>; source: string; category: string }[] };
export const PRODUCTS = data as Product[];
export const FAMILIES = [
  {id:'olivi',name:'Olivi',image:'olivo-illustrazione.webp'},
  {id:'mimose',name:'Mimose',image:'mimosa-illustrazione.webp'},
  {id:'rose-grandi-fiori',name:'Rose a grandi fiori',image:'rosa-illustrazione.webp'},
  {id:'rose-rampicanti',name:'Rose rampicanti',image:'rosa-illustrazione.webp'},
  {id:'rose-paesaggistiche',name:'Rose paesaggistiche',image:'rosa-illustrazione.webp'},
  {id:'ornamentali',name:'Ornamentali',image:'ornamentali-illustrazione.webp'},
  {id:'ortensie',name:'Ortensie',image:'ortensie.webp'},
  {id:'glicini',name:'Glicini',image:'glicine.webp'},
];
export function familyFor(product: Product) { return FAMILIES.find(f => f.id === product.family)!; }

export const CATALOG_GROUPS = [
  { id: 'olivi', name: 'Olivi', description: 'La nostra produzione di olivi è dedicata soprattutto agli impianti per la produzione di olio e olive da mensa. Esplora le varietà a catalogo e confronta i formati di coltivazione per il tuo impianto.' },
  { id: 'mimose', name: 'Mimose', description: 'La luce del giallo tra foglie sottili e leggere. Le mimose annunciano il cambio di stagione con fioriture generose e un portamento arioso: una presenza luminosa per dare colore e movimento al giardino. Scopri le varietà e i formati a catalogo.' },
  { id: 'rose', name: 'Rose', description: 'Fiori, portamenti e colori per immaginare il giardino in modi diversi. Dalle rose a grandi fiori alle rampicanti, fino alle paesaggistiche, ogni gruppo offre un modo di disegnare aiuole, bordure e spazi verticali. Scopri gli ibridatori e i formati di coltivazione per ogni gruppo.' },
  { id: 'glicini', name: 'Glicini', description: 'Grappoli pendenti e rami che accompagnano pergole, archi e sostegni. I glicini danno al giardino una dimensione verticale e una fioritura scenografica, creando nel tempo angoli raccolti e ombreggiati. Consulta le selezioni e i formati di coltivazione.' },
  { id: 'ortensie', name: 'Ortensie', description: 'Infiorescenze ampie e fogliame generoso, per dare volume agli angoli più raccolti del giardino. Le ortensie si prestano a composizioni in gruppo, bordure e coltivazione in vaso, scegliendo posizione e terreno in base alla varietà. Esplora le piante a catalogo.' },
  { id: 'ornamentali', name: 'Ornamentali', description: 'Fogliame, fioriture e portamenti che completano il disegno del verde. Le ornamentali riuniscono piante diverse per creare volumi, accompagnare i percorsi e comporre accostamenti nel giardino. Consulta le singole varietà per individuare quelle adatte al tuo progetto.' },
];
export const ROSE_DESCRIPTIONS: Record<string, string> = {
  'rose-grandi-fiori': 'Corolle protagoniste, da osservare da vicino. Le rose a grandi fiori danno risalto alle singole fioriture e trovano spazio in aiuole e punti di interesse del giardino.',
  'rose-rampicanti': 'Rami da guidare su archi, pergole e grigliati. Le rose rampicanti portano le fioriture in altezza e accompagnano la forma dei sostegni con una crescita da curare nel tempo.',
  'rose-paesaggistiche': 'Fioriture che si leggono nell’insieme del giardino. Le rose paesaggistiche si prestano a bordure, gruppi e aiuole, con portamenti da scegliere in funzione dello spazio disponibile.',
};

// Keep the source varieties intact, but present roses by breeder and growing format.
export function roseSummary(products: Product[]): Product[] {
  const groups = new Map<string, Product>();
  for (const product of products) {
    for (const variant of product.variants) {
      const breeder = variant.attributes.Ibridatore;
      const key = `${product.family}:${breeder ?? ''}`;
      if (!groups.has(key)) groups.set(key, {
        slug: key,
        name: breeder ?? 'Formati di coltivazione',
        family: product.family,
        variants: [],
      });
      const attributes = Object.fromEntries(Object.entries(variant.attributes).filter(([name]) => !['Colore', 'Ibridatore', 'Serie'].includes(name)));
      const group = groups.get(key)!;
      if (!group.variants.some(item => JSON.stringify(item.attributes) === JSON.stringify(attributes))) {
        group.variants.push({ ...variant, attributes });
      }
    }
  }
  return [...groups.values()];
}

export function mimosaSummary(products: Product[]): Product {
  const formats = new Map<string, Set<string>>();
  for (const product of products) {
    for (const { attributes } of product.variants) {
      const container = attributes.Contenitore;
      if (!formats.has(container)) formats.set(container, new Set());
      if (attributes.Altezza) formats.get(container)!.add(attributes.Altezza);
    }
  }
  return {
    slug: 'mimose-formati',
    name: 'Mimose',
    family: 'mimose',
    variants: [...formats].sort(([a], [b]) => a.localeCompare(b, 'it', { numeric: true })).map(([container, heights]) => ({
      attributes: {
        Contenitore: container,
        Altezza: [...heights].sort((a, b) => a.localeCompare(b, 'it', { numeric: true })).join(', '),
      },
      source: '',
      category: 'Mimose',
    })),
  };
}
