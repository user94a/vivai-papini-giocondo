export type ColorTokens = {
  bg: string;
  surface: string;
  ink: string;
  inkMuted: string;
  accent: string;
  accentAlt: string;
  line: string;
};

export type DesignState = {
  colors: ColorTokens;
  radius: number;
};

export const COLOR_PRESETS: { id: string; label: string; colors: ColorTokens }[] = [
  {
    id: "menta-terracotta",
    label: "Menta & Terracotta",
    colors: {
      bg: "#F7F7F5",
      surface: "#FFFFFF",
      ink: "#044023",
      inkMuted: "#5A6B62",
      accent: "#7E9278",
      accentAlt: "#C78C4D",
      line: "#E6E6E3",
    },
  },
  {
    id: "oliva-bosco",
    label: "Oliva & Bosco",
    colors: {
      bg: "#F7F7F5",
      surface: "#FFFFFF",
      ink: "#03331C",
      inkMuted: "#5A6B62",
      accent: "#044023",
      accentAlt: "#8B8C45",
      line: "#E6E6E3",
    },
  },
];

export const DEFAULT_DESIGN: DesignState = {
  colors: COLOR_PRESETS[0].colors,
  radius: 10,
};

export function designToCssVars(state: DesignState): Record<string, string> {
  return {
    "--c-bg": state.colors.bg,
    "--c-surface": state.colors.surface,
    "--c-ink": state.colors.ink,
    "--c-ink-muted": state.colors.inkMuted,
    "--c-accent": state.colors.accent,
    "--c-accent-alt": state.colors.accentAlt,
    "--c-line": state.colors.line,
    "--radius-base": `${state.radius}px`,
  };
}
