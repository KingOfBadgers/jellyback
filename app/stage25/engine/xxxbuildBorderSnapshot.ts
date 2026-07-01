export function buildBorderSnapshot(movie: any) {
  if (!movie) {
    throw new Error("[BORDER] Cannot build snapshot from empty movie");
  }

  const traceId =
    crypto?.randomUUID?.() ?? Math.random().toString(36);

  console.log("[BORDER][SNAPSHOT BUILD]", {
    traceId,
    movieId: movie.id,
    keys: Object.keys(movie),
  });

  return {
    traceId,

    id: movie.id,

    title: movie.title || movie.Name,

    backdrops: movie.backdrops || [],

    poster: movie.poster || null,

    // FULL RAW FREEZE (important)
    raw: structuredClone(movie),
  };
}