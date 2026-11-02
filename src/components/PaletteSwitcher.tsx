"use client";

import { useDesignLab } from "@/components/design-lab/DesignLabProvider";
import { COLOR_PRESETS } from "@/lib/design-tokens";

function colorsMatch(a: Record<string, string>, b: Record<string, string>): boolean {
  return Object.keys(b).every((key) => a[key] === b[key]);
}

export function PaletteSwitcher() {
  const { state, applyPreset } = useDesignLab();

  return (
    <div className="palette-switcher" role="group" aria-label="Cambia palette colori">
      {COLOR_PRESETS.map((preset) => {
        const active = colorsMatch(state.colors, preset.colors);
        return (
          <button
            key={preset.id}
            type="button"
            className={`palette-chip ${active ? "is-active" : ""}`}
            onClick={() => applyPreset(preset.id)}
            aria-pressed={active}
            title={preset.label}
          >
            <span className="palette-chip-swatches" aria-hidden>
              <i style={{ background: preset.colors.surface }} />
              <i style={{ background: preset.colors.accent }} />
              <i style={{ background: preset.colors.accentAlt }} />
              <i style={{ background: preset.colors.ink }} />
            </span>
            <span className="palette-chip-name">{preset.label}</span>
          </button>
        );
      })}
    </div>
  );
}
