import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const LOGO_CINEMATIC: VariantDefinition = {
  id: "LOGO_CINEMATIC",
  layer: "logo",
  displayName: "Cinematic Title",
  visibility: "show",
  layout: "center-focus",
  eligibility: {
    presentationHints: [
      "cinematic",
      "floating-title",
    ],
  },
  presentation: {
    shape: "wide",
  },
  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
};