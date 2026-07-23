import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const COLLAGE_VERTICAL_STRIP_RIGHT: VariantDefinition = {
  id: "COLLAGE_VERTICAL_STRIP_RIGHT",
  layer: "collage",
  displayName: "Vertical Strip Right",
  visibility: "show",
  layout: "vertical-right",
  maxAssets: 4,
  presentation: { shape: "floating-glass"},
  group: "secondary",
  tier: "free",
  experimentFlag: null,
};