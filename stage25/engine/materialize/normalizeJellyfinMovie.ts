/**
 * =========================================================
 * NORMALISE JELLYFIN MOVIE (STAGE 2.5)
 * =========================================================
 */

export function normaliseJellyfinMovie(movie: any) {
  console.log("====================================");
  console.log("[JELLYFIN RAW KEYS]", Object.keys(movie || {}));
  console.log("[JELLYFIN FULL MOVIE]", movie);

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
  // RATING
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

  let mpaa: string | null = null;
  let bbfc: string | null = null;

  const normalised = String(rating)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");

  if (normalised.includes("r18")) bbfc = "r18";
  else if (normalised === "18") bbfc = "18";
  else if (normalised === "15") bbfc = "15";
  else if (normalised === "12a") bbfc = "12a";
  else if (normalised === "12") bbfc = "12";
  else if (normalised === "pg") bbfc = "pg";
  else if (normalised === "u") bbfc = "u";

  if (normalised.includes("nc17")) mpaa = "nc17";
  else if (normalised.includes("pg13")) mpaa = "pg13";
  else if (normalised === "pg") mpaa = "pg";
  else if (normalised === "r") mpaa = "r";
  else if (normalised === "g") mpaa = "g";

  // =========================================================
  // RUNTIME
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

  // =========================================================
  // RESOLUTION
  // =========================================================
  let resolution: string | null = null;

  const mediaRes = movie?.media?.resolution;
  if (mediaRes) {
    const v = String(mediaRes).toLowerCase();

    if (v.includes("4k") || v.includes("2160")) resolution = "4k";
    else if (v.includes("1080")) resolution = "1080p";
    else if (v.includes("720")) resolution = "720p";
    else if (v.includes("sd") || v.includes("480") || v.includes("576")) resolution = "sd";
  }

  if (!resolution) {
    const videoStream =
      movie?.MediaStreams?.find(
        (s: any) => s.Type === "Video" || s.type === "Video"
      );

    const width = videoStream?.Width ?? videoStream?.width ?? 0;
    const height = videoStream?.Height ?? videoStream?.height ?? 0;

    if (height >= 2160 || width >= 3840) resolution = "4k";
    else if (height >= 1080 || width >= 1920) resolution = "1080p";
    else if (height >= 720 || width >= 1280) resolution = "720p";
    else if (height > 0 || width > 0) resolution = "sd";
  }

  // =========================================================
  // SUBTITLES
  // =========================================================
  const subtitles = Boolean(
    movie.MediaStreams?.some(
      (s: any) => s.Type === "Subtitle" || s.type === "Subtitle"
    )
  );

  // =========================================================
  // LOGO (CANONICAL STRING ONLY — CRITICAL FIX)
  // =========================================================
  const logoSrc =
    movie?.footer?.logo ||
    movie?.logo ||
    movie?.assets?.logo ||
    movie?.ImageTags?.Logo ||
    null;

  
    // =========================================================
  // PROVIDER IDS
  // =========================================================
  /**
   * CHANGE: 2026-07-08
   * REASON:
   * Preserve external movie references for downstream
   * metadata generation.
   *
   * QR generation happens later.
   * Normalisation only stores canonical IDs.
   */
 const providerIds = {
  tmdb:
    movie?.providerIds?.tmdb ??
    movie?.ProviderIds?.Tmdb ??
    null,

  imdb:
    movie?.providerIds?.imdb ??
    movie?.ProviderIds?.Imdb ??
    null,

  };


  // =========================================================
  // OUTPUT
  // =========================================================
  const meta = {
    mpaa,
    bbfc,
    runtime,
    resolution,
    subtitles,
    providerIds,

    // IMPORTANT: string ONLY for Stage 3 compatibility
    logo: logoSrc,


    _debug: {
      rawRating: rating,
      normalised,
      runtimeTicks,
    },
  };

  console.log("[JELLYFIN NORMALISED OUTPUT]", meta);

  return meta;
}