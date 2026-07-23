import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const LOGO_VERTICAL_MARK: VariantDefinition = {
  id: "LOGO_VERTICAL_MARK",
  layer: "logo",
  displayName: "Vertical Mark",
  visibility: "show",
  layout: "center-focus",
  eligibility: {
    presentationHints: [
      "vertical-mark",
    ],
  },
  presentation: {
    shape: "portrait",
  },
  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
};