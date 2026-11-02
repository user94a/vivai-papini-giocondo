"use client";

import { Image as ImageIcon } from "@phosphor-icons/react";

type PlaceholderMediaProps = {
  label: string;
  aspect?: string;
  className?: string;
};

export function PlaceholderMedia({
  label,
  aspect = "4 / 3",
  className = "",
}: PlaceholderMediaProps) {
  return (
    <div
      className={`placeholder-media ${className}`}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={label}
    >
      <ImageIcon weight="duotone" size={28} />
      <span>{label}</span>
    </div>
  );
}
