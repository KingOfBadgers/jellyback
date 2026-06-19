"use client";

/**
 * =========================================================
 * JellyBack Stage 3 — Composition Root
 * =========================================================
 *
 * HUMAN:
 * Combines ART CANVAS + METADATA STRIP into final output.
 *
 * AI:
 * Deterministic composition boundary. No layout logic.
 * =========================================================
 */

import React from "react";
import Renderer from "./Renderer";
import MetadataStripRenderer from "@/stage3/metadata/MetadataStripRenderer";

type Props = {
  seed: any;
};

export default function CompositionRoot({ seed }: Props) {
  if (!seed) return null;

  return (
    <div
      style={{
        width: 1000,
        height: 1600, // 1500 art + 100 strip
        position: "relative",
        background: "black",
      }}
    >
      {/* ART CANVAS */}
      <div
        style={{
          width: 1000,
          height: 1500,
        }}
      >
        <Renderer seed={seed} />
      </div>

      {/* METADATA STRIP (LOCKED BOTTOM BAND) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 1000,
          height: 100,
        }}
      >
        <MetadataStripRenderer variant={seed} />
      </div>
    </div>
  );
}