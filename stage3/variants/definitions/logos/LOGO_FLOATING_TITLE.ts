import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const LOGO_FLOATING_TITLE: VariantDefinition = {
    id: "LOGO_FLOATING_TITLE",
    layer: "logo",
    displayName: "Floating Title",
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