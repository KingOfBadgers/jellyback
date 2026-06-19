export function buildSeed(movieId: string, backgroundSrc: string) {
  console.log("[SeedBuilder] Building seed for:", movieId);

  const seed = {
    metadata: {
      mpaa: undefined,
      bbfc: undefined,
      resolution: undefined,
      runtime: undefined,
      subtitles: undefined
    },

    background: {
      src: backgroundSrc || ""
    },

    /**
     * FIX:
     * Align naming with Border system (metaAssets)
     * NOT metadataAssets
     */
    metaAssets: []
  };

  console.log("[SeedBuilder] Seed created:", seed);

  return seed;
}