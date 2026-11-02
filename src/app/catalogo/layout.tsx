import { Header } from "@/components/Header";
import "../restyling.css";
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/content';
import './catalogo.css';
export default function CatalogLayout({children}:{children:React.ReactNode}) {
 return <div className="botanical-catalog"><Header />{children}<footer className="catalog-footer"><Link href="/">Vivai Papini Giocondo</Link><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></footer></div>;
}
