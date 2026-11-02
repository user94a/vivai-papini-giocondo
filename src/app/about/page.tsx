"use client";
import { useEffect } from "react";
import { sitePath } from "@/lib/site-path";
export default function AboutPage() {
  useEffect(() => { window.location.replace(sitePath("/#storia")); }, []);
  return <main><h1>Le nostre radici</h1><a href={sitePath("/#storia")}>Scopri la nostra storia</a></main>;
}
