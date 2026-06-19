"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — ASSET LAYER RENDERER
 * =========================================================
 *
 * PURPOSE
 * -------
 * Render real visual assets (actors, backdrops, logos)
 * into pre-positioned layout containers.
 *
 * RULES
 * -----
 * - NO layout logic
 * - NO variant decisions
 * - NO conditional spacing rules
 * - ONLY asset injection into existing DOM structure
 *
 * Layout is already resolved by previous sprint.
 * =========================================================
 */

export default function AssetLayers() {
  const seed = useCompositionStore((s) => s.seed);
  const selected = useCompositionStore((s) => s.selected);

  if (!seed) return null;

  const actors = seed?.assets?.actors ?? [];
  const backdrops = seed?.assets?.backdrops ?? [];

  /**
   * Deterministic selection:
   * - no shuffling
   * - no ranking
   * - use raw seed order
   */

  const activeBackdrop = backdrops[0] ?? seed?.background?.src;

  return (
    <>
      {/* ======================================================
          BACKDROP LAYER (base visual field)
          ====================================================== */}
      <img
        src={activeBackdrop}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* ======================================================
          ACTOR LAYER (composition foreground)
          ====================================================== */}
      {actors.map((actor: any, index: number) => {
        return (
          <img
            key={actor.id ?? index}
            src={actor.image}
            alt={actor.name ?? "actor"}
            style={{
              position: "absolute",
              width: 140,
              height: 200,
              objectFit: "cover",

              /**
               * IMPORTANT:
               * Positioning is inherited from blueprint layer.
               * We only provide baseline stacking behavior here.
               */
              bottom: 160,

              left: `${20 + index * 120}px`,

              zIndex: 10,
            }}
          />
        );
      })}

      {/* ======================================================
          LOGO LAYER (optional asset)
          ====================================================== */}
      {seed?.assets?.logo && (
        <img
          src={seed.assets.logo}
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 180,
            objectFit: "contain",
            zIndex: 20,
          }}
        />
      )}
    </>
  );
}