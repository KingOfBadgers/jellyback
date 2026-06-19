/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT MAP (SINGLE SOURCE OF TRUTH)
 * =========================================================
 *
 * CHANGE (2026-06-19)
 * -------------------
 * - Expanded to include ALL layers (actors, logo, collage)
 * - Becomes the ONLY registry used by UI + resolver
 * - Removes domain duplication risk
 *
 * RULES
 * -----
 * - NO logic
 * - NO conditionals
 * - STATIC REGISTRY ONLY
 * =========================================================
 */

export type LayoutBlueprint = {
  layer: "actors" | "collage" | "logo";

  type: "row" | "grid" | "overlap" | "w-shape" | "filmstrip";

  style: {
    position: "absolute";
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;

    width?: string;
    height?: string;

    transform?: string;
    opacity?: number;
    zIndex?: number;
  };

  constraints: {
    fit: "contain" | "cover" | "fixed";
  };
};

/**
 * =========================================================
 * VARIANT REGISTRY
 * =========================================================
 */

export const variantMap: Record<string, LayoutBlueprint> = {
  /**
   * =====================================================
   * ACTORS
   * =====================================================
   */

  ACTOR_1_CENTER: {
    layer: "actors",
    type: "row",
    style: {
      position: "absolute",
      bottom: "200px",
      left: "50%",
      transform: "translateX(-50%) scale(1.1)",
      zIndex: 10,
    },
    constraints: { fit: "contain" },
  },

  ACTOR_3_CENTER_FOCUS: {
    layer: "actors",
    type: "row",
    style: {
      position: "absolute",
      bottom: "180px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
    },
    constraints: { fit: "contain" },
  },

  ACTOR_5_ROW: {
    layer: "actors",
    type: "row",
    style: {
      position: "absolute",
      bottom: "160px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
    },
    constraints: { fit: "contain" },
  },

  ACTOR_5_W_OVERLAP: {
    layer: "actors",
    type: "w-shape",
    style: {
      position: "absolute",
      bottom: "160px",
      left: "50%",
      transform: "translateX(-50%) skewY(-2deg)",
      opacity: 0.98,
      zIndex: 10,
    },
    constraints: { fit: "contain" },
  },

  /**
   * =====================================================
   * LOGO VARIANTS (NEW)
   * =====================================================
   */

  LOGO_STANDARD: {
    layer: "logo",
    type: "row",
    style: {
      position: "absolute",
      top: "40px",
      left: "40px",
      zIndex: 20,
    },
    constraints: { fit: "contain" },
  },

  /**
   * =====================================================
   * COLLAGE VARIANTS (STUB READY)
   * =====================================================
   */

  COLLAGE_NONE: {
    layer: "collage",
    type: "grid",
    style: {
      position: "absolute",
      opacity: 0,
    },
    constraints: { fit: "contain" },
  },

  /**
   * =====================================================
   * GLOBAL NONE (SAFE HIDE)
   * =====================================================
   */

  NONE: {
    layer: "actors",
    type: "row",
    style: {
      position: "absolute",
      opacity: 0,
      zIndex: -1,
    },
    constraints: { fit: "contain" },
  },
};