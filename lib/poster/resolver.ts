import { Zone, PosterAsset } from "./types";

export function resolveZone(zone: Zone, assets: PosterAsset[]) {
  // 1. If user explicitly assigned asset
  if (zone.assignedAssetId) {
    return assets.find(a => a.id === zone.assignedAssetId);
  }

  // 2. Otherwise fallback logic
  for (const type of zone.fallbackPriority) {
    const match = assets.find(
      (a) => a.type === type && a.enabled
    );

    if (match) return match;
  }

  return null;
}