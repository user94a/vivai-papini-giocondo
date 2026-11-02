"use client";

import { Palette, X, ArrowCounterClockwise, FloppyDisk } from "@phosphor-icons/react";
import { useDesignLab } from "@/components/design-lab/DesignLabProvider";
import { COLOR_PRESETS, type ColorTokens } from "@/lib/design-tokens";

const COLOR_FIELDS: { key: keyof ColorTokens; label: string }[] = [
  { key: "bg", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "ink", label: "Ink" },
  { key: "inkMuted", label: "Ink muted" },
  { key: "accent", label: "Accent" },
  { key: "accentAlt", label: "Accent alt" },
  { key: "line", label: "Line" },
];

export function DesignLab() {
  const { state, setColors, setRadius, applyPreset, reset, open, setOpen } = useDesignLab();

  function copyCss() {
    const lines = Object.entries(state.colors)
      .map(([k, v]) => `  --c-${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${v};`)
      .join("\n");
    void navigator.clipboard.writeText(
      `:root {\n${lines}\n  --radius-base: ${state.radius}px;\n}`,
    );
  }

  return (
    <>
      <button
        type="button"
        className="design-lab-fab"
        onClick={() => setOpen(!open)}
        aria-label="Apri Design Lab"
      >
        <Palette weight="duotone" size={20} />
        <span>Design Lab</span>
      </button>

      {open && (
        <aside className="design-lab-panel">
          <header className="lab-header">
            <h2>Design Lab</h2>
            <button type="button" className="lab-icon-btn" onClick={() => setOpen(false)} aria-label="Chiudi">
              <X size={16} weight="bold" />
            </button>
          </header>

          <section className="lab-section">
            <div className="lab-section-title">Preset</div>
            <div className="lab-preset-grid">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="lab-preset"
                  onClick={() => applyPreset(preset.id)}
                >
                  <span style={{ background: preset.colors.surface }} />
                  <span style={{ background: preset.colors.accent }} />
                  <span style={{ background: preset.colors.accentAlt }} />
                  <em>{preset.label}</em>
                </button>
              ))}
            </div>
          </section>

          <section className="lab-section">
            <div className="lab-section-title">Colori</div>
            <div className="lab-color-grid">
              {COLOR_FIELDS.map((field) => (
                <label key={field.key} className="lab-color-row">
                  <span>{field.label}</span>
                  <input
                    type="color"
                    value={state.colors[field.key]}
                    onChange={(e) => setColors({ [field.key]: e.target.value })}
                  />
                  <code>{state.colors[field.key]}</code>
                </label>
              ))}
            </div>
          </section>

          <section className="lab-section">
            <label className="lab-slider">
              <span>Radius {state.radius}px</span>
              <input
                type="range"
                min={0}
                max={16}
                value={state.radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
            </label>
          </section>

          <div className="lab-actions">
            <button type="button" className="lab-action" onClick={reset}>
              <ArrowCounterClockwise size={14} weight="bold" />
              Reset
            </button>
            <button type="button" className="lab-action lab-action-primary" onClick={copyCss}>
              <FloppyDisk size={14} weight="duotone" />
              Copia CSS
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
