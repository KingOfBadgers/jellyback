import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const COLLAGE_LAYERED_FIELD: VariantDefinition = {
  id: "COLLAGE_LAYERED_FIELD",
  layer: "collage",
  displayName: "Layered Field",
  visibility: "show",
  layout: "w-overlap",
  presentation: {
    shape: "polaroid",
    stack: "tight-grid",
  },
  maxAssets: 3,
  group: "secondary",
  tier: "free",
  experimentFlag: null,
};