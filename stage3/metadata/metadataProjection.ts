"use client";

/**
 * =========================================================
 * METADATA PROJECTION
 * =========================================================
 *
 * Pure derivation layer.
 *
 * Converts canonical seed
 * into metadata renderer contract.
 *
 * NO UI
 * NO FETCHING
 * NO STATE
 * =========================================================
 */

export function projectMetadata(seed: any) {
  if (!seed) return null;

  return {
    rating:
      seed.ratings?.mpaa ??
      seed.ratings?.bbfc,

    runtime:
      seed.runtimeMinutes,

    resolution:
      seed.media?.resolution,

    cc:
      seed.media?.subtitles,

    qi: {
      imdbUrl:
        seed.metaAssets?.find(
          (x: any) =>
            x.type === "imdb"
        )?.src ?? null,

      tmdbUrl:
        seed.metaAssets?.find(
          (x: any) =>
            x.type === "tmdb"
        )?.src ?? null,
    },

    logo:
      seed.assets?.logo,

    jbIcon:
      "/assets/meta/jb/jb.png",
  };
}