/**
 * Stage 2 → Stage 2.5 Boundary Function
 * --------------------------------------
 *
 * This is the ONLY place in the system where Jellyfin data is converted
 * into JellyBack-native data.
 *
 * After this point:
 * - NO Jellyfin calls are allowed
 * - NO Jellyfin assumptions exist
 * - ALL data is owned by JellyBack
 *
 * This function is intentionally "wide" (not restrictive) to avoid future refactors.
 */

export type JellyfinMovie = {
  id: string;
  title: string;
  overview?: string;
  year?: number;

  poster?: string | null;
  backdrops?: string[];

  genres?: string[];
  tags?: string[];

  runtimeTicks?: number;

  communityRating?: number;

  people?: Array<{
    name: string;
    role?: string;
    type?: "Actor" | "Director" | "Writer" | string;
    image?: string;
  }>;

  studios?: string[];

  // raw Jellyfin payload passthrough (future-proofing)
  [key: string]: any;
};

/**
 * JellyBack canonical Stage 2.5 seed
 * This is NOT a final composition — only structured intent + assets
 */
export type CompositionSeed = {
  movieId: string;

  identity: {
    title: string;
    year?: number;
    overview?: string;
  };

  assets: {
    backgroundCandidates: string[];
    poster?: string | null;
    logoCandidates: string[];
    bannerCandidates: string[];
    clearartCandidates: string[];
    actorHeadshots: Array<{
      name: string;
      image: string;
    }>;
  };

  metadata: {
    genres: string[];
    tags: string[];
    runtimeMinutes?: number;
    rating?: number;
    studios: string[];
  };

  // EXTENSION LAYER (critical for future expansion)
  extras: Record<string, any>;

  // provenance (debug + traceability)
  source: {
    system: "jellyfin";
    importedAt: number;
  };
};

/**
 * Convert Jellyfin → JellyBack CompositionSeed
 *
 * This is the "border crossing" between Stage 2 and Stage 2.5.
 */
export function materializeFromJellyfin(
  movie: JellyfinMovie
): CompositionSeed {
  console.log("[MATERIALIZE] Input movie:", movie.id);

  const backgroundCandidates = movie.backdrops ?? [];

  const actorHeadshots =
    movie.people
      ?.filter((p) => p.type === "Actor" && p.image)
      .map((p) => ({
        name: p.name,
        image: p.image!,
      })) ?? [];

  const seed: CompositionSeed = {
    movieId: movie.id,

    identity: {
      title: movie.title,
      year: movie.year,
      overview: movie.overview,
    },

    assets: {
      backgroundCandidates,
      poster: movie.poster ?? null,

      /**
       * IMPORTANT:
       * Jellyfin does not always separate these cleanly.
       * We reserve structure for future enrichment pipelines.
       */
      logoCandidates: [],
      bannerCandidates: [],
      clearartCandidates: [],

      actorHeadshots,
    },

    metadata: {
      genres: movie.genres ?? [],
      tags: movie.tags ?? [],
      runtimeMinutes: movie.runtimeTicks
        ? Math.round(movie.runtimeTicks / 600000000)
        : undefined,
      rating: movie.communityRating,
      studios: movie.studios ?? [],
    },

    extras: {
      raw: movie, // FULL SAFE BACKUP (critical for extensibility)
    },

    source: {
      system: "jellyfin",
      importedAt: Date.now(),
    },
  };

  console.log("[MATERIALIZE] Output seed created:", {
    movieId: seed.movieId,
    backgroundCount: seed.assets.backgroundCandidates.length,
    actorCount: seed.assets.actorHeadshots.length,
  });

  return seed;
}