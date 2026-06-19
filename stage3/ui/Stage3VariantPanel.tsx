"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT PANEL (UI ONLY)
 * =========================================================
 *
 * PURPOSE
 * -------
 * User-facing control surface for selecting precomputed
 * composition variants.
 *
 * RULES
 * -----
 * - NO layout logic
 * - NO filtering logic
 * - NO rendering decisions
 * - ONLY selection + display
 *
 * This is a "dumb controller surface"
 * =========================================================
 */

type Variant = {
  id: string;
  label: string;
};

type Props = {
  title: string;
  variants: Variant[];
  selected: string | null;
  layer: "actors" | "collage" | "logo";
};

export default function Stage3VariantPanel({
  title,
  variants,
  selected,
  layer,
}: Props) {
  const selectVariant = useCompositionStore(
    (s) => s.selectVariant
  );

  const cycleVariant = useCompositionStore(
    (s) => s.cycleVariant
  );

  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        top: 20,
        width: 220,
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: 12,
        color: "white",
        fontSize: 12,
        fontFamily: "sans-serif",
        userSelect: "none",
      }}
    >
      {/* TITLE */}
      <div
        style={{
          marginBottom: 10,
          opacity: 0.8,
          fontSize: 11,
        }}
      >
        {title}
      </div>

      {/* VARIANT LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {variants.map((v) => {
          const isActive = v.id === selected;

          return (
            <button
              key={v.id}
              onClick={() => selectVariant(layer, v.id)}
              style={{
                padding: "6px 8px",
                background: isActive
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                cursor: "pointer",
                textAlign: "left",
                fontSize: 11,
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* CYCLE CONTROL (UI convenience only) */}
      {variants.length > 0 && (
        <button
          onClick={() =>
            cycleVariant(
              layer,
              variants.map((v) => v.id)
            )
          }
          style={{
            marginTop: 10,
            width: "100%",
            padding: "6px 8px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          Cycle
        </button>
      )}

      {/* NONE OPTION (EXPLICIT RULE COMPLIANCE) */}
      <button
        onClick={() => selectVariant(layer, null)}
        style={{
          marginTop: 6,
          width: "100%",
          padding: "6px 8px",
          background: "rgba(255,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          cursor: "pointer",
          fontSize: 11,
        }}
      >
        None
      </button>
    </div>
  );
}