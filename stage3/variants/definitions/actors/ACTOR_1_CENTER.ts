import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const ACTOR_1_CENTER: VariantDefinition = {
    id: "ACTOR_1_CENTER",
    layer: "actors",
    displayName: "1 Actor — Center",
    visibility: "show",
    layout: "center-focus",
    presentation: {
      shape: "floating-glass",
     frame: "gallery",
    edge: "feather",
    shadow: "soft",
    texture: "linen",
    rotation: -2.5,
    stack: "overlap",},
    maxAssets: 1,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  }
