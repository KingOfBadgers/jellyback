import { getConfig } from "@/lib/config";

export async function GET() {
  const config = await getConfig();

  const url =
    `${config.jellyfinUrl}/Items` +
    `?IncludeItemTypes=Movie` +
    `&Recursive=true` +
    `&Fields=` +
    [
      "Name",
      "ProductionYear",
      "Overview",
      "RunTimeTicks",
      "OfficialRating",
      "Genres",
      "Tags",
      "Studios",
      "MediaStreams",
      "CommunityRating",
      "ProviderIds",
      "ImageTags"
    ].join(",") +
    `&Limit=5000`;

  const res = await fetch(url, {
    headers: {
      "X-Emby-Token": config.apiKey,
    },
  });

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error("Jellyfin returned non-JSON response:");
    console.error(text);

    return Response.json([], { status: 200 });
  }

  const items = json?.Items || [];

  const movies = items.map((m: any) => {
    // =========================
    // RUNTIME
    // =========================
    const runtimeMinutes = m.RunTimeTicks
      ? Math.floor(m.RunTimeTicks / 600000000)
      : null;

    // =========================
    // RESOLUTION
    // =========================
    const videoHeight =
      m.MediaStreams?.find((s: any) => s.Type === "Video")?.Height || null;

    const resolution =
      videoHeight >= 2160
        ? "4K"
        : videoHeight >= 1440
        ? "1440p"
        : videoHeight >= 1080
        ? "1080p"
        : videoHeight >= 720
        ? "720p"
        : null;

    // =========================
    // SUBTITLES
    // =========================
    const hasSubtitles =
      m.MediaStreams?.some((s: any) => s.Type === "Subtitle") ?? false;

    // =========================
    // SCORE
    // =========================
    const score =
      typeof m.CommunityRating === "number"
        ? Number(m.CommunityRating.toFixed(1))
        : null;

    return {
      // =========================
      // CORE (STAGE 1)
      // =========================
      id: m.Id,
      title: m.Name,
      year: m.ProductionYear,
      overview: m.Overview || "",
      runtime: runtimeMinutes,

      score,
      tagline: m.Taglines?.[0] || null,
      certification: m.OfficialRating || null,

      genres: m.Genres || [],
      tags: m.Tags || [],
      studios: (m.Studios || []).map((s: any) => s.Name),

      resolution,
      subtitles: hasSubtitles,

      imdb: m.ProviderIds?.Imdb || null,
      tmdb: m.ProviderIds?.Tmdb || null,

      // =========================
      // 🎯 ONLY VISUAL IN STAGE 1
      // =========================
      poster: m.ImageTags?.Primary
        ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Primary?api_key=${config.apiKey}`
        : null,
    };
  });

  return Response.json(movies);
}