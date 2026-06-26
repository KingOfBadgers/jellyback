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
 * REVISED: 2026-06-24
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Updated for category-based treatment architecture.
 *
 * OLD:
 *
 *   layer → treatment
 *
 * NEW:
 *
 *   layer → category → treatment
 *
 * Example:
 *
 *   actors.edges = softEdges
 *   actors.depth = depthFloat
 *
 * FIXES
 * ---------------------------------------------------------
 * - Removed dead cycle treatment logic
 * - NONE now clears ALL categories
 * - Active highlighting corrected
 *
 * =========================================================
 */

function VariantPanelCore({ seed }: any) {
  const selected = useCompositionStore((s) => s.selected);

  const treatments = useCompositionStore(
    (s) => s.treatments
  );

  const selectVariant = useCompositionStore(
    (s) => s.selectVariant
  );

  const selectTreatment = useCompositionStore(
    (s) => s.selectTreatment
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
   * CLEAR ALL TREATMENTS FOR LAYER
   * =====================================================
   */

  function clearAllLayerTreatments(
    layer:
      | "actors"
      | "collage"
      | "logo"
  ) {
    const layerTreatments =
      treatments[layer];

    Object.keys(
      layerTreatments
    ).forEach((category) => {
      console.log(
        "[STAGE3][CLEAR TREATMENT]",
        {
          layer,
          category,
        }
      );

      selectTreatment(
        layer,
        category as any,
        null
      );
    });
  }

  /**
   * =====================================================
   * VARIANT RENDERER
   * =====================================================
   */

  const renderVariantGroup = (
    title: string,
    layer: keyof typeof eligibility
  ) => {
    const options = eligibility[layer];

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
              selected[layer] ===
              opt.id;

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

                  background:
                    active
                      ? "#fff"
                      : "#222",

                  color: active
                    ? "#000"
                    : "#fff",

                  border:
                    "1px solid #444",

                  cursor:
                    "pointer",
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

              cursor:
                "pointer",
            }}
          >
            NONE
          </button>
        </div>
      </div>
    );
  };

  /**
   * =====================================================
   * TREATMENT RENDERER
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
      getTreatmentsForLayer(
        layer
      );

    const noActiveTreatments =
      Object.values(
        treatments[layer] || {}
      ).every(
        (value) =>
          value === null
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
              treatments[
                layer
              ]?.[
                opt.category
              ] === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  console.log(
                    "[STAGE3][SELECT TREATMENT]",
                    {
                      layer,
                      category:
                        opt.category,
                      id: opt.id,
                    }
                  );

                  selectTreatment(
                    layer,
                    opt.category,
                    opt.id
                  );
                }}
                style={{
                  padding: "6px 10px",
                  fontSize: 12,

                  background:
                    active
                      ? "#fff"
                      : "#222",

                  color: active
                    ? "#000"
                    : "#fff",

                  border:
                    "1px solid #444",

                  cursor:
                    "pointer",
                }}
              >
                {opt.displayName}
              </button>
            );
          })}

          <button
            onClick={() => {
              console.log(
                "[STAGE3][CLEAR ALL TREATMENTS]",
                { layer }
              );

              clearAllLayerTreatments(
                layer
              );
            }}
            style={{
              padding: "6px 10px",
              fontSize: 12,

              background:
                noActiveTreatments
                  ? "#fff"
                  : "#222",

              color:
                noActiveTreatments
                  ? "#000"
                  : "#fff",

              border:
                "1px solid #444",

              cursor:
                "pointer",
            }}
          >
            NONE
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
 * WRAPPER
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