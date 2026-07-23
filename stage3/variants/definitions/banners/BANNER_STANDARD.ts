import type { VariantDefinition } from "@/stage3/variants/variantTypes";

export const BANNER_STANDARD: VariantDefinition = {
  id: "BANNER_STANDARD",
  layer: "banner",
  displayName: "Banner",
  visibility: "show",
  layout: "center-focus",
  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
};