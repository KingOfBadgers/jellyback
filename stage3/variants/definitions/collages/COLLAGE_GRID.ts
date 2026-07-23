import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const COLLAGE_GRID: VariantDefinition = {
  id: "COLLAGE_GRID",
  layer: "collage",
  displayName: "Grid",
  visibility: "show",
  layout: "grid",
  presentation: {
    shape: "polaroid",
    stack: "tight-grid",
  },
  maxAssets: 4,
  group: "secondary",
  tier: "free",
  experimentFlag: null,
};
