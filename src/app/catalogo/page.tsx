import { CatalogIndex } from '@/components/CatalogIndex';
import { PRODUCTS } from '@/lib/catalog';
export const metadata={title:'Catalogo piante | Vivai Papini Giocondo',description:'Tutte le varietà di olivi, mimose, rose, ornamentali, ortensie e glicini. Dimensioni e formati di coltivazione.'};
export default function CatalogPage(){return <main><div className="catalog-intro"><h1>Le piante.</h1><p>{PRODUCTS.length} varietà. Olivi, mimose, rose e il verde che le accompagna. Scegli una pianta per scoprirne i formati.</p></div><CatalogIndex /></main>}
