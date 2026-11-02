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
