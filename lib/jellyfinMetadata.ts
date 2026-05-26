export function normaliseJellyfinMovie(movie: any) {
  console.log("====================================");
  console.log("[JELLYFIN RAW KEYS]", Object.keys(movie || {}));
  console.log("[JELLYFIN FULL MOVIE]", movie);
  console.log("====================================");

  if (!movie) return null;

  // =========================
  // RATING PARSER
  // =========================

  const rating =
    movie.OfficialRating ||
    movie.rating ||
    movie.officialRating ||
    movie.OfficialRatingDescription ||
    "";

  let mpaa: string | null = null;
  let bbfc: string | null = null;

  const normalised = String(rating)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");

  // =========================
  // BBFC (UK)
  // =========================

  if (normalised.includes("r18")) bbfc = "r18";
  else if (normalised === "18") bbfc = "18";
  else if (normalised === "15") bbfc = "15";
  else if (normalised === "12a") bbfc = "12a";
  else if (normalised === "12") bbfc = "12";
  else if (normalised === "pg") bbfc = "pg";
  else if (normalised === "u") bbfc = "u";

  // =========================
  // MPAA (US)
  // =========================

  if (normalised.includes("nc17")) mpaa = "nc17";
  else if (normalised.includes("pg13")) mpaa = "pg13";
  else if (normalised === "pg") mpaa = "pg";
  else if (normalised === "r") mpaa = "r";
  else if (normalised === "g") mpaa = "g";

  // =========================
  // RUNTIME FIX (JELLYFIN TICKS → MINUTES)
  // =========================

  const runtimeTicks = movie.RunTimeTicks || null;

  const runtime = runtimeTicks
    ? Math.floor(runtimeTicks / 10_000 / 1000 / 60)
    : null;

  // =========================
  // RESOLUTION
  // =========================

  let resolution: string | null = null;

  const videoStream =
    movie.MediaStreams?.find(
      (stream: any) => stream.Type === "Video"
    ) ?? null;

  const width = videoStream?.Width ?? 0;
  const height = videoStream?.Height ?? 0;

  if (height >= 2160 || width >= 3840) {
    resolution = "4k";
  } else if (height >= 1080 || width >= 1920) {
    resolution = "1080p";
  } else if (height >= 720 || width >= 1280) {
    resolution = "720p";
  }

  // =========================
  // SUBTITLES
  // =========================

  const subtitles = Boolean(
    movie.MediaStreams?.some(
      (stream: any) =>
        stream.Type === "Subtitle"
    )
  );

  const meta = {
    mpaa,
    bbfc,

    runtime,
    resolution,
    subtitles,

    _debug: {
      rawRating: rating,
      normalised,
      rawRuntimeTicks: runtimeTicks,
      width,
      height,
      videoStream,
    },
  };

  console.log("[JELLYFIN NORMALISED OUTPUT]", meta);

  return meta;
}