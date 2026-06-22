/**
 * =========================================================
 * JellyBack Stage 2 → 2.5 BORDER MATERIALISER
 * =========================================================
 *
 * CHANGE (2026-06-22)
 * ---------------------------------------------------------
 * FIX: separation of canonical background vs collage sources
 *
 * REASON:
 * ---------------------------------------------------------
 * Collage system was incorrectly consuming canonical
 * full-frame background image causing visual duplication
 * and layout distortion.
 *
 * RULE:
 * ---------------------------------------------------------
 * background.src = canonical ONLY
 * assets.collageBackdrops = Jellyfin-only sources
 * =========================================================
 */

import { normaliseJellyfinMovie } from "@/stage25/engine/materialize/normalizeJellyfinMovie";
import { resolveMetadataAssets } from "@/stage25/engine/metadata/renderMetadataAssets";
import type { BorderSeed } from "@/stage25/store/compositionBorderStore";

function selectBackdrop(backdrops: string[]) {
  if (!backdrops || backdrops.length === 0) return null;
  return backdrops[0];
}

function extractActors(raw: any) {
  const people = raw?.people ?? raw?.People ?? [];

  const actors = people
    .filter((p: any) => (p.type ?? p.Type) === "Actor")
    .map((p: any) => ({
      id: p.id ?? p.Id ?? null,
      name: p.name ?? p.Name ?? null,
      role: p.role ?? p.Role ?? null,
      image: p.image ?? null,
    }));

  return actors;
}

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
   * CANONICAL BACKGROUND (DO NOT TOUCH)
   * =========================================================
   */
  const allBackdrops = [
    params.backgroundUrl,
    ...(params.rawJellyfinMovie?.backdrops ??
      params.rawJellyfinMovie?.assets?.backdrops ??
      []),
  ];

  const canonicalBackdrop = selectBackdrop(allBackdrops);

  /**
   * =========================================================
   * COLLAGE SOURCE FIX
   * =========================================================
   * IMPORTANT:
   * Remove canonical background from collage system entirely
   */
  const collageBackdrops =
    params.rawJellyfinMovie?.backdrops ??
    params.rawJellyfinMovie?.assets?.backdrops ??
    [];

  console.log("[BORDER][BACKDROP SELECTED]", {
    traceId,
    canonicalBackdrop,
    collageBackdropsCount: collageBackdrops.length,
    totalIncoming: allBackdrops.length,
  });

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
       * CRITICAL FIX:
       * DO NOT include canonical backdrop here
       */
      backdrops: collageBackdrops,

      /**
       * NEW SEMANTIC FIELD
       */
      collageBackdrops,

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
    backdrop: seed.background?.src,
    collageSources: seed.assets.collageBackdrops.length,
  });

  return seed;
}