"use client";

import React from "react";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — CANVAS VIEWPORT
 * =========================================================
 *
 * PURPOSE
 * -------
 * Responsible ONLY for user-friendly display of the
 * fixed 1000x1500 composition canvas.
 *
 * THIS COMPONENT MUST NEVER:
 * - modify composition
 * - modify seed
 * - influence layout
 * - participate in variant logic
 *
 * It is a PURE presentation shell.
 *
 * =========================================================
 *
 * CHANGE LOG
 * ----------
 * 2026-06-19
 * Initial viewport layer introduced to decouple:
 * - composition space (1000x1500)
 * - display space (responsive scaling)
 *
 * =========================================================
 */

type Props = {
  children: React.ReactNode;
};

export default function CanvasViewport({ children }: Props) {
  /**
   * Scale strategy:
   * We compute a safe fit scale based on viewport height.
   *
   * This ensures:
   * - full canvas always visible
   * - no distortion of composition coordinates
   */
console.log("[PIPELINE] CanvasViewport ACTIVE");
  const scale =
    typeof window !== "undefined"
      ? Math.min(window.innerWidth / 1000, window.innerHeight / 1500, 1)
      : 1;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      {/* SCALE WRAPPER (visual only) */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          width: "1000px",
          height: "1500px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {children}
      </div>
    </div>
  );
}