"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { ArrowOut } from "@/components/ArrowOut";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="new-header">
      <Link href="/" className="new-brand" aria-label="Vivai Papini Giocondo, homepage" onClick={() => setOpen(false)}>
        <BrandLogo size="sm" priority />
      </Link>
      <nav id="main-navigation" aria-label="Principale" className={open ? "new-nav open" : "new-nav"}>
        {LINKS.map(({ href, label }) => (
          <Link key={href} href={href} aria-current={(href === "/" ? pathname === href : pathname.startsWith(href)) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link className="mobile-contact" href="/contatti" onClick={() => setOpen(false)}>Contatti <ArrowOut /></Link>
      </nav>
      <Link className="round-link header-contact" href="/contatti">Contatti <span aria-hidden="true"><ArrowOut /></span></Link>
      <button type="button" className="menu-button" onClick={() => setOpen(!open)} aria-controls="main-navigation" aria-expanded={open} aria-label={open ? "Chiudi menu" : "Apri menu"}>{open ? "Chiudi" : "Menu"}</button>
    </header>
  );
}
