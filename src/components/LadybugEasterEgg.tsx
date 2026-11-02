"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./ladybug-easter-egg.css";

export function LadybugEasterEgg() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let departure: ReturnType<typeof setTimeout>;
    let bug: HTMLDivElement | undefined;
    let animation: Animation | undefined;
    let anchor: Range | undefined;
    let leaving = false;

    function remove() {
      clearTimeout(departure);
      animation?.cancel();
      bug?.remove();
      bug = undefined;
      anchor = undefined;
    }

    function schedule(first = false) {
      clearTimeout(timer);
      if (!preference.matches && !document.hidden) {
        timer = setTimeout(arrive, first ? 3500 : 14000 + Math.random() * 12000);
      }
    }

    function position() {
      if (!bug || !anchor) return;
      const rect = anchor.getBoundingClientRect();
      bug.style.left = `${rect.left + rect.width / 2 - 14}px`;
      bug.style.top = `${rect.top + rect.height * 0.18 - 17}px`;
    }

    function flyAway() {
      if (!bug || leaving) return;
      leaving = true;
      clearTimeout(departure);
      const body = bug.querySelector<HTMLElement>(".ladybug-body")!;
      const current = getComputedStyle(body).transform;
      animation?.cancel();
      bug.classList.add("is-flying");
      bug.classList.remove("is-landed");
      const direction = Math.random() > 0.5 ? 1 : -1;
      animation = body.animate([
        { transform: current, opacity: 1, filter: "blur(0px)" },
        { transform: `perspective(500px) translate3d(${direction * 24}px, -32px, 45px) rotateX(35deg) rotate(${-direction * 25}deg) scale(1.5)`, opacity: 1, offset: 0.3 },
        { transform: `perspective(500px) translate3d(${direction * 250}px, -260px, 140px) rotateX(55deg) rotate(${-direction * 45}deg) scale(2.8)`, opacity: 0, filter: "blur(2px)" },
      ], { duration: 1200, easing: "cubic-bezier(0.45, 0, 0.8, 0.4)", fill: "forwards" });
      animation.onfinish = () => { remove(); schedule(); };
    }

    function arrive() {
      if (preference.matches || document.hidden) return;
      if (document.querySelector("dialog[open]")) { schedule(); return; }
      const letters: Range[] = [];
      document.querySelectorAll<HTMLElement>("main h1, main h2, main h3").forEach(heading => {
        if (heading.closest("[inert], [aria-hidden='true'], dialog")) return;
        const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const text = node.textContent ?? "";
          for (let index = 0; index < text.length; index++) {
            if (!/[\p{L}\p{N}]/u.test(text[index])) continue;
            const range = document.createRange();
            range.setStart(node, index);
            range.setEnd(node, index + 1);
            const rect = range.getBoundingClientRect();
            if (rect.width > 8 && rect.top > 130 && rect.bottom < window.innerHeight - 35 && rect.left > 25 && rect.right < window.innerWidth - 25) letters.push(range);
          }
        }
      });
      anchor = letters[Math.floor(Math.random() * letters.length)];
      if (!anchor) { schedule(true); return; }
      leaving = false;
      bug = document.createElement("div");
      bug.className = "ladybug-visitor is-flying";
      bug.innerHTML = `<span class="ladybug-shadow" aria-hidden="true"></span><button type="button" class="ladybug-body" aria-label="Fai volare la coccinella"><svg viewBox="0 0 40 44" aria-hidden="true"><g stroke="#181c16" stroke-width="1.5" stroke-linecap="round"><path d="M12 19 5 15M11 25 3 26M13 31 6 37M28 19 35 15M29 25 37 26M27 31 34 37M16 10 13 4M24 10 27 4"/></g><ellipse cx="20" cy="24" rx="12" ry="15" fill="#171b17"/><g class="ladybug-wing ladybug-wing-left"><ellipse cx="13" cy="26" rx="7" ry="14" fill="#dce1ce" fill-opacity=".8"/></g><g class="ladybug-wing ladybug-wing-right"><ellipse cx="27" cy="26" rx="7" ry="14" fill="#dce1ce" fill-opacity=".8"/></g><g class="ladybug-shell"><path d="M19.5 12C5 10 3 35 19.5 39Z" fill="#bd3024"/><path d="M20.5 12C35 10 37 35 20.5 39Z" fill="#e44430"/><g fill="#191c17"><circle cx="13" cy="21" r="2.4"/><circle cx="12" cy="30" r="2.6"/><circle cx="27" cy="21" r="2.4"/><circle cx="28" cy="30" r="2.6"/><circle cx="20" cy="35" r="2"/></g><ellipse cx="25" cy="17" rx="2.5" ry="4" fill="#fff" opacity=".28" transform="rotate(-30 25 17)"/></g><ellipse cx="20" cy="11" rx="7" ry="5" fill="#171b17"/><circle cx="16" cy="10" r="1.5" fill="#f2f0df"/><circle cx="24" cy="10" r="1.5" fill="#f2f0df"/></svg></button>`;
      document.body.appendChild(bug);
      position();
      const body = bug.querySelector<HTMLElement>(".ladybug-body")!;
      body.addEventListener("pointerenter", flyAway);
      body.addEventListener("click", event => { event.stopPropagation(); flyAway(); });
      body.addEventListener("focus", flyAway);
      animation = body.animate([
        { transform: "perspective(500px) translate3d(-160px, -180px, 150px) rotateX(55deg) rotate(-35deg) scale(3)", opacity: 0, filter: "blur(2px)" },
        { transform: "perspective(500px) translate3d(-45px, -55px, 65px) rotateX(30deg) rotate(18deg) scale(1.8)", opacity: 1, filter: "blur(.5px)", offset: 0.55 },
        { transform: "perspective(500px) translate3d(0, 0, 0) rotateX(0) rotate(-12deg) scale(1)", opacity: 1, filter: "blur(0px)" },
      ], { duration: 2100, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" });
      animation.onfinish = () => {
        bug?.classList.remove("is-flying");
        bug?.classList.add("is-landed");
        departure = setTimeout(flyAway, 10000 + Math.random() * 8000);
      };
    }

    function reset() { remove(); schedule(true); }
    schedule(true);
    window.addEventListener("scroll", position, { passive: true });
    window.addEventListener("resize", position);
    document.addEventListener("visibilitychange", reset);
    preference.addEventListener("change", reset);
    return () => {
      clearTimeout(timer);
      remove();
      window.removeEventListener("scroll", position);
      window.removeEventListener("resize", position);
      document.removeEventListener("visibilitychange", reset);
      preference.removeEventListener("change", reset);
    };
  }, [pathname]);
  return null;
}
