import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const LOGO_BADGE: VariantDefinition = {
    id: "LOGO_BADGE",
    layer: "logo",
    displayName: "Badge Logo",
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