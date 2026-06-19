// =========================================================
// JELLYBACK STAGE 3 — VARIANT CORE SCHEMA
// =========================================================

export type Stage3Skeleton =
  | "HERO_LEFT"
  | "HERO_RIGHT"
  | "GRID_2X2"
  | "STRIP_VERTICAL"
  | "STRIP_HORIZONTAL"
  | "CLUSTER_CORNER";

export type Stage3OverlapMode =
  | "OVERLAP"
  | "NO_OVERLAP";

export type Stage3Density =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export type Stage3MetadataMode =
  | "FULL"
  | "REDUCED"
  | "MINIMAL";

export type Stage3AssetPolicy = {
  actorCount: number;
  backdropCount: number;
  allowLogo: boolean;
  allowBanner: boolean;
  allowMetadata: boolean;
};

export type Stage3BehaviourFlags = {
  overlap: Stage3OverlapMode;
  density: Stage3Density;
};

export type Stage3Variant = {
  id: string;

  skeleton: Stage3Skeleton;
  assetPolicy: Stage3AssetPolicy;
  behaviour: Stage3BehaviourFlags;

  metadataMode: Stage3MetadataMode;
};

export type Stage3VariantSet = {
  seedId: string;
  variants: Stage3Variant[];
};