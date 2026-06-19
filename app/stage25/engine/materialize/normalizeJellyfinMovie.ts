/**
 * =========================================================
 * NORMALISE JELLYFIN MOVIE
 * =========================================================
 *
 * HUMAN:
 * Converts raw Jellyfin payload into stable JellyBack metadata.
 * This layer is responsible for preventing data loss.
 *
 * AI:
 * Schema harmonisation layer:
 * - extracts multiple Jellyfin variants
 * - preserves backward compatibility
 * - ensures Stage 2.5+ always receives usable data
 * =========================================================
 */

export function normaliseJellyfinMovie(movie: any) {
  console.log("====================================");
  console.log("[JELLYFIN RAW KEYS]", Object.keys(movie || {}));
  console.log("[JELLYFIN FULL MOVIE]", movie);

  // =========================================================
  // ADDED DEBUG: MEDIA STRUCTURE INSPECTION (CRITICAL FIX DEBUGGING)
  // =========================================================
  console.log("[NORMALISER][MEDIA DEBUG SNAPSHOT]", {
    media: movie?.media,
    MediaStreams: movie?.MediaStreams,
    mediaStreams: movie?.mediaStreams,
    MediaSources: movie?.MediaSources,
    mediaSources: movie?.mediaSources,
  });

  console.log("====================================");

  if (!movie) {
    console.warn("[JELLYFIN NORMALISER] Missing movie");
    return null;
  }

  // =========================================================
  // RATING PARSER (HARDENED)
  // =========================================================
  const rating =
    movie?.ratings?.raw ||
    movie?.ratings?.mpaa ||
    movie?.ratings?.bbfc ||
    movie?.OfficialRating ||
    movie?.rating ||
    movie?.officialRating ||
    movie?.OfficialRatingDescription ||
    "";

  console.log("[NORMALISER] rating source:", rating);

  let mpaa: string | null = null;
  let bbfc: string | null = null;

  const normalised = String(rating)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");

  // =========================
  // BBFC
  // =========================
  if (normalised.includes("r18")) bbfc = "r18";
  else if (normalised === "18") bbfc = "18";
  else if (normalised === "15") bbfc = "15";
  else if (normalised === "12a") bbfc = "12a";
  else if (normalised === "12") bbfc = "12";
  else if (normalised === "pg") bbfc = "pg";
  else if (normalised === "u") bbfc = "u";

  // =========================
  // MPAA
  // =========================
  if (normalised.includes("nc17")) mpaa = "nc17";
  else if (normalised.includes("pg13")) mpaa = "pg13";
  else if (normalised === "pg") mpaa = "pg";
  else if (normalised === "r") mpaa = "r";
  else if (normalised === "g") mpaa = "g";

  // =========================================================
  // RUNTIME (HARDENED MULTI-SOURCE)
  // =========================================================

  const runtimeTicks = movie.RunTimeTicks || movie.runTimeTicks || null;

  let runtime: number | null = null;

  if (typeof movie.runtimeMinutes === "number") {
    runtime = movie.runtimeMinutes;
  } else if (typeof movie.RuntimeMinutes === "number") {
    runtime = movie.RuntimeMinutes;
  } else if (runtimeTicks) {
    runtime = Math.floor(runtimeTicks / 10_000 / 1000 / 60);
  }

  console.log("[NORMALISER] runtime resolved:", {
    runtime,
    runtimeTicks,
    runtimeMinutes: movie.runtimeMinutes,
  });

  // =========================================================
  // RESOLUTION (HARDENED STREAM SCAN)
  // =========================================================

  let resolution: string | null = null;

  const videoStream =
    movie.MediaStreams?.find(
      (stream: any) =>
        stream.Type === "Video" ||
        stream.type === "Video"
    ) ?? null;

  const width = videoStream?.Width ?? videoStream?.width ?? 0;
  const height = videoStream?.Height ?? videoStream?.height ?? 0;

  // =========================================================
  // ADDED DEBUG: PRE-RESOLUTION STATE
  // =========================================================
  console.log("[NORMALISER][RESOLUTION INPUT STATE]", {
    hasMediaField: Boolean(movie?.media),
    hasMediaStreams: Boolean(movie?.MediaStreams),
    mediaStreamsLength: movie?.MediaStreams?.length ?? 0,
    hasMediaSources: Boolean(movie?.MediaSources),
    mediaSourcesLength: movie?.MediaSources?.length ?? 0,
  });

  // 1. explicit media field (rare but clean when present)
  const mediaRes = movie?.media?.resolution;
  if (mediaRes) {
    const v = String(mediaRes).toLowerCase();

    if (v.includes("4k") || v.includes("2160")) return "4k";
if (v.includes("1080")) return "1080p";
if (v.includes("720")) return "720p";
if (v.includes("sd") || v.includes("480") || v.includes("576")) return "sd";
  }

  // 2. MediaStreams (Jellyfin canonical source)
  if (!resolution) {
    const videoStream =
      movie?.MediaStreams?.find(
        (s: any) =>
          s.Type === "Video" || s.type === "Video"
      );

    const width = videoStream?.Width ?? videoStream?.width ?? 0;
    const height = videoStream?.Height ?? videoStream?.height ?? 0;

     if (height >= 2160 || width >= 3840) resolution = "4k";
else if (height >= 1080 || width >= 1920) resolution = "1080p";
else if (height >= 720 || width >= 1280) resolution = "720p";
else if (height > 0 || width > 0) resolution = "sd";
  }

  // 3. final fallback (optional UX safety net)
  if (!resolution) {
    resolution = null; // DO NOT fake it
  }

  console.log("[NORMALISER] resolution resolved:", {
    resolution,
    width,
    height,
  });

  // =========================================================
  // SUBTITLES (HARDENED)
  // =========================================================

  const subtitles = Boolean(
    movie.MediaStreams?.some(
      (stream: any) =>
        stream.Type === "Subtitle" ||
        stream.type === "Subtitle"
    )
  );

  console.log("[NORMALISER] subtitles:", subtitles);

  // =========================================================
  // OUTPUT
  // =========================================================

  const meta = {
    mpaa,
    bbfc,

    runtime,
    resolution,
    subtitles,

    _debug: {
      rawRating: rating,
      normalised,
      runtimeTicks,
      width,
      height,
      videoStream,
    },
  };

  console.log("[JELLYFIN NORMALISED OUTPUT]", meta);

  // =========================================================
  // EMPTY STATE WARNING (CRITICAL DIAGNOSTIC)
  // =========================================================

  if (!mpaa && !bbfc && !runtime && !resolution) {
    console.warn("[NORMALISER] EMPTY OUTPUT DETECTED", {
      reason: "All derived fields are null",
      hint: "Check Jellyfin schema variant for this item",
    });
  }

  return meta;
}