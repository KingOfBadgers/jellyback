"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";
import { resolveVariantEligibility } from "@/stage3/engine/variant/resolveVariantEligibility";
import {
  getTreatmentsForLayer,
} from "@/stage3/treatments/treatmentRegistry";

/**
 * =========================================================
 * STAGE 3 — VARIANT + TREATMENT PANEL
 * =========================================================
 *
 * CHANGE LOG
 * ---------------------------------------------------------
 * DATE: 2026-06-23
 * TIME: 08:25
 *
 * CHANGE:
 * ---------------------------------------------------------
 * Added explicit USER-CONTROLLED treatment selection UI.
 *
 * Previous architecture:
 *
 *    variant → automatic treatment mapping
 *
 * This violated:
 *
 *    JELLYBACK LAW 1
 *
 * New architecture:
 *
 *    user chooses variants
 *    user chooses treatments
 *
 * NO hidden intelligence permitted.
 *
 * NON-CHANGED:
 * ---------------------------------------------------------
 * Variant eligibility logic unchanged.
 * Toolbar remains decoupled from canvas.
 * Existing variant cycling preserved.
 * Existing logging preserved.
 * =========================================================
 */

/**
 * =========================================================
 * INTERNAL PURE PANEL
 * =========================================================
 */

function VariantPanelCore({ seed }: any) {
  const selected = useCompositionStore((s) => s.selected);
  const treatments = useCompositionStore((s) => s.treatments);

  const selectVariant = useCompositionStore(
    (s) => s.selectVariant
  );

  const cycleVariant = useCompositionStore(
    (s) => s.cycleVariant
  );

  /**
   * NEW
   */

  const selectTreatment = useCompositionStore(
    (s) => s.selectTreatment
  );

  const cycleTreatment = useCompositionStore(
    (s) => s.cycleTreatment
  );

  if (!seed) {
    console.log(
      "[STAGE3][PANEL] No seed provided"
    );
    return null;
  }

  const eligibility =
    resolveVariantEligibility(seed);

  console.log(
    "[STAGE3][PANEL ELIGIBILITY FULL OBJECT]",
    eligibility
  );

  /**
   * =====================================================
   * VARIANT GROUP RENDERER
   * =====================================================
   */

  const renderVariantGroup = (
    title: string,
    layer: keyof typeof eligibility
  ) => {
    const options = eligibility[layer];

    console.log(
      "[STAGE3][VARIANT GROUP RENDER]",
      {
        layer,
        optionCount: options?.length,
      }
    );

    return (
      <div
        style={{
          marginBottom: 24,
          color: "white",
        }}
      >
        <div
          style={{
            marginBottom: 8,
            fontSize: 14,
            opacity: 0.8,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {options.map((opt) => {
            const active =
              selected[layer] === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  console.log(
                    "[STAGE3][SELECT VARIANT]",
                    {
                      layer,
                      id: opt.id,
                    }
                  );

                  selectVariant(
                    layer,
                    opt.id
                  );
                }}
                style={{
                  padding: "6px 10px",
                  fontSize: 12,
                  background: active
                    ? "#fff"
                    : "#222",
                  color: active
                    ? "#000"
                    : "#fff",
                  border:
                    "1px solid #444",
                  cursor: "pointer",
                }}
              >
                {opt.displayName}
              </button>
            );
          })}

          <button
            onClick={() => {
              console.log(
                "[STAGE3][SELECT VARIANT] NONE",
                { layer }
              );

              selectVariant(
                layer,
                null
              );
            }}
            style={{
              padding: "6px 10px",
              fontSize: 12,
              background:
                selected[layer] ===
                null
                  ? "#fff"
                  : "#222",

              color:
                selected[layer] ===
                null
                  ? "#000"
                  : "#fff",

              border:
                "1px solid #444",

              cursor: "pointer",
            }}
          >
            NONE
          </button>
        </div>

        <div
          style={{
            marginTop: 6,
          }}
        >
          <button
            onClick={() => {
              console.log(
                "[STAGE3][CYCLE VARIANT]",
                {
                  layer,
                  options:
                    options.map(
                      (o) => o.id
                    ),
                }
              );

              cycleVariant(
                layer,
                options.map(
                  (o) => o.id
                )
              );
            }}
            style={{
              fontSize: 11,
              opacity: 0.6,
              background:
                "transparent",

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

  /**
   * =====================================================
   * TREATMENT GROUP RENDERER
   * =====================================================
   */

  const renderTreatmentGroup = (
    title: string,
    layer:
      | "actors"
      | "collage"
      | "logo"
  ) => {
    const options =
      getTreatmentsForLayer(layer);

    console.log(
      "[STAGE3][TREATMENT GROUP RENDER]",
      {
        layer,
        optionCount: options.length,
      }
    );

    return (
      <div
        style={{
          marginBottom: 24,
          color: "white",
        }}
      >
        <div
          style={{
            marginBottom: 8,
            fontSize: 14,
            opacity: 0.8,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {options.map((opt) => {
            const active =
              treatments[layer] ===
              opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  console.log(
                    "[STAGE3][SELECT TREATMENT]",
                    {
                      layer,
                      id: opt.id,
                    }
                  );

                  selectTreatment(
                    layer,
                    opt.id
                  );
                }}
                style={{
                  padding: "6px 10px",
                  fontSize: 12,
                  background: active
                    ? "#fff"
                    : "#222",
                  color: active
                    ? "#000"
                    : "#fff",
                  border:
                    "1px solid #444",
                  cursor: "pointer",
                }}
              >
                {opt.displayName}
              </button>
            );
          })}

          <button
            onClick={() => {
              console.log(
                "[STAGE3][SELECT TREATMENT] NONE",
                { layer }
              );

              selectTreatment(
                layer,
                null
              );
            }}
            style={{
              padding: "6px 10px",
              fontSize: 12,

              background:
                treatments[layer] ===
                null
                  ? "#fff"
                  : "#222",

              color:
                treatments[layer] ===
                null
                  ? "#000"
                  : "#fff",

              border:
                "1px solid #444",

              cursor: "pointer",
            }}
          >
            NONE
          </button>
        </div>

        <div
          style={{
            marginTop: 6,
          }}
        >
          <button
            onClick={() => {
              console.log(
                "[STAGE3][CYCLE TREATMENT]",
                {
                  layer,
                  options:
                    options.map(
                      (o) => o.id
                    ),
                }
              );

              cycleTreatment(
                layer,
                options.map(
                  (o) => o.id
                )
              );
            }}
            style={{
              fontSize: 11,
              opacity: 0.6,
              background:
                "transparent",
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
      {/* ================= VARIANTS ================= */}

      <div
        style={{
          marginBottom: 30,
          borderBottom:
            "1px solid #333",
          paddingBottom: 16,
        }}
      >
        <div
          style={{
            color: "#999",
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          VARIANTS
        </div>

        {renderVariantGroup(
          "ACTORS",
          "actors"
        )}

        {renderVariantGroup(
          "LOGO",
          "logo"
        )}

        {renderVariantGroup(
          "COLLAGE",
          "collage"
        )}
      </div>

      {/* ================= TREATMENTS ================= */}

      <div>
        <div
          style={{
            color: "#999",
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          TREATMENTS
        </div>

        {renderTreatmentGroup(
          "ACTOR TREATMENT",
          "actors"
        )}

        {renderTreatmentGroup(
          "LOGO TREATMENT",
          "logo"
        )}

        {renderTreatmentGroup(
          "COLLAGE TREATMENT",
          "collage"
        )}
      </div>
    </>
  );
}

/**
 * =========================================================
 * EXTERNAL TOOLBAR WRAPPER
 * =========================================================
 */

export default function Stage3VariantPanel({
  seed,
}: any) {
  console.log(
    "[STAGE3][PANEL WRAPPER MOUNT]"
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        width: 320,

        padding: 12,

        background:
          "rgba(0,0,0,0.75)",

        border:
          "1px solid #333",

        zIndex: 9999,
      }}
    >
      <VariantPanelCore
        seed={seed}
      />
    </div>
  );
}