import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const COLLAGE_CINEMATIC_BLEND: VariantDefinition = {
  id: "COLLAGE_CINEMATIC_BLEND",
  layer: "collage",
  displayName: "Cinematic Blend Field",
  visibility: "show",
  layout: "w-overlap",
  presentation: {
    shape: "floating-glass",
    stack: "overlap",
    rotation: -2.5,
  },
  maxAssets: 6,
  group: "secondary",
  tier: "free",
  experimentFlag: null,
};