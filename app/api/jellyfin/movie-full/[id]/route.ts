import { getConfig } from "@/lib/config";

/**
 * =========================================================
 * MOVIE FULL API ROUTE (HARDENED + STABLE)
 * =========================================================
 *
 * FIXES:
 * - Jellyfin 400 "Error processing request" instability
 * - unsafe query string construction
 * - unsafe JSON parsing on non-JSON responses
 *
 * GUARANTEE:
 * - output shape unchanged
 * - fallback chain preserved
 * - no breaking changes to Stage 2 / 2.5
 * =========================================================
 */

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const config = await getConfig();
  const { id } = await context.params;

  console.log("====================================");
  console.log("[MOVIE FULL] Request start:", { id });
  console.log("====================================");

  if (!id) {
    console.error("[MOVIE FULL] Missing id");
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  /**
   * =========================================================
   * ENDPOINT STRATEGY (UNCHANGED)
   * =========================================================
   */
  const endpoints = [
    `${config.jellyfinUrl}/Users/${config.userId}/Items/${id}`,
    `${config.jellyfinUrl}/Items/${id}`,
  ];

  const fields = [
    "ImageTags",
    "BackdropImageTags",
    "People",
    "Overview",
    "ProductionYear",
    "OfficialRating",
    "OriginalTitle",
    "RunTimeTicks",
    "Tags",
    "Genres",
    "Studios",
    "MediaStreams",
  ].join(",");

  let parsed: any = null;
  let usedUrl: string | null = null;

  /**
   * =========================================================
   * FETCH WITH SAFE QUERY BUILDING
   * =========================================================
   */
  for (const base of endpoints) {
    const urlObj = new URL(base);

    urlObj.searchParams.set("api_key", config.apiKey);
    urlObj.searchParams.set("Fields", fields);

    const url = urlObj.toString();

    console.log("[MOVIE FULL] Trying:", url);

    try {
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      const text = await res.text();

      console.log("[MOVIE FULL] Status:", res.status);
      console.log("[MOVIE FULL] Preview:", text.slice(0, 200));

      /**
       * =========================================================
       * HARD GUARD AGAINST JELLYFIN ERROR STRINGS
       * =========================================================
       */
      if (!res.ok) {
        console.warn("[MOVIE FULL] HTTP error:", res.status);
        continue;
      }

      if (
        !text ||
        text.startsWith("Error") ||
        text.startsWith("<") // occasionally HTML error pages
      ) {
        console.warn("[MOVIE FULL] Non-JSON response blocked");
        continue;
      }

      try {
        parsed = JSON.parse(text);
        console.log("[MOVIE FULL] STREAM DIAGNOSTIC", {
  mediaStreams: parsed?.MediaStreams?.length ?? 0,
  mediaSources: parsed?.MediaSources?.length ?? 0,
});
        usedUrl = url;
        break;
      } catch (err) {
        console.warn("[MOVIE FULL] JSON parse failed:", err);
        continue;
      }
    } catch (err) {
      console.error("[MOVIE FULL] Fetch error:", err);
      continue;
    }
  }

  /**
   * =========================================================
   * FINAL FAILURE GUARD
   * =========================================================
   */
  if (!parsed || !parsed.Id) {
    console.error("[MOVIE FULL] ALL ENDPOINTS FAILED", {
      id,
      endpoints,
    });

    return Response.json(
      { error: "Movie not found or Jellyfin error" },
      { status: 404 }
    );
  }

  console.log("[MOVIE FULL] SUCCESS SOURCE:", parsed.Name);

  /**
   * =========================================================
   * BACKDROPS
   * =========================================================
   */
  const backdropTags =
    parsed.BackdropImageTags?.length
      ? parsed.BackdropImageTags
      : parsed.ImageTags?.Backdrop
      ? [parsed.ImageTags.Backdrop]
      : [];

  const backdrops = backdropTags.map(
    (_: any, i: number) =>
      `${config.jellyfinUrl}/Items/${parsed.Id}/Images/Backdrop/${i}?api_key=${config.apiKey}`
  );

  const poster = parsed.ImageTags?.Primary
    ? `${config.jellyfinUrl}/Items/${parsed.Id}/Images/Primary?api_key=${config.apiKey}`
    : null;

  /**
   * =========================================================
   * PEOPLE
   * =========================================================
   */
  const people =
    (parsed.People || []).map((p: any) => ({
      id: p.Id ?? null,
      name: p.Name ?? null,
      role: p.Role ?? null,
      type: p.Type ?? "Other",
      image: p.PrimaryImageTag
        ? `${config.jellyfinUrl}/Items/${p.Id}/Images/Primary?api_key=${config.apiKey}`
        : null,
    })) || [];

  /**
   * =========================================================
   * RUNTIME
   * =========================================================
   */
  const runtimeMinutes = parsed.RunTimeTicks
    ? Math.floor(parsed.RunTimeTicks / 600000000)
    : null;

  /**
   * =========================================================
   * OUTPUT (UNCHANGED CONTRACT)
   * =========================================================
   */
  const movieFull = {
    id: parsed.Id,
    title: parsed.Name ?? null,
    originalTitle: parsed.OriginalTitle ?? null,
    overview: parsed.Overview ?? null,
    year: parsed.ProductionYear ?? null,

    runtimeMinutes,

    ratings: {
      mpaa: parsed.OfficialRating ?? null,
      bbfc: null,
      raw: parsed.OfficialRating ?? null,
    },

    media: {
  resolution: null,
  subtitles: false,
  aspectRatio: null,
},

MediaStreams: parsed.MediaStreams ?? [],
MediaSources: parsed.MediaSources ?? [],
mediaStreams: parsed.MediaStreams ?? [],
mediaSources: parsed.MediaSources ?? [],

    assets: {
      poster,
      backdrops,
      banner: parsed.ImageTags?.Banner
        ? `${config.jellyfinUrl}/Items/${parsed.Id}/Images/Banner?api_key=${config.apiKey}`
        : null,
      logo: parsed.ImageTags?.Logo
        ? `${config.jellyfinUrl}/Items/${parsed.Id}/Images/Logo?api_key=${config.apiKey}`
        : null,
      clearart: parsed.ImageTags?.Art
        ? `${config.jellyfinUrl}/Items/${parsed.Id}/Images/Art?api_key=${config.apiKey}`
        : null,
    },

    people,
    genres: parsed.Genres || [],
    studios: parsed.Studios || [],
    tags: parsed.Tags || [],

    _debug: {
      sourceUrl: usedUrl,
      jellyfinId: parsed.Id,
      fetchedAt: Date.now(),
    },
  };

  console.log("[MOVIE FULL] FINAL OK:", {
    id: movieFull.id,
    people: movieFull.people.length,
  });

  return Response.json(movieFull);
}