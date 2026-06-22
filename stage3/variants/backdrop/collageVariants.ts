/**
 * =========================================================
 * JELLYBACK STAGE 3 — COLLAGE VARIANT REGISTRY
 * =========================================================
 *
 * PURPOSE
 * -------
 * Backdrop-style composition variants implemented using
 * existing COLLAGE layer system.
 *
 * RULES
 * -----
 * - MUST mirror ActorVariant structure
 * - NO new behaviour fields
 * - NO CSS / styling systems
 * - NO runtime logic
 * =========================================================
 */

export type CollageVariant = {
  id: string;
  label: string;

  /**
   * HARD REQUIREMENTS
   */
  requiredAssets: number;

  /**
   * LAYOUT METADATA ONLY (IDENTICAL SHAPE TO ACTOR VARIANTS)
   */
  layout: {
    type: "row" | "grid" | "overlap" | "w-shape";
    spacing: "tight" | "normal" | "wide";
    alignment: "center" | "left" | "right";
  };
};

/**
 * =========================================================
 * COLLAGE VARIANTS (BACKDROP BEHAVIOUR EXPRESSION LAYER)
 * =========================================================
 */

export const collageVariants: CollageVariant[] = [
  {
    id: "COLLAGE_SOFT_WASH",
    label: "Soft Wash Field",
    requiredAssets: 1,
    layout: {
      type: "overlap",
      spacing: "wide",
      alignment: "center",
    },
  },

  {
    id: "COLLAGE_LAYERED_FIELD",
    label: "Layered Field",
    requiredAssets: 3,
    layout: {
      type: "grid",
      spacing: "normal",
      alignment: "center",
    },
  },

  {
    id: "COLLAGE_MULTI_SOURCE_ENV",
    label: "Multi-Source Environment",
    requiredAssets: 5,
    layout: {
      type: "row",
      spacing: "tight",
      alignment: "center",
    },
  },

  {
    id: "COLLAGE_CINEMATIC_BLEND",
    label: "Cinematic Blend Field",
    requiredAssets: 6,
    layout: {
      type: "w-shape",
      spacing: "tight",
      alignment: "center",
    },
  },
];