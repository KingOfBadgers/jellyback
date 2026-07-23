import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const LOGO_STANDARD: VariantDefinition = {
  id: "LOGO_STANDARD",
  layer: "logo",
  displayName: "Logo",
  visibility: "show",
  layout: "center-focus",

  eligibility: {
    presentationHints: [
      "floating-title",
      "solid-wordmark",
      "badge",
      "vertical-mark",
    ],
  },

  presentation: {
    shape: "soft-frame",
  },

  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
};