import type { VariantOption } from "./types/VariantOption";

/**
 * =========================================================
 * JELLYBACK STAGE 3
 * COLLAGE VARIANT GENERATOR (V1 MIGRATED)
 * =========================================================
 */

export function generateCollageVariants(seed: any): VariantOption[] {
  const backdrops = seed?.assets?.backdrops || [];
  const actors = seed?.assets?.actors || [];

  console.log("[STAGE3][COLLAGE][GENERATOR] START", {
    movieId: seed?.movieId,
    backdrops: backdrops.length,
    actors: actors.length,
  });

  /**
   * =====================================================
   * CANDIDATE VARIANTS (UNFILTERED TRUTH SET)
   * =====================================================
   */
  const candidates: VariantOption[] = [
    {
      id: "collage-edge-stack",
      label: "Edge Stack",
      layer: "collage",
      layoutId: "EDGE_STACK",
      requires: {
        minBackdrops: 1,
      },
      group: "core",
      renderMode: "css",
    },

    {
      id: "collage-polaroid-single",
      label: "Polaroid Single",
      layer: "collage",
      layoutId: "POLAROID_SINGLE",
      requires: {
        minBackdrops: 1,
      },
      group: "editorial",
      renderMode: "canvas",
    },

    {
      id: "collage-polaroid-pile",
      label: "Polaroid Pile",
      layer: "collage",
      layoutId: "POLAROID_PILE",
      requires: {
        minBackdrops: 2,
      },
      group: "editorial",
      renderMode: "canvas",
    },

    {
      id: "collage-film-strip",
      label: "Film Strip",
      layer: "collage",
      layoutId: "FILM_STRIP",
      requires: {
        minBackdrops: 5,
      },
      group: "cinematic",
      renderMode: "canvas",
      placement: "bottom",
    },
  ];

  /**
   * =====================================================
   * FILTERING STEP (NO UI LOGIC, ONLY VALIDATION)
   * =====================================================
   */
  const filtered = candidates.filter((v) => {
    const okBackdrops =
      v.requires.minBackdrops === undefined ||
      backdrops.length >= v.requires.minBackdrops;

    const okActors =
      v.requires.minActors === undefined ||
      actors.length >= v.requires.minActors;

    return okBackdrops && okActors;
  });

  console.log("[STAGE3][COLLAGE][GENERATOR] RESULT", {
    input: candidates.length,
    output: filtered.length,
  });

  return filtered;
}