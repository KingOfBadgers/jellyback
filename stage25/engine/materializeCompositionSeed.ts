/**
 * =========================================================
 * JellyBack Stage 2 → 2.5 BORDER MATERIALISER
 * =========================================================
 *
 * CRITICAL FIX:
 * ---------------------------------------------------------
 * - Introduces CANONICAL BACKDROP
 * - Stage 3 now reads ONE deterministic image source
 * =========================================================
 */

import { normaliseJellyfinMovie } from "@/stage25/engine/materialize/normalizeJellyfinMovie";
import { resolveMetadataAssets } from "@/stage25/engine/metadata/renderMetadataAssets";
import type { BorderSeed } from "@/stage25/store/compositionBorderStore";

/**
 * PICK BEST BACKDROP (deterministic rule)
 */
function selectBackdrop(backdrops: string[]) {
  if (!backdrops || backdrops.length === 0) return null;

  // always prefer Stage 2 generated backdrop first
  return backdrops[0];
}

/**
 * ACTOR EXTRACTION (UNCHANGED)
 */
function extractActors(raw: any) {
  const people = raw?.people ?? raw?.People ?? [];

  console.log("[BORDER][ACTORS RAW]", {
    count: people.length,
    source: raw?.people ? "people" : raw?.People ? "People" : "none",
  });

  const actors = people
    .filter((p: any) => (p.type ?? p.Type) === "Actor")
    .map((p: any) => ({
      id: p.id ?? p.Id ?? null,
      name: p.name ?? p.Name ?? null,
      role: p.role ?? p.Role ?? null,
      image: p.image ?? null,
    }));

  console.log("[BORDER][ACTORS PROCESSED]", {
    actorsCount: actors.length,
  });

  return actors;
}

/**
 * =========================================================
 * BORDER MATERIALISER
 * =========================================================
 */
export async function materializeCompositionSeed(params: {
  movieId: string;
  backgroundUrl: string;
  rawJellyfinMovie: any;
}): Promise<BorderSeed> {
  const traceId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36);

  console.log("[BORDER][MATERIALIZE START]", {
    traceId,
    movieId: params?.movieId,
  });

  if (!params?.rawJellyfinMovie) {
    throw new Error("[BORDER] rawJellyfinMovie required");
  }

  const meta = normaliseJellyfinMovie(params.rawJellyfinMovie);
  const metaAssets = resolveMetadataAssets(meta) ?? [];

  const actors = extractActors(params.rawJellyfinMovie);

  /**
   * =========================================================
   * CANONICAL BACKDROP RESOLUTION (NEW CRITICAL STEP)
   * =========================================================
   */
  const allBackdrops = [
    params.backgroundUrl,
    ...(params.rawJellyfinMovie?.backdrops ??
      params.rawJellyfinMovie?.assets?.backdrops ??
      []),
  ];

  const canonicalBackdrop = selectBackdrop(allBackdrops);

  console.log("[BORDER][BACKDROP SELECTED]", {
    traceId,
    canonicalBackdrop,
    totalBackdrops: allBackdrops.length,
  });

  /**
   * =========================================================
   * SEED BUILD
   * =========================================================
   */
  const seed: BorderSeed = {
    movieId: params.movieId,

    title: params.rawJellyfinMovie?.title ?? null,
    originalTitle:
      params.rawJellyfinMovie?.originalTitle ??
      params.rawJellyfinMovie?.OriginalTitle ??
      null,

    overview:
      params.rawJellyfinMovie?.overview ??
      params.rawJellyfinMovie?.Overview ??
      null,

    year:
      params.rawJellyfinMovie?.year ??
      params.rawJellyfinMovie?.ProductionYear ??
      null,

    runtimeMinutes: meta?.runtime ?? null,

    ratings: {
      mpaa: meta?.mpaa ?? null,
      bbfc: meta?.bbfc ?? null,
    },

    media: {
      resolution: meta?.resolution ?? null,
      subtitles: meta?.subtitles ?? false,
    },

    assets: {
      poster:
        params.rawJellyfinMovie?.poster ??
        params.rawJellyfinMovie?.assets?.poster ??
        null,

      /**
       * BACKDROP ARRAY (still preserved for debugging/future)
       */
      backdrops: allBackdrops,

      logo:
        params.rawJellyfinMovie?.logo ??
        params.rawJellyfinMovie?.assets?.logo ??
        null,

      banner:
        params.rawJellyfinMovie?.banner ??
        params.rawJellyfinMovie?.assets?.banner ??
        null,

      clearart:
        params.rawJellyfinMovie?.clearart ??
        params.rawJellyfinMovie?.assets?.clearart ??
        null,

      actors,
    },

    /**
     * =========================================================
     * NEW CANONICAL FIELD (CRITICAL FIX)
     * =========================================================
     */
    background: {
      src: canonicalBackdrop,
    },

    metaAssets,

    readiness: {
      hasBackground: Boolean(canonicalBackdrop),
      hasPosterCrop: true,
      hasEnoughAssets: Boolean(
        params.rawJellyfinMovie?.poster ??
          params.rawJellyfinMovie?.assets?.poster
      ),
    },

    _debug: {
      traceId,
      jellyfinRawId: params.movieId,
      ingestTimestamp: Date.now(),
    },
  };

  console.log("[BORDER][MATERIALIZE OUTPUT]", {
    traceId,
    movieId: seed.movieId,
    actors: seed.assets.actors.length,
    metaAssets: seed.metaAssets.length,
    backdrop: seed.background?.src,
  });

  return seed;
}