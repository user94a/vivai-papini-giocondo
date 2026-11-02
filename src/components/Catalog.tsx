'use client';

import { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '@/lib/catalog';
import { CatalogArtwork } from './CatalogArtwork';
import { CatalogIndex } from './CatalogIndex';
import '@/app/catalogo/catalogo.css';
import './catalog.css';

const CATEGORIES = [
  { id: 'olivi', name: 'Olivi' },
  { id: 'mimose', name: 'Mimose' },
  { id: 'rose', name: 'Rose' },
  { id: 'glicini', name: 'Glicini' },
  { id: 'ortensie', name: 'Ortensie' },
  { id: 'ornamentali', name: 'Ornamentali' },
];

export function Catalog() {
  const [active, setActive] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active === null) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; opener.current?.focus(); };
  }, [active]);

  function open(family: string, trigger: HTMLButtonElement) {
    opener.current = trigger;
    setActive(family);
  }

  return <section className="plants-section catalog" id="produzioni">
    <div className="section-heading"><h2>Le nostre<br />produzioni.</h2></div>
    <div className="production-grid">{CATEGORIES.map(category => {
      const products = PRODUCTS.filter(product => category.id === 'rose' ? product.family.startsWith('rose-') : product.family === category.id);
      return <button type="button" key={category.id} className={`production-card production-${category.id}`} onClick={event => open(category.id, event.currentTarget)} aria-haspopup="dialog">
        <span className="production-art"><CatalogArtwork product={products[0]} /></span>
        <span className="production-name">{category.name}</span>
        <span className="production-foot"><span>{products.length} varietà</span><span aria-hidden="true">↗</span></span>
      </button>;
    })}</div>
    <button type="button" className="catalog-home-link" onClick={event => open('', event.currentTarget)} aria-haspopup="dialog">Tutto il catalogo <span aria-hidden="true">↗</span></button>
    <dialog ref={dialog} className="catalog-modal" aria-labelledby="catalog-modal-title" onClose={() => setActive(null)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current?.close();
    }}>
      {active !== null && <><header className="catalog-modal-header"><h2 id="catalog-modal-title">Il catalogo.</h2><button type="button" className="catalog-modal-close" onClick={() => dialog.current?.close()} autoFocus aria-label="Chiudi catalogo">Chiudi <span aria-hidden="true">×</span></button></header><div className="catalog-modal-content"><CatalogIndex key={active} initialFamily={active} /></div></>}
    </dialog>
  </section>;
}
