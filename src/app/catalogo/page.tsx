import { CatalogIndex } from '@/components/CatalogIndex';

export const metadata={title:'Catalogo piante | Vivai Papini Giocondo',description:'Olivi, mimose, rose, ornamentali, ortensie e glicini. Dimensioni e formati di coltivazione.'};
export default function CatalogPage(){return <main><div className="catalog-intro"><h1>Catalogo.</h1><p>Olivi, mimose, rose e il verde che le accompagna. Esplora le famiglie e scopri varietà e formati. Per le rose, consulta gli ibridatori e i formati di coltivazione.</p></div><CatalogIndex familyOverview /></main>}
