"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";
import { variantMap } from "@/stage3/variants/variantMap";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT PANEL (REGISTRY DRIVEN)
 * =========================================================
 *
 * CHANGE (2026-06-19)
 * -------------------
 * - REMOVED hardcoded variant lists
 * - UI now reflects variantMap directly
 * - Prevents UI/domain drift permanently
 * =========================================================
 */

type Props = {
  seed: any;
};

export default function Stage3VariantPanel({ seed }: Props) {
  const selected = useCompositionStore((s) => s.selected);
  const selectVariant = useCompositionStore((s) => s.selectVariant);
  const cycleVariant = useCompositionStore((s) => s.cycleVariant);

  if (!seed) return null;

  const grouped = Object.entries(variantMap).reduce(
    (acc: Record<string, string[]>, [key, val]) => {
      const layer = val.layer;
      if (!acc[layer]) acc[layer] = [];
      acc[layer].push(key);
      return acc;
    },
    {}
  );

  const renderGroup = (title: string, layer: "actors" | "collage" | "logo") => {
    const options = grouped[layer] ?? [];

    return (
      <div style={{ marginBottom: 20, color: "white" }}>
        <div style={{ marginBottom: 8, fontSize: 14, opacity: 0.8 }}>
          {title}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {options.map((opt) => {
            const active = selected[layer] === opt;

            return (
              <button
                key={opt}
                onClick={() => selectVariant(layer, opt)}
                style={{
                  padding: "6px 10px",
                  fontSize: 12,
                  background: active ? "#fff" : "#222",
                  color: active ? "#000" : "#fff",
                  border: "1px solid #444",
                  cursor: "pointer",
                }}
              >
                {opt}
              </button>
            );
          })}

          <button
            onClick={() => selectVariant(layer, null)}
            style={{
              padding: "6px 10px",
              fontSize: 12,
              background: selected[layer] === null ? "#fff" : "#222",
              color: selected[layer] === null ? "#000" : "#fff",
              border: "1px solid #444",
              cursor: "pointer",
            }}
          >
            NONE
          </button>
        </div>

        <div style={{ marginTop: 6 }}>
          <button
            onClick={() => cycleVariant(layer, options)}
            style={{
              fontSize: 11,
              opacity: 0.6,
              background: "transparent",
              border: "none",
              color: "#aaa",
              cursor: "pointer",
            }}
          >
            cycle →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        width: 240,
        padding: 12,
        background: "rgba(0,0,0,0.7)",
        border: "1px solid #333",
        zIndex: 999,
      }}
    >
      {renderGroup("ACTORS", "actors")}
      {renderGroup("COLLAGE", "collage")}
      {renderGroup("LOGO", "logo")}
    </div>
  );
}