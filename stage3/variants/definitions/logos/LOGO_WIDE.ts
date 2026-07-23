import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const LOGO_WIDE: VariantDefinition = {
    id: "LOGO_WIDE",
    layer: "logo",
    displayName: "Wide Logo",
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