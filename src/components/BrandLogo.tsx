import { sitePath } from "@/lib/site-path";
import Image from "next/image";

const LOGO_ALT = "Vivai Papini Giocondo";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
  negative?: boolean;
};

const SIZES = {
  sm: { width: 96, height: 96 },
  md: { width: 112, height: 112 },
  lg: { width: 160, height: 160 },
} as const;

export function BrandLogo({
  size = "md",
  className = "",
  priority = false,
  negative = false,
}: BrandLogoProps) {
  const { width, height } = SIZES[size];

  return (
    <Image
      src={sitePath(`/logo-vivai-papini-giocondo${negative ? "-negativo" : ""}.svg`)}
      alt={LOGO_ALT}
      width={width}
      height={height}
      className={`brand-logo brand-logo-${size} ${className}`.trim()}
      preload={priority}
    />
  );
}
