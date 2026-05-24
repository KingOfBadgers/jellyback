import { getConfig } from "@/lib/config";

export async function GET() {
  const config = await getConfig();

  const url =
    `${config.jellyfinUrl}/Items` +
    `?IncludeItemTypes=Movie` +
    `&Recursive=true` +
    `&Fields=` +
    [
      "ImageTags",
      "BackdropImageTags",
      "Name",
      "Overview",
      "ProductionYear",
      "RunTimeTicks",
      "OfficialRating",
      "Genres",
      "Tags",
      "MediaStreams",
      "People",
      "ProviderIds"
    ].join(",") +
    `&Limit=200`;

  const res = await fetch(url, {
    headers: {
      "X-Emby-Token": config.apiKey
    }
  });

  const json = await res.json();
  const items = json?.Items || [];

  const movies = items.map((m: any) => {
    const runtimeMinutes = m.RunTimeTicks
      ? Math.floor(m.RunTimeTicks / 600000000)
      : null;

    const resolution =
      m.MediaStreams?.find(
        (s: any) => s.Type === "Video"
      )?.Height || null;

    const hasSubtitles =
      m.MediaStreams?.some(
        (s: any) => s.Type === "Subtitle"
      ) ?? false;

    return {
      id: m.Id,
      title: m.Name,
      year: m.ProductionYear,
      overview: m.Overview || "",

      runtime: runtimeMinutes,

      rating:
        m.OfficialRating || "",

      genres:
        m.Genres || [],

      tags:
        m.Tags || [],

      resolution,
      subtitles: hasSubtitles,

      imdb:
        m.ProviderIds?.Imdb || null,

      tmdb:
        m.ProviderIds?.Tmdb || null,

      // RESTORED WORKING URLS
      poster: m.ImageTags?.Primary
        ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Primary?api_key=${config.apiKey}`
        : null,

      backdrops:
        (m.BackdropImageTags || []).map(
          (_: any, i: number) =>
            `${config.jellyfinUrl}/Items/${m.Id}/Images/Backdrop/${i}?api_key=${config.apiKey}`
        ),

      // KEEP FOR FUTURE STEPS
      banner: m.ImageTags?.Banner
        ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Banner?api_key=${config.apiKey}`
        : null,

      logo: m.ImageTags?.Logo
        ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Logo?api_key=${config.apiKey}`
        : null,

      cast: (m.People || [])
        .filter(
          (p: any) => p.Type === "Actor"
        )
        .slice(0, 5)
        .map((p: any) => ({
          id: p.Id,
          name: p.Name
        }))
    };
  });

  return Response.json(movies);
}