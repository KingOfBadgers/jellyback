import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const COLLAGE_MULTI_SOURCE_ENV: VariantDefinition = {
  id: "COLLAGE_MULTI_SOURCE_ENV",
  layer: "collage",
  displayName: "Multi Source Environment",
  visibility: "show",
  layout: "row",
  presentation: {
    shape: "soft-frame",
  },
  maxAssets: 5,
  group: "secondary",
  tier: "free",
  experimentFlag: null,
};