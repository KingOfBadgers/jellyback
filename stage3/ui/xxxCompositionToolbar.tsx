"use client";

import { useMemo } from "react";

import { useCompositionStore } from "@/stage3/store/compositionStore";

import { buildVariantMatrix } from "@/stage3/composition/buildVariantMatrix";

/**
 * =========================================================
 * JELLYBACK STAGE 3
 * COMPOSITION TOOLBAR
 * (SPRINT 5 STABILITY FIX — 2026-06-18 BST)
 * =========================================================
 */

export default function CompositionToolbar() {
  console.log("[STAGE3][TOOLBAR] MOUNT/RENDER");

  /**
   * =========================================================
   * STORE STATE
   * =========================================================
   */
  const seed = useCompositionStore((s) => s.seed);

  const active = useCompositionStore((s) => s.active);

  const setActiveIndex = useCompositionStore((s) => s.setActiveIndex);

  /**
   * =========================================================
   * FIX 2026-06-18 BST
   * =========================================================
   *
   * Reason:
   * Store currently contains mixed type values:
   * - valid: number index
   * - invalid: string IDs (e.g. "collage-none")
   *
   * This guard prevents UI crash while store stabilises.
   */
  const safeIndex = (value: any): number => {
    if (typeof value === "number" && !Number.isNaN(value)) {
      return value;
    }

    console.warn("[STAGE3][TOOLBAR][TYPE_GUARD] Invalid index detected:", value);

    return 0;
  };

  /**
   * =========================================================
   * MATRIX BUILD
   * =========================================================
   */
  const matrix = useMemo(() => {
    if (!seed) {
      console.log("[STAGE3][TOOLBAR] NO SEED — MATRIX SKIP");
      return null;
    }

    console.log("[STAGE3][TOOLBAR] BUILD MATRIX");

    return buildVariantMatrix(seed);
  }, [seed]);

  /**
   * =========================================================
   * GUARD CLAUSE
   * =========================================================
   */
  if (!matrix) {
    console.log("[STAGE3][TOOLBAR] NO MATRIX");
    return null;
  }

  /**
   * =========================================================
   * SAFE ACTIVE RESOLUTION (PATCHED)
   * =========================================================
   */
  const activeCollage =
    matrix.collage?.[safeIndex(active.collage)];

  const activeActors =
    matrix.actors?.[safeIndex(active.actors)];

  const activeBackdrop =
    matrix.backdrop?.[safeIndex(active.backdrop)];

  console.log("[STAGE3][TOOLBAR] RENDER STATE", {
    collage: activeCollage?.id,
    actors: activeActors?.id,
    backdrop: activeBackdrop?.id,
    activeIndexes: active,
  });

  /**
   * =========================================================
   * INDEX UPDATE WRAPPER
   * =========================================================
   */
  const handleSetIndex = (
    layer: "collage" | "actors" | "backdrop",
    index: number
  ) => {
    console.log("[STAGE3][TOOLBAR][SET_INDEX]", {
      layer,
      index,
    });

    setActiveIndex(layer, index);
  };

  /**
   * =========================================================
   * GROUP RENDERER
   * =========================================================
   */
  const renderGroup = (
    label: string,
    layer: "collage" | "actors" | "backdrop",
    items: any[],
    activeItem: any,
    activeIndex: number
  ) => {
    return (
      <div>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
          {label}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <button
            onClick={() => {
              const next =
                activeIndex - 1 < 0
                  ? items.length - 1
                  : activeIndex - 1;

              handleSetIndex(layer, next);
            }}
          >
            ◀
          </button>

          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {activeItem?.label ?? "None"}
          </div>

          <button
            onClick={() => {
              const next = (activeIndex + 1) % items.length;
              handleSetIndex(layer, next);
            }}
          >
            ▶
          </button>
        </div>
      </div>
    );
  };

  /**
   * =========================================================
   * UI
   * =========================================================
   */
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        width: 340,
        background: "rgba(20,20,20,0.95)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 12,
        padding: 16,
        zIndex: 99999,
        color: "#fff",
        fontFamily: "sans-serif",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>
        Stage 3 Composition
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {renderGroup(
          "Collage",
          "collage",
          matrix.collage,
          activeCollage,
          safeIndex(active.collage)
        )}

        {renderGroup(
          "Background",
          "backdrop",
          matrix.backdrop,
          activeBackdrop,
          safeIndex(active.backdrop)
        )}

        {renderGroup(
          "Actor Layout",
          "actors",
          matrix.actors,
          activeActors,
          safeIndex(active.actors)
        )}
      </div>

      <div
        style={{
          marginTop: 10,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: 11,
          opacity: 0.45,
          lineHeight: 1.8,
        }}
      >
        Upcoming:
        <br />
        • Metadata Variants
        <br />
        • Logo Variants
        <br />
        • Style Treatments
        <br />
        • Export Pipeline
      </div>
    </div>
  );
}