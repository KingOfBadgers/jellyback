/**
 * =========================================================
 * JellyBack Stage 2 → 2.5 BORDER MATERIALISER
 * =========================================================
 */

import { normaliseJellyfinMovie } from "@/stage25/engine/materialize/normalizeJellyfinMovie";
import { resolveMetadataAssets } from "@/stage25/engine/metadata/renderMetadataAssets";

/**
 * =========================================================
 * ACTOR EXTRACTION (STAGE 2.5 OWNED LOGIC)
 * =========================================================
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
 * BACKDROP SELECTION
 * =========================================================
 */
function selectBackdrop(backdrops: string[]) {
  if (!backdrops || backdrops.length === 0) return null;
  return backdrops[0];
}

/**
 * =========================================================
 * BORDER MATERIALISER
 * =========================================================
 */
export async function materializeCompositionSeed(params: {
  movieId: string;
  backgroundUrl: string;
  backgroundSourceUrl?: string;
  rawJellyfinMovie: any;
}) {
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
   * BACKDROP RESOLUTION
   * =========================================================
   */

  /**
 * CHANGE: 2026-07-07
 * REASON:
 * Remove the original Jellyfin backdrop that was used
 * to create the canonical background.
 *
 * The generated 2:3 background remains stored separately.
 * The remaining backdrops remain available for collage use.
 */
const sourceBackdrops =
  params.rawJellyfinMovie?.backdrops ??
  params.rawJellyfinMovie?.assets?.backdrops ??
  [];


function normaliseBackdropUrl(url: string | null) {
  if (!url) return null;

  return url.split("?")[0];
}
const sourceBackdrop =
  normaliseBackdropUrl(params.backgroundSourceUrl);



const allBackdrops = sourceBackdrops.filter(
  (backdrop: string) =>
    normaliseBackdropUrl(backdrop) !== sourceBackdrop
);

/**
 * CHANGE: 2026-07-07
 * REASON:
 * Canonical background is the Stage 2 authored 2:3 image.
 * It must never be selected from the remaining backdrop pool.
 */
const canonicalBackdrop = params.backgroundUrl;


  /**
   * =========================================================
   * SEED
   * =========================================================
   */
  const seed = {
    movieId: params.movieId,

    title: params.rawJellyfinMovie?.title ?? null,
    overview: params.rawJellyfinMovie?.overview ?? null,
    year: params.rawJellyfinMovie?.year ?? null,

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

      backdrops: allBackdrops,

      logo: meta?.logo ?? null,

      banner:
        params.rawJellyfinMovie?.banner ??
        params.rawJellyfinMovie?.assets?.banner ??
        null,

      actors,
    },

    background: {
      src: canonicalBackdrop,
    },

    metaAssets,

    footer: {
      rating: meta?.mpaa ?? meta?.bbfc ?? null,
      runtime: meta?.runtime ?? null,
      resolution: meta?.resolution ?? null,
      cc: meta?.subtitles ?? false,

      logo: meta?.logo ?? null,

      jbIcon: "/assets/meta/jb.png",
    },

    logoAnalysis: meta?.logoAnalysis ?? null,

    readiness: {
      hasBackground: Boolean(canonicalBackdrop),
      hasPosterCrop: true,
      hasEnoughAssets: Boolean(params.rawJellyfinMovie?.poster),
    },

    _debug: {
      traceId,
      jellyfinRawId: params.movieId,
      ingestTimestamp: Date.now(),
    },
  };

  console.log("[BORDER][MATERIALIZE OUTPUT]", {
    traceId,
    actors: seed.assets.actors.length,
    backdrop: seed.background?.src,
    footerPresent: Boolean(seed.footer),
  });

  return seed;
}