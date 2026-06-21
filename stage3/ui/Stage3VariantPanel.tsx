"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";
import { resolveVariantEligibility } from "@/stage3/engine/variant/resolveVariantEligibility";

/**
 * =========================================================
 * STAGE 3 — VARIANT PANEL (PURE ELIGIBILITY RENDERER)
 * =========================================================
 *
 * RULES:
 * ---------------------------------------------------------
 * - NO seed logic
 * - NO registry scanning
 * - NO conditional variant building
 * - NO display name logic
 *
 * INPUT:
 *   eligibility contract ONLY
 * =========================================================
 */

export default function Stage3VariantPanel({ seed }: any) {
  const selected = useCompositionStore((s) => s.selected);
  const selectVariant = useCompositionStore((s) => s.selectVariant);
  const cycleVariant = useCompositionStore((s) => s.cycleVariant);

  if (!seed) return null;

  const eligibility = resolveVariantEligibility(seed);

  const renderGroup = (
    title: string,
    layer: keyof typeof eligibility
  ) => {
    const options = eligibility[layer];

    return (
      <div style={{ marginBottom: 20, color: "white" }}>
        <div style={{ marginBottom: 8, fontSize: 14, opacity: 0.8 }}>
          {title}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {options.map((opt) => {
            const active = selected[layer] === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => selectVariant(layer, opt.id)}
                style={{
                  padding: "6px 10px",
                  fontSize: 12,
                  background: active ? "#fff" : "#222",
                  color: active ? "#000" : "#fff",
                  border: "1px solid #444",
                  cursor: "pointer",
                }}
              >
                {opt.displayName}
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
            onClick={() =>
              cycleVariant(layer, options.map((o) => o.id))
            }
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
      {renderGroup("LOGO", "logo")}
      {renderGroup("COLLAGE", "collage")}
    </div>
  );
}