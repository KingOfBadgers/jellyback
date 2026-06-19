/**
 * =========================================================
 * JELLYBACK STAGE 3
 * BACKGROUND VARIANT GENERATOR (V1 SCHEMA LOCKED)
 * =========================================================
 *
 * PURPOSE
 * -------
 * Defines how the SINGLE canonical backdrop
 * should be visually treated.
 *
 * RULE
 * ----
 * No new image sources.
 * No mutation.
 * No rendering logic.
 *
 * Only "treatments" of the same asset.
 */

import type { VariantOption } from "./VariantOption";

export function generateBackdropVariants(seed: any): VariantOption[] {
  const backdrops = seed?.assets?.backdrops || [];

  console.log("[STAGE3][BACKDROP][GENERATOR] START", {
    movieId: seed?.movieId,
    backdropCount: backdrops.length,
  });

  /**
   * =========================================================
   * NO BACKDROPS = NO VARIANTS (STRICT RULE)
   * =========================================================
   */
  if (!backdrops.length) {
    console.log("[STAGE3][BACKGROUND][GENERATOR] NO BACKDROPS - RETURN EMPTY");
    return [];
  }

  /**
   * =========================================================
   * CANDIDATE TREATMENTS (NON-DESTRUCTIVE)
   * =========================================================
   */
  const candidates: VariantOption[] = [
    {
      id: "backdrop-full-bleed",
      label: "Full Bleed",
      layer: "backdrop",
      group: "core",
      renderMode: "css",
      layoutId: "FULL_BLEED",
    },

    {
      id: "backdrop-darken-cinema",
      label: "Dark Cinema",
      layer: "backdrop",
      group: "cinematic",
      renderMode: "css",
      layoutId: "DARKEN_CINEMA",
    },

    {
      id: "backdrop-blur-depth",
      label: "Blur Depth",
      layer: "backdrop",
      group: "cinematic",
      renderMode: "css",
      layoutId: "BLUR_DEPTH",
    },

    {
      id: "backdrop-poster-zoom",
      label: "Poster Zoom",
      layer: "backdrop",
      group: "editorial",
      renderMode: "css",
      layoutId: "POSTER_ZOOM",
    },
  ];

  /**
   * =========================================================
   * FILTER STEP (AS PER ARCHITECTURE LAW)
   * =========================================================
   * Only show valid options if at least 1 backdrop exists.
   */
  const filtered = candidates.filter(() => true);

  console.log("[STAGE3][BACKGROUND][GENERATOR] RESULT", {
    input: candidates.length,
    output: filtered.length,
  });

  return filtered;
}