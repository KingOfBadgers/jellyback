"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — CANVAS COMPOSITION RENDERER
 * =========================================================
 *
 * PURPOSE
 * ---
 * Renders the DVD-style BACK COVER composition (1500×1000)
 * using the Stage 3 canvas output from Stage3Compose.
 *
 * IMPORTANT RULES
 * ---
 * - NO metadata rendering
 * - NO UI widgets
 * - NO layout assumptions from browser UI
 * - PURE visual composition only
 *
 * This is the "poster engine".
 * =========================================================
 */

import React from "react";
import type { Stage3CanvasComposition } from "@/stage3/engine/Stage3Compose";

/**
 * =========================================================
 * PROPS
 * =========================================================
 */
type Props = {
  canvas: Stage3CanvasComposition;
};

/**
 * =========================================================
 * BACKGROUND LAYER
 * =========================================================
 */
function BackgroundLayer({ seed }: any) {
  const src = seed?.assets?.backdrops?.[0];

  if (!src) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: 12,
        }}
      >
        NO BACKDROP
      </div>
    );
  }

  return (
    <img
      src={src}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}

/**
 * =========================================================
 * ACTOR LAYER (SIMPLIFIED STAGE 3A VERSION)
 * =========================================================
 */
function ActorLayer({ seed }: any) {
  const actors = seed?.assets?.actors ?? [];

  if (!actors.length) return null;

  return (
    <>
      {actors.slice(0, 6).map((actor: string, i: number) => (
        <img
          key={i}
          src={actor}
          style={{
            position: "absolute",
            bottom: 0,
            left: 80 + i * 120,
            width: 180,
            height: 260,
            objectFit: "cover",
            filter: "contrast(1.05) saturate(1.1)",
          }}
        />
      ))}
    </>
  );
}

/**
 * =========================================================
 * COLLAGE LAYER (BACKDROP VARIATION ELEMENTS)
 * =========================================================
 */
function CollageLayer({ seed }: any) {
  const backdrops = seed?.assets?.backdrops ?? [];

  if (backdrops.length < 2) return null;

  return (
    <>
      {backdrops.slice(1, 4).map((img: string, i: number) => (
        <img
          key={i}
          src={img}
          style={{
            position: "absolute",
            top: 80 + i * 120,
            right: 60 + i * 40,
            width: 220,
            height: 140,
            objectFit: "cover",
            opacity: 0.85,
            transform: `rotate(${i * 2 - 2}deg)`,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      ))}
    </>
  );
}

/**
 * =========================================================
 * MAIN RENDERER
 * =========================================================
 */
export default function Stage3CanvasRenderer({ canvas }: Props) {
  const traceId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36);

  console.log("[STAGE3][CANVAS][RENDER]", {
    traceId,
    movieId: canvas.movieId,
    variant: canvas.variant,
    actorCount: canvas.actorCount,
    backdropCount: canvas.backdropCount,
  });

  /**
   * =========================================================
   * BASE CANVAS (DVD BACK COVER FRAME)
   * =========================================================
   */
  const baseStyle: React.CSSProperties = {
    width: 1500,
    height: 1000,

    position: "relative",
    overflow: "hidden",

    background: "#000",

    boxSizing: "border-box",
  };

  /**
   * =========================================================
   * RENDER
   * =========================================================
   */
  return (
    <div style={baseStyle}>
      <BackgroundLayer seed={canvas.seed} />
      <CollageLayer seed={canvas.seed} />
      <ActorLayer seed={canvas.seed} />

      {/* DEBUG OVERLAY (SAFE VISIBILITY MARKER) */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          fontSize: 12,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "monospace",
        }}
      >
        STAGE3 CANVAS • {canvas.variant}
      </div>
    </div>
  );
}