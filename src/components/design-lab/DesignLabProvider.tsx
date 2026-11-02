"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COLOR_PRESETS,
  DEFAULT_DESIGN,
  designToCssVars,
  type ColorTokens,
  type DesignState,
} from "@/lib/design-tokens";

type DesignLabContextValue = {
  state: DesignState;
  setColors: (partial: Partial<ColorTokens>) => void;
  setRadius: (n: number) => void;
  applyPreset: (id: string) => void;
  reset: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DesignLabContext = createContext<DesignLabContextValue | null>(null);

const STORAGE_KEY = "vpg-design-lab-v3";

export function DesignLabProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DesignState>(DEFAULT_DESIGN);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DesignState;
        setState({
          ...DEFAULT_DESIGN,
          ...parsed,
          colors: { ...DEFAULT_DESIGN.colors, ...parsed.colors },
        });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    const vars = designToCssVars(state);
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [state]);

  const setColors = useCallback((partial: Partial<ColorTokens>) => {
    setState((prev) => ({ ...prev, colors: { ...prev.colors, ...partial } }));
  }, []);

  const setRadius = useCallback((n: number) => {
    setState((prev) => ({ ...prev, radius: n }));
  }, []);

  const applyPreset = useCallback((id: string) => {
    const preset = COLOR_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setState((prev) => ({ ...prev, colors: preset.colors }));
  }, []);

  const reset = useCallback(() => setState(DEFAULT_DESIGN), []);

  const value = useMemo(
    () => ({
      state,
      setColors,
      setRadius,
      applyPreset,
      reset,
      open,
      setOpen,
    }),
    [state, setColors, setRadius, applyPreset, reset, open],
  );

  return <DesignLabContext.Provider value={value}>{children}</DesignLabContext.Provider>;
}

export function useDesignLab() {
  const ctx = useContext(DesignLabContext);
  if (!ctx) throw new Error("useDesignLab must be used within DesignLabProvider");
  return ctx;
}
