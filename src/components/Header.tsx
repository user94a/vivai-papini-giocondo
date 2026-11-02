"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const LINKS = [
  { href: "#produzioni", label: "Produzioni" },
  { href: "#storia", label: "Storia" },
  { href: "#approccio", label: "Approccio" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#top" className="brand-mark" aria-label="Vivai Papini Giocondo">
          <BrandLogo size="sm" priority />
        </a>

        <nav className="site-nav desktop-nav" aria-label="Principale">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contatti" className="btn-primary header-cta">
          Scrivici
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Chiudi" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contatti" onClick={() => setOpen(false)}>
            Scrivici
          </a>
        </nav>
      )}
    </header>
  );
}
