'use client';
import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import { sitePath } from '@/lib/site-path';
import { FAMILIES, PRODUCTS } from '@/lib/catalog';
import { ProductTable } from './ProductTable';
import { CatalogArtwork } from './CatalogArtwork';

export function CatalogIndex({ initialFamily = '' }: { initialFamily?: string }) {
  const [family, setFamily] = useState(initialFamily);
  const filterId = useId();
  const filterMenu = useRef<HTMLDivElement>(null);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const options = [
    { id: '', name: 'Tutte le piante', image: 'ornamentali-illustrazione.webp' },
    { id: 'rose', name: 'Tutte le rose', image: 'rosa-illustrazione.webp' },
    ...FAMILIES,
  ];
  const selected = options.find(option => option.id === family) ?? options[0];
  function chooseFamily(value: string) {
    setFamily(value);
    filterMenu.current?.hidePopover();
    filterTrigger.current?.focus();
  }
  const shown = PRODUCTS.filter(product => !family || product.family === family || (family === 'rose' && product.family.startsWith('rose-')));

  const categories = FAMILIES.filter(item => !item.id.startsWith('rose-') || item.id === 'rose-grandi-fiori').map(item => ({
    id: item.id.startsWith('rose-') ? 'rose' : item.id,
    name: item.id.startsWith('rose-') ? 'Rose' : item.name,
    products: shown.filter(product => item.id.startsWith('rose-') ? product.family.startsWith('rose-') : product.family === item.id),
  })).filter(category => category.products.length);

  return <>
    <div className="catalog-tools">
      <div className="catalog-filter">
        <span id={`${filterId}-label`}>Famiglia</span>
        <button ref={filterTrigger} type="button" className="catalog-filter-trigger" popoverTarget={filterId} aria-labelledby={`${filterId}-label ${filterId}-value`}>
          <Image src={sitePath(`/images/optimized/${selected.image}`)} alt="" width={48} height={48} />
          <span id={`${filterId}-value`}>{selected.name}</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
        <div ref={filterMenu} id={filterId} popover="auto" className="catalog-filter-menu" aria-labelledby={`${filterId}-label`}>
          {options.map(option => <button key={option.id} type="button" aria-pressed={family === option.id} onClick={() => chooseFamily(option.id)}>
            <Image src={sitePath(`/images/optimized/${option.image}`)} alt="" width={48} height={48} />
            <span>{option.name}</span>
            {family === option.id && <span className="catalog-filter-check" aria-hidden="true">✓</span>}
          </button>)}
        </div>
      </div>
      <p role="status">{shown.length} {shown.length === 1 ? 'pianta' : 'piante'}</p>
    </div>
    <div className="catalog-listino">{categories.map(category => <section className="listino-category" key={category.id} id={category.id}>
      <header className="listino-category-heading">
        <div className="listino-category-art"><CatalogArtwork product={category.products[0]} /></div>
        <h2>{category.name}</h2>
      </header>
      {FAMILIES.filter(item => category.products.some(product => product.family === item.id)).map(item => <div className="listino-family" key={item.id}>
        {category.id === 'rose' && <h3 id={item.id}>{item.name}</h3>}
        {category.products.filter(product => product.family === item.id).map(product => <article className="listino-product" key={product.slug}>
          <div className="listino-identity"><h4>{product.name}</h4></div>
          <ProductTable product={product} />
        </article>)}
      </div>)}
    </section>)}</div>
    {!shown.length && <p className="catalog-empty">Nessuna pianta trovata. <button type="button" onClick={() => setFamily('')}>Mostra tutto il catalogo</button></p>}
  </>;
}
