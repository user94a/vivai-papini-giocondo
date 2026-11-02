import { ArrowOut } from '@/components/ArrowOut';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import { CONTACT_EMAIL } from '@/lib/content';
import './catalogo.css';
export default function CatalogLayout({children}:{children:React.ReactNode}) {
 return <div className="botanical-catalog"><header className="catalog-header"><Link href="/" aria-label="Vivai Papini Giocondo, homepage"><BrandLogo size="sm" /></Link><nav aria-label="Catalogo"><Link href="/catalogo">Catalogo</Link><Link href="/#contatti">Contatti <ArrowOut /></Link></nav></header>{children}<footer className="catalog-footer"><Link href="/">Vivai Papini Giocondo</Link><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></footer></div>;
}
