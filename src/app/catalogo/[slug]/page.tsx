import { ArrowOut } from '@/components/ArrowOut';
import { ProductTable } from "@/components/ProductTable";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, familyFor } from '@/lib/catalog';
import { CONTACT_EMAIL } from '@/lib/content';
export function generateStaticParams(){return PRODUCTS.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=PRODUCTS.find(p=>p.slug===slug);return {title:p?`${p.name} | Vivai Papini Giocondo`:'Pianta non trovata'}}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const product=PRODUCTS.find(p=>p.slug===slug);if(!product)notFound();const family=familyFor(product);const index=PRODUCTS.indexOf(product);const prev=PRODUCTS[index-1];const next=PRODUCTS[index+1];
 return <main><div className="product-main"><div className="product-identity"><Link className="product-family" href="/catalogo">← {family.name}</Link><h1>{product.name}</h1></div><section className="product-formats"><h2>Dimensioni e varianti</h2><ProductTable product={product} /><a className="product-contact" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Richiesta disponibilità: '+product.name)}&body=${encodeURIComponent('Buongiorno,\nvorrei informazioni su '+product.name+'.\nFormato: \nQuantità: \n\nGrazie.')}`}>Richiedi disponibilità <span aria-hidden="true"><ArrowOut /></span></a></section></div><nav className="product-pagination" aria-label="Altre piante">{prev?<Link href={`/catalogo/${prev.slug}`}>← {prev.name}</Link>:<span/>}{next&&<Link href={`/catalogo/${next.slug}`}>{next.name} →</Link>}</nav></main>;
}
