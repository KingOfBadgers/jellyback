import { getConfig } from "@/lib/config";

export async function GET(_: any, { params }: any) {
  const config = await getConfig();

  const url =
    `${config.jellyfinUrl}/Users/${config.userId}/Items/${params.id}` +
    `?Fields=ImageTags,BackdropImageTags,Overview,People,ProviderIds,Taglines,ProductionYear,RunTimeTicks,OfficialRating,Genres,Tags,Studios`;

  const res = await fetch(url, {
    headers: {
      "X-Emby-Token": config.apiKey,
    },
  });

  const m = await res.json();

  return Response.json({
    // =========================
    // IMAGES
    // =========================
    backdrops: (m.BackdropImageTags || []).map(
      (_: any, i: number) =>
        `${config.jellyfinUrl}/Items/${m.Id}/Images/Backdrop/${i}?api_key=${config.apiKey}`
    ),

    logo: m.ImageTags?.Logo
      ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Logo?api_key=${config.apiKey}`
      : null,

    banner: m.ImageTags?.Banner
      ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Banner?api_key=${config.apiKey}`
      : null,

    clearart: m.ImageTags?.Art
      ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Art?api_key=${config.apiKey}`
      : null,

    // =========================
    // CAST
    // =========================
    cast: (m.People || [])
      .filter((p: any) => p.Type === "Actor")
      .slice(0, 12)
      .map((p: any) => ({
        id: p.Id,
        name: p.Name,
        role: p.Role,
        image: `${config.jellyfinUrl}/Items/${p.Id}/Images/Primary?api_key=${config.apiKey}`,
      })),

    // =========================
    // METADATA (OPTIONAL)
    // =========================
    tagline: m.Taglines?.[0] || null,
    overview: m.Overview || "",
  });
}