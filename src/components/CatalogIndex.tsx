'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Image from 'next/image';
import { sitePath } from '@/lib/site-path';
import { CATALOG_GROUPS, FAMILIES, PRODUCTS, ROSE_DESCRIPTIONS, ROSE_BREEDERS, roseSummary, mimosaSummary } from '@/lib/catalog';
import { ProductTable } from './ProductTable';
import { CatalogArtwork } from './CatalogArtwork';

const FAMILY_PREVIEWS: Record<string, string> = {
  olivi: 'olivi-foto.webp',
  mimose: 'mimose-foto.webp',
  rose: 'rose-foto.webp',
  glicini: 'glicine.webp',
  ortensie: 'ortensie.webp',
  ornamentali: 'ornamentali-illustrazione.webp',
};

export function CatalogIndex({ initialFamily = '', familyOverview = false }: { initialFamily?: string; familyOverview?: boolean }) {
  const [family, setFamily] = useState(initialFamily);
  const [preview, setPreview] = useState<{ id: string; x: number; y: number } | null>(null);
  const familyList = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 420, damping: 34, mass: 0.45 });
  const smoothY = useSpring(cursorY, { stiffness: 420, damping: 34, mass: 0.45 });

  useEffect(() => {
    if (!familyOverview || family) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    let pointer: { x: number; y: number } | null = null;
    let visible = false;
    let frame = 0;
    function update() {
      if (!pointer || !media.matches) return;
      const row = document.elementFromPoint(pointer.x, pointer.y)?.closest<HTMLElement>('[data-catalog-family]');
      const id = row && familyList.current?.contains(row) ? row.dataset.catalogFamily : undefined;
      if (!id) {
        visible = false;
        setPreview(null);
        return;
      }
      cursorX.set(pointer.x);
      cursorY.set(pointer.y);
      if (!visible) {
        smoothX.jump(pointer.x);
        smoothY.jump(pointer.y);
      }
      visible = true;
      setPreview({ id, x: pointer.x, y: pointer.y });
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return;
      pointer = { x: event.clientX, y: event.clientY };
      update();
    }
    function scroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    function leave() { pointer = null; visible = false; setPreview(null); }
    function out(event: PointerEvent) { if (!event.relatedTarget) leave(); }
    window.addEventListener('pointermove', move);
    window.addEventListener('scroll', scroll, true);
    window.addEventListener('blur', leave);
    window.addEventListener('pointerout', out);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', scroll, true);
      window.removeEventListener('blur', leave);
      window.removeEventListener('pointerout', out);
    };
  }, [familyOverview, family, cursorX, cursorY, smoothX, smoothY]);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const familyButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const filterId = useId();
  const filterMenu = useRef<HTMLDivElement>(null);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const options = [
    { id: '', name: familyOverview ? 'Tutte le famiglie' : 'Tutte le piante', image: 'ornamentali-illustrazione.webp' },
    { id: 'rose', name: 'Tutte le rose', image: 'rosa-illustrazione.webp' },
    ...FAMILIES,
  ];
  const selected = options.find(option => option.id === family) ?? options[0];
  function chooseFamily(value: string) {
    setFamily(value);
    filterMenu.current?.hidePopover();
    filterTrigger.current?.focus();
  }
  const activeGroup = CATALOG_GROUPS.find(group => group.id === family || (group.id === 'rose' && family.startsWith('rose-')));
  const shown = PRODUCTS.filter(product => !family || product.family === family || (family === 'rose' && product.family.startsWith('rose-')));

  const categories = FAMILIES.filter(item => !item.id.startsWith('rose-') || item.id === 'rose-grandi-fiori').map(item => ({
    id: item.id.startsWith('rose-') ? 'rose' : item.id,
    name: item.id.startsWith('rose-') ? 'Rose' : item.name,
    products: shown.filter(product => item.id.startsWith('rose-') ? product.family.startsWith('rose-') : product.family === item.id),
  })).filter(category => category.products.length);

  if (familyOverview && !family) return <div ref={familyList} className={`catalog-families${preview ? ' has-cursor-preview' : ''}`} aria-label="Famiglie di piante">
    {CATALOG_GROUPS.map(group => {
      const products = PRODUCTS.filter(product => group.id === 'rose' ? product.family.startsWith('rose-') : product.family === group.id);
      return <button key={group.id} ref={element => { familyButtons.current[group.id] = element; }} type="button" className="catalog-family-row" data-catalog-family={group.id} onClick={() => {
        setPreview(null);
        setFamily(group.id);
        requestAnimationFrame(() => { detailHeading.current?.focus(); detailHeading.current?.scrollIntoView({ block: 'start' }); });
      }}>
        <span className="catalog-family-name">{group.name}</span>
        <span className="catalog-family-description">{group.description}</span>
        <span className="catalog-family-meta"><span>{group.id === 'rose' ? 'Ibridatori e formati' : `${products.length} varietà`}</span><span className="catalog-family-action">Esplora</span></span>
      </button>;
    })}
    <motion.div className="catalog-cursor-preview" aria-hidden="true" style={{ x: smoothX, y: smoothY }}>
      {CATALOG_GROUPS.map(group => <Image key={group.id} src={sitePath(`/images/optimized/${FAMILY_PREVIEWS[group.id]}`)} alt="" width={144} height={176} sizes="144px" className={preview?.id === group.id ? 'is-visible' : ''} draggable={false} />)}
    </motion.div>
  </div>;

  return <div className={familyOverview ? "catalog-family-detail" : undefined}>
    {familyOverview && <button type="button" className="catalog-back" onClick={() => {
      const previous = activeGroup?.id ?? family;
      setFamily('');
      requestAnimationFrame(() => familyButtons.current[previous]?.focus());
    }}>← Tutte le famiglie</button>}
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
      <p role="status">{family === 'rose' || family.startsWith('rose-') ? 'Ibridatori e formati' : `${shown.filter(product => !product.family.startsWith('rose-')).length} varietà${!family ? ' e rose per ibridatore' : ''}`}</p>
    </div>
    <div className="catalog-listino">{categories.map(category => <section className="listino-category" key={category.id} id={category.id}>
      <header className="listino-category-heading">
        {!familyOverview && <div className="listino-category-art"><CatalogArtwork product={category.products[0]} /></div>}
        {familyOverview ? <div><h2 ref={detailHeading} tabIndex={-1}>{category.name}</h2><p className="catalog-family-description">{activeGroup?.description}</p></div> : <div><h2>{category.name}</h2><p className="catalog-family-description">{CATALOG_GROUPS.find(group => group.id === category.id)?.description}</p></div>}
      </header>
      {category.id === 'mimose' ? <div className="listino-family">
        <article className="listino-product">
          <div className="listino-identity"><h3>Acacia dealbata</h3></div>
          <p className="rose-family-description">{category.products.map(product => product.name.replace('Acacia dealbata ', '')).join(', ')}.</p>
          <h3>Formati di coltivazione</h3>
          <ProductTable product={mimosaSummary(category.products)} />
        </article>
      </div> : FAMILIES.filter(item => category.products.some(product => product.family === item.id)).map(item => <div className="listino-family" key={item.id}>
        {category.id === 'rose' && <><h3 id={item.id}>{item.name}</h3>{familyOverview && <p className="rose-family-description">{ROSE_DESCRIPTIONS[item.id]}</p>}{ROSE_BREEDERS[item.id] && <p className="rose-family-description">Abbiamo tutti i principali ibridatori: {ROSE_BREEDERS[item.id].join(', ')}.</p>}</>}
        {(category.id === 'rose' ? roseSummary(category.products.filter(product => product.family === item.id)) : category.products.filter(product => product.family === item.id)).map(product => <article className="listino-product" key={product.slug}>
          <div className="listino-identity">{category.id === 'rose' ? <h4>{product.name}</h4> : <h3>{product.name}</h3>}</div>
          <ProductTable product={product} />
        </article>)}
      </div>)}
    </section>)}</div>
    {!shown.length && <p className="catalog-empty">Nessuna pianta trovata. <button type="button" onClick={() => setFamily('')}>Mostra tutto il catalogo</button></p>}
  </div>;
}
