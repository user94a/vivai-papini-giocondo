"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Explicit targets keep forms, dialogs and independently animated controls intact.
const targets = [
  ".hero-heading h1", ".hero-description", ".hero-landscape",
  ".section-heading", ".production-card", ".catalog-home-link",
  ".roots-copy > *", ".roots-image", ".gesture-card",
  ".coupon-left > h2", ".coupon-left > p", ".contact-direct", ".coupon-right",
  ".about-editorial-body > p", ".about-photo-single",
  ".catalog-intro > *", "[data-catalog-family]", ".product-identity > *", ".product-formats",
  ".dedicated-intro", ".contact-card", ".location-copy > *", ".location-map",
].join(",");

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const pending = new Set<HTMLElement>();
    const seen = new WeakSet<HTMLElement>();
    let observer: IntersectionObserver | undefined;

    function reset() {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      pending.forEach(element => element.removeAttribute("data-motion-pending"));
      pending.clear();
    }

    function setup() {
      reset();
      if (preference.matches || !Element.prototype.animate) return;
      function enter(element: HTMLElement, index: number) {
        observer?.unobserve(element);
        pending.delete(element);
        element.removeAttribute("data-motion-pending");
        const media = element.matches(".hero-landscape, .roots-image, .about-photo-single");
        const animation = element.animate([
          { opacity: 0, translate: `0 ${media ? 24 : 28}px` },
          { opacity: 1, translate: "0 0" },
        ], {
          duration: media ? 900 : 720,
          delay: Math.min(index, 3) * 65,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }

      observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry, index) => enter(entry.target as HTMLElement, index));
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

      let entranceIndex = 0;
      document.querySelectorAll<HTMLElement>(targets).forEach(element => {
        if (seen.has(element) || element.closest("dialog")) return;
        seen.add(element);
        const box = element.getBoundingClientRect();
        if (box.width === 0 || box.bottom <= 0) return;
        // Replay the visible entrance on reload and every client-side navigation.
        if (box.top < innerHeight * .92) {
          enter(element, entranceIndex++);
          return;
        }
        element.setAttribute("data-motion-pending", "");
        pending.add(element);
        observer?.observe(element);
      });
    }

    setup();
    preference.addEventListener("change", setup);
    // Keyboard focus must never land in invisible content.
    function revealFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-motion-pending]");
      if (!element) return;
      element.removeAttribute("data-motion-pending");
      pending.delete(element);
      observer?.unobserve(element);
    }
    document.addEventListener("focusin", revealFocus);
    return () => {
      reset();
      preference.removeEventListener("change", setup);
      document.removeEventListener("focusin", revealFocus);
    };
  }, [pathname]);

  return null;
}
