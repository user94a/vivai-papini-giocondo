"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MOMENTS } from "@/lib/content";

export function Approccio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 312, behavior: "smooth" });
  };

  return (
    <section className="moments" id="approccio">
      <div className="moments-head">
        <h2>Come parte un lotto</h2>
        <div className="moments-nav">
          <button
            type="button"
            className="moments-btn"
            aria-label="Momenti precedenti"
            onClick={() => scrollBy(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="moments-btn"
            aria-label="Momenti successivi"
            onClick={() => scrollBy(1)}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="moments-progress"
        role="presentation"
        aria-hidden="true"
      >
        <span style={{ width: `${Math.max(8, progress * 100)}%` }} />
      </div>

      <div className="moments-track" ref={trackRef} tabIndex={0}>
        {MOMENTS.map((moment) => (
          <article
            key={moment.caption}
            className="moment-col"
            style={{ ["--moment-space" as string]: `${moment.space}px` }}
          >
            <h3>{moment.caption}</h3>
            <p>{moment.text}</p>
            <div className="moment-spacer" aria-hidden="true" />
            <Image
              src={moment.image}
              alt={moment.imageAlt}
              width={560}
              height={700}
              className="moment-photo"
              sizes="280px"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
