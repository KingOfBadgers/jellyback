import { getConfig } from "@/lib/config";

export async function GET() {
  const config = await getConfig();

  const url =
    `${config.jellyfinUrl}/Items` +
    `?IncludeItemTypes=Movie` +
    `&Recursive=true` +
    `&Fields=ImageTags,BackdropImageTags,Name,ProductionYear,OfficialRating` +
    `&Limit=2000`;

  const res = await fetch(url, {
    headers: {
      "X-Emby-Token": config.apiKey,
    },
  });

  const json = await res.json().catch(() => ({ Items: [] }));
  const items = json.Items || [];

  const movies = items.map((m: any) => {

    // =========================
    // BACKDROPS (ROBUST FIX)
    // =========================
    const backdropTags =
      m.BackdropImageTags?.length
        ? m.BackdropImageTags
        : m.ImageTags?.Backdrop
          ? [m.ImageTags.Backdrop]
          : [];

    const backdrops = backdropTags.map((_: any, i: number) =>
      `${config.jellyfinUrl}/Items/${m.Id}/Images/Backdrop/${i}?api_key=${config.apiKey}`
    );

    return {
      // =========================
      // STAGE 1 CORE (FAST UI)
      // =========================
      id: m.Id,
      title: m.Name,
      year: m.ProductionYear,
      rating: m.OfficialRating || null,

      poster: m.ImageTags?.Primary
        ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Primary?api_key=${config.apiKey}`
        : null,

      // =========================
      // STAGE 2 / 3 ASSETS
      // (SAFE TO INCLUDE NOW)
      // =========================
      backdrops,

      banner: m.ImageTags?.Banner
        ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Banner?api_key=${config.apiKey}`
        : null,

      logo: m.ImageTags?.Logo
        ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Logo?api_key=${config.apiKey}`
        : null,

      clearart: m.ImageTags?.Art
        ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Art?api_key=${config.apiKey}`
        : null,
    };
  });

  return Response.json(movies);
}