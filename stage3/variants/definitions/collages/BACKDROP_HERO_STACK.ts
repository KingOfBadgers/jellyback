import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const BACKDROP_HERO_STACK: VariantDefinition = {
  id: "BACKDROP_HERO_STACK",
  displayName: "Hero Stack",
  visibility: "show",
  layer: "collage",
  maxAssets: 3,
  layout: "hero-stack",
  group: "secondary",
  tier: "free",
  experimentFlag: null,
    presentation: {
    shape: "soft-frame"},
};
