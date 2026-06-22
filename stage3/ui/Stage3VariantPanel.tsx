"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";
import { resolveVariantEligibility } from "@/stage3/engine/variant/resolveVariantEligibility";

/**
 * =========================================================
 * STAGE 3 — VARIANT PANEL (REFACTORED: TOOLBAR EXTRACTED)
 * =========================================================
 *
 * CHANGE LOG:
 * ---------------------------------------------------------
 * DATE: 2026-06-22
 * TIME: 07:00 (approx execution reference)
 *
 * CHANGE:
 * - Extracted UI control panel OUTSIDE canvas positioning layer
 * - Original panel no longer acts as absolute overlay inside composition canvas
 * - Introduced fixed TOOLBAR container decoupled from render surface
 *
 * REASON:
 * - Canvas must remain pure Stage 3 render surface (deterministic only)
 * - UI must not participate in composition coordinate space
 * - Prevent accidental overlap between rendering system and controls
 *
 * NON-CHANGED RULES:
 * - Variant eligibility remains unchanged
 * - Store interaction remains unchanged
 * - No layout intelligence added
 * =========================================================
 */

/**
 * INTERNAL PURE PANEL (no positioning responsibility)
 * This is now a PURE renderer fragment.
 */
function VariantPanelCore({ seed }: any) {
  const selected = useCompositionStore((s) => s.selected);
  const selectVariant = useCompositionStore((s) => s.selectVariant);
  const cycleVariant = useCompositionStore((s) => s.cycleVariant);

  if (!seed) {
    console.log("[STAGE3][VARIANT PANEL CORE] No seed provided");
    return null;
  }

  const eligibility = resolveVariantEligibility(seed);

  console.log("[STAGE3][PANEL ELIGIBILITY FULL OBJECT]", eligibility);
  console.log("[STAGE3][PANEL ACTOR OPTIONS]", eligibility.actors);

  const renderGroup = (
    title: string,
    layer: keyof typeof eligibility
  ) => {
    const options = eligibility[layer];

    console.log("[STAGE3][VARIANT PANEL GROUP RENDER]", {
      layer,
      optionCount: options?.length,
    });

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
                onClick={() => {
                  console.log("[STAGE3][SELECT VARIANT]", {
                    layer,
                    id: opt.id,
                  });
                  selectVariant(layer, opt.id);
                }}
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
            onClick={() => {
              console.log("[STAGE3][SELECT VARIANT] NONE", { layer });
              selectVariant(layer, null);
            }}
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
            onClick={() => {
              console.log("[STAGE3][CYCLE VARIANT]", {
                layer,
                options: options.map((o) => o.id),
              });
              cycleVariant(layer, options.map((o) => o.id));
            }}
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
    <>
      {renderGroup("ACTORS", "actors")}
      {renderGroup("LOGO", "logo")}
      {renderGroup("COLLAGE", "collage")}
    </>
  );
}

/**
 * =========================================================
 * EXTERNAL TOOLBAR WRAPPER (NEW LAYER)
 * =========================================================
 *
 * PURPOSE:
 * - Removes control panel from canvas coordinate system
 * - Ensures UI is not affected by composition scaling rules
 * - Keeps Stage 3 canvas strictly 1000x1500 deterministic space
 *
 * POSITIONING:
 * - Fixed overlay outside canvas wrapper
 * - Independent of render surface transform
 * =========================================================
 */

export default function Stage3VariantPanel({ seed }: any) {
  console.log("[STAGE3][VARIANT PANEL WRAPPER MOUNT]");

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        width: 260,
        padding: 12,
        background: "rgba(0,0,0,0.75)",
        border: "1px solid #333",
        zIndex: 9999,

        /**
         * CRITICAL:
         * This ensures UI is NOT influenced by canvas scaling
         * or composition viewport transforms.
         */
      }}
    >
      <VariantPanelCore seed={seed} />
    </div>
  );
}