import { resolveJellyfinAssets } from "@/lib/jellyfinAssets";

export function buildPosterDraft(movie: any, config: any) {
  const assetData = resolveJellyfinAssets(movie, config);

  return {
    movie: {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      overview: movie.overview,
      genres: movie.genres,
      rating: movie.rating,
    },

    config,

    // 🔥 CRITICAL: pre-resolved assets ONLY
    assets: assetData.assets,
    availability: assetData.availability,

    // editor state
    blocks: [],
  };
}
