"use client";

import React from "react";
import { resolveBackground } from "@/stage3/engine/backgroundResolver";
import AssetLayers from "@/stage3/renderer/AssetLayers";

type Props = {
  seed: any;
};

/**
 * =========================================================
 * JELLYBACK STAGE 3 — CANVAS SHELL (UPDATED)
 * =========================================================
 *
 * PURPOSE
 * -------
 * Defines fixed canvas + zones:
 *
 * - Background layer
 * - Asset rendering layer (Sprint 2.5)
 * - Metadata bar placeholder (Sprint 3+)
 *
 * RULES
 * -----
 * - NO logic
 * - NO layout decisions
 * - ONLY composition structure
 * =========================================================
 */

export default function Stage3CanvasShell({ seed }: Props) {
  const background = resolveBackground(seed);

  return (
    <div
      style={{
        width: 1000,
        height: 1500,
        backgroundColor: "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ======================================================
          ART ZONE BACKGROUND
          ====================================================== */}
      <div
        style={{
          width: "100%",
          height: "1350px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={background}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* ======================================================
            SPRING 2.5 — ASSET LAYERS
            ====================================================== */}
        <AssetLayers />
      </div>

      {/* ======================================================
          METADATA BAR (SPRINT 3 PLACEHOLDER)
          ====================================================== */}
      <div
        style={{
          width: "100%",
          height: "150px",
          background: "#111",
          position: "relative",
          zIndex: 10,
        }}
      />
    </div>
  );
}