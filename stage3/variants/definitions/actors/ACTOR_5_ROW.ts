import type { VariantDefinition } from "@/stage3/variants/variantTypes";    

export const ACTOR_5_ROW: VariantDefinition = {
    id: "ACTOR_5_ROW",
    layer: "actors",
    displayName: "5 Actors — Row",
    visibility: "show",
    layout: "row",
    presentation: {
      shape: "museum-frame",
    },
    maxAssets: 5,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  };
