"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSITE VIEW (PREVIEW SURFACE)
 * =========================================================
 *
 * PURPOSE
 * ---
 * Displays the final Stage 3 output as the user will see it:
 *
 *   Canvas (DVD back cover)
 *   +
 *   Metadata Strip (DVD bottom bar)
 *
 * IMPORTANT RULES
 * ---
 * - NO composition logic
 * - NO transformation of seed
 * - NO UI editing capabilities
 * - PURE visual stacking of Stage 3 outputs
 *
 * This is the "projection screen" for Stage 3.
 * =========================================================
 */

import React from "react";
import Stage3CanvasRenderer from "@/stage3/renderer/canvas/Stage3CanvasRenderer";
import Stage3MetadataStripRenderer from "@/stage3/renderer/metadata/Stage3MetadataStripRenderer";

import type { Stage3Output } from "@/stage3/engine/Stage3Compose";

/**
 * =========================================================
 * PROPS
 * =========================================================
 */
type Props = {
  output: Stage3Output;
};

/**
 * =========================================================
 * COMPOSITE VIEW
 * =========================================================
 */
export default function Stage3CompositeView({ output }: Props) {
  const traceId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36);

  console.log("[STAGE3][COMPOSITE][RENDER]", {
    traceId,
    movieId: output.movieId,
    canvasVariant: output.canvas.variant,
    metadataVariant: output.metadataStrip.variant,
    metadataSlots: output.metadataStrip.slots.length,
  });

  /**
   * =========================================================
   * SCALE WRAPPER (SAFE PREVIEW SCALING ONLY)
   * =========================================================
   *
   * IMPORTANT:
   * This scaling is ONLY for preview convenience.
   * It does NOT affect composition logic.
   */
  const wrapperStyle: React.CSSProperties = {
    width: "100vw",
    height: "100vh",

    background: "black",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
    gap: 0,
  };

  /**
   * =========================================================
   * CANVAS SCALE
   * =========================================================
   */
  const canvasScaleStyle: React.CSSProperties = {
    transform: "scale(0.6)",
    transformOrigin: "center",
  };

  /**
   * =========================================================
   * METADATA SCALE
   * =========================================================
   */
  const metadataScaleStyle: React.CSSProperties = {
    transform: "scale(0.6)",
    transformOrigin: "center",
  };

  /**
   * =========================================================
   * RENDER
   * =========================================================
   */
  return (
    <div style={wrapperStyle}>
      {/* =========================
          CANVAS (DVD BACK COVER)
          ========================= */}
      <div style={canvasScaleStyle}>
        <Stage3CanvasRenderer canvas={output.canvas} />
      </div>

      {/* =========================
          METADATA STRIP (DVD BAR)
          ========================= */}
      <div style={metadataScaleStyle}>
        <Stage3MetadataStripRenderer plan={output.metadataStrip} />
      </div>

      {/* =========================
          DEBUG OVERLAY
          ========================= */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          fontSize: 12,
          color: "rgba(255,255,255,0.4)",
          fontFamily: "monospace",
        }}
      >
        STAGE3 COMPOSITE • {output.movieId}
      </div>
    </div>
  );
}