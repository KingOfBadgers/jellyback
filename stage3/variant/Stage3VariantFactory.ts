import {
  Stage3Variant,
  Stage3VariantSet,
  Stage3Skeleton,
} from "./Stage3Variant";

function stableId(seed: string, label: string) {
  return `${seed}_${label}`;
}

function buildVariant(
  seedId: string,
  skeleton: Stage3Skeleton,
  actorCount: number,
  backdropCount: number
): Stage3Variant {
  return {
    id: stableId(seedId, skeleton),

    skeleton,

    assetPolicy: {
      actorCount,
      backdropCount,
      allowLogo: true,
      allowBanner: true,
      allowMetadata: true,
    },

    behaviour: {
      overlap: skeleton === "CLUSTER_CORNER" ? "OVERLAP" : "NO_OVERLAP",
      density:
        skeleton === "GRID_2X2"
          ? "HIGH"
          : skeleton.includes("STRIP")
          ? "MEDIUM"
          : "LOW",
    },

    metadataMode: "FULL",
  };
}

export function buildStage3Variants(seed: any): Stage3VariantSet {
  const seedId = seed.id;

  return {
    seedId,
    variants: [
      buildVariant(seedId, "HERO_LEFT", 3, 2),
      buildVariant(seedId, "HERO_RIGHT", 3, 2),
      buildVariant(seedId, "GRID_2X2", 4, 4),
      buildVariant(seedId, "STRIP_VERTICAL", 2, 3),
      buildVariant(seedId, "CLUSTER_CORNER", 5, 3),
    ],
  };
}