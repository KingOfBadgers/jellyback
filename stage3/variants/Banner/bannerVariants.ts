export type bannerVariant = {
  id: string;
  displayName: string;

  maxAssets: number;

  imageSource: "banner";

    /**
   * LAYOUT METADATA ONLY (IDENTICAL SHAPE TO ACTOR VARIANTS)
   */
  layout: {
    alignment: "center" | "left" | "right";
  };
};

/**
 * =========================================================
 * banner VARIANTS 
 * =========================================================
 */

export const bannerVariants: bannerVariant[] = [
  {
    id: "BANNER_STANDARD",
    requiredAssets: 1,
    layout: "center-focus",
  },
 
 { id: "BANNER_MODERN",
    requiredAssets: 1,
    layout: "center-focus",
  },
]