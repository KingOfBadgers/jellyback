import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const BANNER_MODERN: VariantDefinition = {
    id: "BANNER_MODERN",
    layer: "banner",
    displayName: "Modern Banner",
    visibility: "show",
    layout: "center-focus",
    presentation: {
      shape: "floating-glass",
      edge: "rounded",
    },
    maxAssets: 1,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  }