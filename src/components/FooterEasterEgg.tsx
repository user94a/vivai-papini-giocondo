"use client";

import { useEffect, useRef, useState } from "react";
import "./footer-easter-egg.css";


const OPEN_CONTOUR = "M13 60Q9 57 11 53L7 49l5-1-5-7 6 1-2-8 6 3-1-8 6 3 1-9 5 4 3-8 5 5 5-9 4 6 7-7 3 7 8-6 1 7 8-3-1 7 8-1-2 7 7 2-4 5 5 5-5 3q1 9-7 12-25 10-54 2Z";
const CLOSED_CONTOUR = "M39 67l-5-4 2-6-5-4 4-5-3-6 6-3-1-7 7-1 2-7 6 2 5-6 5 4 7-3 3 6 7-1 1 7 6 2-2 7 5 4-4 5 2 7-6 3-2 7-7-1-4 5-6-3-6 3-4-5-7 1Z";

export function FooterEasterEgg() {
  const [curled, setCurled] = useState(false);
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const wakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elapsed = useRef(0);
  const gait = useRef(0);
  const curlProgress = useRef(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const shyness = useRef(0);
  const hesitateUntil = useRef(0);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (event.pointerType === "mouse") pointer.current = { x: event.clientX, y: event.clientY };
    };
    const leave = () => { pointer.current = null; };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, []);

  useEffect(() => () => { if (wakeTimer.current) clearTimeout(wakeTimer.current); }, []);

  function curlUp() {
    setCurled(true);
    setOpening(false);
    if (wakeTimer.current) clearTimeout(wakeTimer.current);
    wakeTimer.current = setTimeout(() => {
      setCurled(false);
      setOpening(true);
      wakeTimer.current = setTimeout(() => setOpening(false), 1900);
    }, 3400);
  }

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => setVisible(inView && !preference.matches && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    const element = scene.current;
    if (!element || !visible) return;
    const rail = element.querySelector<HTMLElement>(".footer-hedgehog-travel")!;
    const outline = element.querySelector<SVGPathElement>(".hedgehog-outline")!;
    const body = element.querySelector<SVGGElement>(".hedgehog-body")!;
    const head = element.querySelector<SVGGElement>(".hedgehog-head")!;
    const quills = element.querySelector<SVGGElement>(".hedgehog-quills")!;
    const legs = element.querySelectorAll<SVGGElement>(".hedgehog-leg");
    const sample = (d: string) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      const length = path.getTotalLength();
      return Array.from({ length: 150 }, (_, i) => path.getPointAtLength(length * i / 150));
    };
    const openContour = sample(OPEN_CONTOUR);
    const closedContour = sample(CLOSED_CONTOUR);
    let frame = 0;
    let previous = 0;
    let previousX: number | undefined;
    let resumed = 0;
    const smooth = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    function draw(now: number) {
      const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      const goal = curled ? 1 : 0;
      const delta = dt / (curled ? 1.05 : 1.8);
      curlProgress.current += Math.sign(goal - curlProgress.current) * Math.min(Math.abs(goal - curlProgress.current), delta);
      const p = curlProgress.current;
      const folding = curled || opening || p > .001;
      const bounds = rail.getBoundingClientRect();
      const mouse = pointer.current;
      const noseX = bounds.left + 103;
      const noseY = bounds.top + 53;
      const near = mouse && mouse.x > noseX - 24 && Math.hypot(mouse.x - noseX, mouse.y - noseY) < 115;
      if (near && !folding) hesitateUntil.current = now + 1300;
      const shyTarget = !folding && now < hesitateUntil.current ? 1 : 0;
      shyness.current += (shyTarget - shyness.current) * (1 - Math.exp(-dt * (shyTarget ? 5 : 1.8)));
      const shy = shyness.current;
      resumed = folding ? 0 : Math.min(1, resumed + dt / .8);
      if (!folding) elapsed.current += dt * smooth(resumed) * Math.pow(1 - shy, 3);
      const t = elapsed.current % 46;
      const width = element!.clientWidth;
      const stops = [
        [0, -124], [1, -124], [11, width * .24 - 62],
        [14, width * .24 - 62], [18, width * .34 - 62],
        [20, width * .34 - 62], [30, width * .66 - 62],
        [34, width * .66 - 62], [43, width + 2], [46, width + 2],
      ];
      const index = stops.findIndex((stop, i) => i < stops.length - 1 && t >= stop[0] && t < stops[i + 1][0]);
      const [start, end] = [stops[Math.max(0, index)], stops[Math.max(0, index) + 1]];
      const progress = (t - start[0]) / (end[0] - start[0]);
      const x = start[1] + (end[1] - start[1]) * smooth(progress);
      const distance = previousX === undefined ? 0 : Math.max(0, x - previousX);
      previousX = x;
      // The full stance covers the same distance as the body in screen space.
      gait.current += distance * (Math.PI * 2 * .62 / 11);
      const speed = dt ? distance / dt : 0;
      const walking = folding ? 0 : Math.min(1, speed / 12);
      rail.style.transform = `translateX(${x - shy * 7}px)`;
      element!.dataset.mood = shy > .5 ? "timid" : "exploring";
      const c = p * p * (3 - 2 * p);
      const phase = gait.current;
      const stride = walking * (1 - c);
      body.setAttribute("transform", `translate(0 ${-Math.abs(Math.sin(phase)) * 2.4 * stride}) rotate(${Math.sin(phase) * .7 * stride} 53 58)`);
      outline.setAttribute("d", openContour.map((point, i) => `${i ? "L" : "M"}${point.x + (closedContour[i].x - point.x) * c},${point.y + (closedContour[i].y - point.y) * c}`).join(" ") + "Z");
      quills.setAttribute("transform", `translate(${12 * c} ${4 * c}) translate(50 43) scale(${1 - .25 * c} ${1 + .28 * c}) translate(-50 -43)`);
      const sniff = (1 - walking) * (Math.sin(now / 250) * 2 + 2);
      const glance = mouse ? Math.max(-7, Math.min(5, (mouse.y - noseY) * .08)) * shy : 0;
      head.setAttribute("transform", `translate(${-31 * c - shy * 2} ${9 * c + shy}) rotate(${76 * c + (sniff * (1 - shy) + glance - shy * 3) * (1 - c)} 86 47) translate(86 47) scale(${1 - .58 * c}) translate(-86 -47)`);
      head.style.opacity = `${1 - Math.min(1, Math.max(0, (c - .6) / .3))}`;
      legs.forEach((leg, i) => {
        const cycle = ((phase / (Math.PI * 2) + [0, .5, .55, .05][i]) % 1 + 1) % 1;
        const stance = cycle < .62;
        const u = stance ? cycle / .62 : (cycle - .62) / .38;
        const footX = (stance ? 7 - 14 * u : -7 + 14 * smooth(u)) * stride;
        const lift = stance ? 0 : -Math.sin(Math.PI * u) * 5 * stride;
        const hip = [27, 75, 33, 81][i];
        leg.setAttribute("transform", `translate(${footX + (61 - hip) * c * .7} ${lift - 21 * c}) rotate(${(i % 2 ? 65 : -65) * c} ${hip} 56)`);
        leg.style.opacity = `${(i < 2 ? .55 : 1) * (1 - Math.min(1, c * 1.3))}`;
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [visible, curled, opening]);

  return (
    <div className={`footer-wildlife${curled ? " is-curled" : ""}${opening ? " is-opening" : ""}`} ref={scene}>
      <div className="footer-hedgehog-travel">
        <button type="button" className="hedgehog-touch" onClick={curlUp} aria-label="Fai chiudere il riccio a pallina" aria-pressed={curled}>
          <svg className="footer-hedgehog" viewBox="0 0 140 90" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {[27, 75, 33, 81].map((hip, i) => (
              <g className="hedgehog-leg" key={hip} opacity={i < 2 ? .55 : 1}>
                <path d={`M${hip - 3} 55q-2 7 1 11l-1 8q5 2 11 0 2-1-1-2l-6-2 1-13`} />
                <path d={`m${hip + 3} 71 1 3m2-3 1 3`} strokeWidth=".75" />
              </g>
            ))}
            <g className="hedgehog-body">
              <g className="hedgehog-head">
                <path d="M80 39q12-7 19 5 3 5 4 10l13 6q7 2 5 6c-3 7-22 6-37-2-8-4-9-18-4-25Z" fill="var(--wildlife-ground)" />
                <path d="M89 43c-10 1-14-10-8-15 8-6 18 6 11 14m-5-4q-7-2-3-6 3-2 5 2" />
                <path d="M97 48q2-3 5-2m-15 12 2 1m0 4 3 1M108 66q4 3 8 0" strokeWidth=".85" />
                <ellipse cx="102" cy="53" rx="2.7" ry="3.2" fill="currentColor" stroke="none" />
                <circle cx="103" cy="51.8" r=".95" fill="var(--wildlife-ground)" stroke="none" />
                <circle cx="101.3" cy="54.2" r=".45" fill="var(--wildlife-ground)" stroke="none" />
                <path d="M117 59q6-1 6 2-1 4-5 2-2-1-1-4Z" fill="currentColor" />
                <path d="m111 61 14-4m-14 7 16-1m-16 3 12 4" strokeWidth=".65" />
              </g>
              <path className="hedgehog-outline" d={OPEN_CONTOUR} fill="var(--wildlife-ground)" />
              <g className="hedgehog-quills" strokeWidth=".95">
                {Array.from({ length: 43 }, (_, i) => {
                  const angle = i * 2.399963;
                  const r = Math.sqrt((i + .5) / 43);
                  const x = 50 + Math.cos(angle) * r * 34;
                  const y = 43 + Math.sin(angle) * r * 20;
                  const dx = (x - 49) * .12;
                  const dy = -3 - (1 - r) * 2;
                  return <path key={i} d={`M${x - dx * .35} ${y + 2}q${dx * .2 - 1} ${dy * .55} ${dx} ${dy}m${-dx} ${-dy}q2-1 ${dx + 1} ${dy + 2}`} />;
                })}
                <path d="M19 55q7 8 17 8m7 1q14 3 29-3" strokeWidth=".7" />
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
