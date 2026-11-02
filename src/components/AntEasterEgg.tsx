"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./ant-easter-egg.css";

const hidingPlaces = ".production-card, .gesture-card, .roots-image, .hero-landscape, .contact-card";

export function AntEasterEgg() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    const positions = new WeakMap<HTMLDivElement, { x: number; y: number }>();
    const visitors = new Map<HTMLDivElement, () => void>();

    function hide() {
      visitors.forEach(remove => remove());
    }

    function schedule(first = false) {
      clearTimeout(timer);
      if (preference.matches || document.hidden) return;
      timer = setTimeout(appear, first ? 800 + Math.random() * 400 : 1800 + Math.random() * 2200);
    }

    function appear() {
      if (preference.matches || document.hidden) return;
      if (!document.querySelector("dialog[open], [aria-modal='true']")) {
        const places = Array.from(document.querySelectorAll<HTMLElement>(hidingPlaces))
          .flatMap(element => {
            const rect = element.getBoundingClientRect();
            const edges: { x: number; y: number; angle: number }[] = [];
            if (rect.width < 120 || rect.height < 100) return edges;
            const middleX = Math.max(65, Math.min(window.innerWidth - 65, rect.left + rect.width * (0.3 + Math.random() * 0.4)));
            const top = Math.max(150, rect.top + 70);
            const bottom = Math.min(window.innerHeight - 70, rect.bottom - 70);
            if (rect.bottom > 150 && rect.bottom < window.innerHeight - 35) {
              edges.push({ x: middleX - 50, y: rect.bottom - 1, angle: 0 });
            }
            if (bottom > top) {
              const y = top + Math.random() * (bottom - top);
              if (rect.right < window.innerWidth - 22 && rect.right > 22) edges.push({ x: rect.right - 1, y: y + 50, angle: -90 });
              if (rect.left > 22 && rect.left < window.innerWidth - 22) edges.push({ x: rect.left + 1, y: y - 50, angle: 90 });
            }
            return edges;
          });
        const place = places[Math.floor(Math.random() * places.length)];
        if (place && visitors.size < 3) {
          const leftward = Math.random() > 0.5;
          const visitor = document.createElement("div");
          let walk: Animation | undefined;
          function remove() {
            walk?.cancel();
            visitor.remove();
            visitors.delete(visitor);
          }
          visitors.set(visitor, remove);
          visitor.className = "ant-hideout";
          visitor.style.left = `${place.x}px`;
          visitor.style.top = `${place.y}px`;
          visitor.style.transform = `rotate(${place.angle}deg)`;
          positions.set(visitor, { x: place.x + window.scrollX, y: place.y + window.scrollY });
          visitor.innerHTML = `<div class="ant-walk"><svg class="ant-drawing" viewBox="0 0 24 16" fill="none"><g stroke="currentColor" stroke-width="1" stroke-linecap="round"><g class="ant-legs-a"><path d="M12 7 9 3 6 2M13 8 12 12 9 15M15 7 18 4 21 4"/></g><g class="ant-legs-b"><path d="M11 8 7 11 4 11M13 7 13 3 11 1M15 8 18 11 21 12"/></g><path d="M18 6 21 3 23 3M18 8 22 9 23 8"/></g><g fill="currentColor"><ellipse cx="6.5" cy="7.5" rx="4.5" ry="3"/><ellipse cx="13" cy="7.5" rx="2.5" ry="1.8"/><circle cx="17.5" cy="7" r="2.5"/></g></svg></div>`;
          document.body.appendChild(visitor);
          const ant = visitor.firstElementChild as HTMLElement;
          ant.setAttribute("role", "button");
          ant.setAttribute("tabindex", "0");
          ant.setAttribute("aria-label", "Fai scappare la formichina");
          let fleeing = false;
          function flee(event: Event) {
            event.stopPropagation();
            if (fleeing) return;
            fleeing = true;
            const distance = getComputedStyle(ant).offsetDistance;
            walk?.cancel();
            visitor.classList.add("ant-is-fleeing");
            // Turn in place, then retrace the same route head first into shelter.
            walk = ant.animate([
              { offsetDistance: distance, offsetRotate: "auto 0deg" },
              { offsetDistance: distance, offsetRotate: "auto 180deg", offset: 0.2 },
              { offsetDistance: "0%", offsetRotate: "auto 180deg" },
            ], { duration: 650, easing: "linear", fill: "forwards" });
            walk.onfinish = remove;
          }
          ant.addEventListener("click", flee);
          ant.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              flee(event);
            }
          });
          const direction = leftward ? -1 : 1;
          // A continuous curve supplies both position and the exact forward tangent.
          // Local +y is outward from the card, even on the rotated side edges.
          const startX = 40 - direction * 24;
          const endX = 40 + direction * 28;
          ant.style.offsetPath = `path("M ${startX} -20 C ${startX} -4, ${startX} 10, ${40 - direction * 8} 10 C ${40 + direction * 6} 10, ${endX} 10, ${endX} -20")`;
          ant.style.offsetRotate = "auto";
          ant.style.offsetAnchor = "center";
          walk = ant.animate([
            { offsetDistance: "0%" },
            { offsetDistance: "100%" },
          ], { duration: 7000 + Math.random() * 2500, easing: "linear", fill: "both" });
          walk.onfinish = remove;
        }
      }
      schedule(visitors.size === 0);
    }

    function onScroll() {
      visitors.forEach((_, visitor) => {
        const position = positions.get(visitor);
        if (position) {
          visitor.style.left = `${position.x - window.scrollX}px`;
          visitor.style.top = `${position.y - window.scrollY}px`;
        }
      });
      if (!visitors.size) schedule(true);
    }

    function reset() {
      hide();
      schedule(true);
    }

    schedule(true);
    preference.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", hide);
    return () => {
      clearTimeout(timer);
      hide();
      preference.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", hide);
    };
  }, [pathname]);

  return null;
}
