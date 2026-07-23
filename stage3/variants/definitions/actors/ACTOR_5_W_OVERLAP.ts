import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const ACTOR_5_W_OVERLAP: VariantDefinition = {
    id: "ACTOR_5_W_OVERLAP",
    layer: "actors",
    displayName: "5 Actors — Overlap",
    visibility: "show",
    layout: "w-overlap",
    presentation: {
      shape: "steelbook-frame",
      stack: "overlap",
    },
    maxAssets: 5,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  };