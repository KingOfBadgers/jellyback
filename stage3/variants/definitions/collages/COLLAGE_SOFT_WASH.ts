import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const COLLAGE_SOFT_WASH: VariantDefinition = {
  id: "COLLAGE_SOFT_WASH",
  layer: "collage",
  displayName: "Soft Wash Field",
  visibility: "show",
  layout: "soft-wash",
  presentation: {
    shape: "soft-frame",
    frame: "gallery",
    edge: "feather",
    shadow: "soft",
    rotation: -2.5,
  },
  maxAssets: 1,
  group: "secondary",
  tier: "free",
  experimentFlag: null,
};