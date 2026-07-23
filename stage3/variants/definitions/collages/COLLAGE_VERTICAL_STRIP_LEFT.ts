import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const COLLAGE_VERTICAL_STRIP_LEFT: VariantDefinition = {
  id: "COLLAGE_VERTICAL_STRIP_LEFT",
  layer: "collage",
  displayName: "Vertical Strip Left",
  visibility: "show",
  layout: "vertical-left",
  maxAssets: 4,
  group: "secondary",
  presentation: { shape: "magazine-frame"},
  tier: "free",
  experimentFlag: null,
};