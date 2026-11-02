import { CatalogIndex } from '@/components/CatalogIndex';
import { PRODUCTS } from '@/lib/catalog';
export const metadata={title:'Catalogo piante | Vivai Papini Giocondo',description:'Tutte le varietà di olivi, mimose, rose, ornamentali, ortensie e glicini. Dimensioni e formati di coltivazione.'};
export default function CatalogPage(){return <main><div className="catalog-intro"><h1>Catalogo.</h1><p>{PRODUCTS.length} varietà. Olivi, mimose, rose e il verde che le accompagna. Esplora le famiglie e scegli le piante per scoprirne varietà e formati.</p></div><CatalogIndex familyOverview /></main>}
