import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const ACTOR_3_CENTER_FOCUS: VariantDefinition = {
    id: "ACTOR_3_CENTER_FOCUS",
    layer: "actors",
    displayName: "3 Actors — Focus",
    visibility: "show",
    layout: "center-focus",
    presentation: {
      shape: "magazine-frame",
      edge: "rounded", 
      shadow: "floating", 
      texture: "paper",
    },
    maxAssets: 3,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  };
