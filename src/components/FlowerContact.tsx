"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./flower-contact.css";

export function FlowerContact() {
  const link = useRef<HTMLAnchorElement>(null);
  const bee = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchor = link.current;
    const insect = bee.current;
    if (!anchor || !insect) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let active = false;
    let lastMove = 0;
    let previous = performance.now();
    let pointer = { x: 0, y: 0 };
    let position = { x: 0, y: 0 };
    let angle = -25;

    const reset = () => {
      active = false;
      anchor.classList.remove("is-blooming", "is-landed");
      insect.classList.remove("is-visible", "is-landed");
      document.documentElement.classList.remove("flower-bee-active");
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const animate = (now: number) => {
      if (!active) return;
      const rect = anchor.getBoundingClientRect();
      const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      const settled = now - lastMove > 650;
      const attraction = settled ? 1 : .22;
      const target = {
        x: pointer.x + (center.x - pointer.x) * attraction,
        y: pointer.y + (center.y - pointer.y) * attraction,
      };
      const delta = Math.min(now - previous, 40);
      previous = now;
      const ease = 1 - Math.exp(-delta / (settled ? 170 : 65));
      const dx = target.x - position.x;
      const dy = target.y - position.y;
      position.x += dx * ease;
      position.y += dy * ease;
      if (Math.hypot(dx, dy) > 3) angle = Math.max(-45, Math.min(45, dx * .8));
      const landed = settled && Math.hypot(dx, dy) < 3;
      insect.classList.toggle("is-landed", landed);
      anchor.classList.toggle("is-landed", landed);
      insect.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) rotate(${landed ? -18 : angle}deg)`;
      frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return reset();
      const rect = anchor.getBoundingClientRect();
      const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
      if (distance > 115) return reset();
      pointer = { x: event.clientX, y: event.clientY };
      lastMove = performance.now();
      if (!active) {
        active = true;
        position = { ...pointer };
        previous = lastMove;
        anchor.classList.add("is-blooming");
        insect.classList.add("is-visible");
        document.documentElement.classList.add("flower-bee-active");
        frame = requestAnimationFrame(animate);
      }
    };
    const visibility = () => { if (document.hidden) reset(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", reset);
    anchor.addEventListener("click", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", reset);
      anchor.removeEventListener("click", reset);
    };
  }, []);

  return <>
    <Link ref={link} className="round-link header-contact flower-contact" href="/contatti" aria-label="Contatti">
      <span className="flower-contact-label">Contatti</span>
      <svg className="contact-flower" viewBox="0 0 160 160" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45} 80 80)`}><ellipse className="contact-petal" cx="80" cy="42" rx="22" ry="34" style={{ transitionDelay: `${i * 18}ms` }} /></g>)}
        <circle className="contact-flower-center" cx="80" cy="80" r="25" />
        <g fill="#c5ceba" opacity=".65">{[[73,72],[86,70],[91,82],[79,87],[68,82]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="2" />)}</g>
      </svg>
    </Link>
    <div ref={bee} className="contact-bee" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none">
        <g className="bee-wings" fill="#f4f4ee" stroke="#193b2b" strokeWidth="1.8"><ellipse cx="27" cy="21" rx="9" ry="14" transform="rotate(-32 27 21)" /><ellipse cx="39" cy="20" rx="8" ry="13" transform="rotate(28 39 20)" /></g>
        <path d="M13 39 6 42l8 3" fill="#193b2b" />
        <ellipse cx="29" cy="39" rx="20" ry="13" fill="#c5ceba" />
        <path d="M21 27c-4 8-4 16 0 24m10-25c-4 8-4 18 0 26" stroke="#193b2b" strokeWidth="6" />
        <ellipse cx="47" cy="35" rx="10" ry="11" fill="#193b2b" />
        <circle cx="50" cy="32" r="2" fill="#f4f4ee" />
        <path d="m45 25-2-8m7 8 4-7M26 49l-3 6m15-6 3 6" stroke="#193b2b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  </>;
}
