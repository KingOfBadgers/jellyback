import { normaliseJellyfinMovie }
from "@/stage25/engine/materialize/normalizeJellyfinMovie";

export function buildPosterPack(raw: any) {
  if (!raw) return null;

  const meta = normaliseJellyfinMovie(raw);

  /**
   * ⚠️ IMPORTANT CHANGE:
   * Stage2 NO LONGER decides background priority
   * It only provides a hint/default
   */
  const backgroundSrc =
    raw?.backdrops?.[0] ||
    raw?.backdrop ||
    raw?.parentBackdrop ||
    raw?.poster ||
    null;

  const rawAssets = [
    raw?.logo && { kind: "logo", src: raw.logo },
    raw?.banner && { kind: "banner", src: raw.banner },
    raw?.clearart && { kind: "clearart", src: raw.clearart },
  ].filter(Boolean);

  const assets = rawAssets
    .filter((a: any) => a?.src)
    .map((a: any, i: number) => ({
      id: `${a.kind}-${i}`,
      kind: a.kind,
      src: a.src,
      quality: scoreAsset(a.src, a.kind),
    }))
    .sort((a, b) => b.quality - a.quality);

  return {
    id: raw.id,

    background: {
      src: backgroundSrc,
    },

    assets,

    metadata: {
      mpaa: meta?.mpaa ?? undefined,
      bbfc: meta?.bbfc ?? undefined,
      runtime: meta?.runtime ?? undefined,
      resolution: meta?.resolution ?? undefined,
      subtitles: Boolean(meta?.subtitles),
      tmdbUrl: meta?.tmdbUrl,
      imdbUrl: meta?.imdbUrl,
    },

    template: assets.some((a) => a.kind === "banner")
      ? "dvd"
      : "minimal",
  };
}

function scoreAsset(src: string, kind: string) {
  let score = 50;

  if (src.includes("original")) score += 20;
  if (src.includes("logo")) score += 10;
  if (kind === "clearart") score += 5;
  if (src.includes("wide")) score += 5;

  return score;
}