/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT MAP
 * =========================================================
 *
 * PURPOSE
 * -------
 * This file is the deterministic lookup table between:
 *
 *   Variant ID → Layout Blueprint
 *
 * RULES
 * -----
 * - NO logic
 * - NO conditionals
 * - NO runtime computation
 * - ONLY static mappings
 *
 * This is a "design contract", not code logic.
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
 * ACTOR VARIANT BLUEPRINTS
 * =========================================================
 */

export const variantMap: Record<string, LayoutBlueprint> = {
  /**
   * -----------------------------------------------------
   * SINGLE ACTOR
   * -----------------------------------------------------
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
    constraints: {
      fit: "contain",
    },
  },

  /**
   * -----------------------------------------------------
   * THREE ACTOR FOCUS
   * -----------------------------------------------------
   */
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
    constraints: {
      fit: "contain",
    },
  },

  /**
   * -----------------------------------------------------
   * FIVE ACTOR ROW
   * -----------------------------------------------------
   */
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
    constraints: {
      fit: "contain",
    },
  },

  /**
   * -----------------------------------------------------
   * FIVE ACTOR W-SHAPE OVERLAP
   * -----------------------------------------------------
   */
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
    constraints: {
      fit: "contain",
    },
  },

  /**
   * -----------------------------------------------------
   * NONE STATE (VALID OPTION)
   * -----------------------------------------------------
   */
  NONE: {
    layer: "actors",
    type: "row",
    style: {
      position: "absolute",
      bottom: "0px",
      left: "0px",
      opacity: 0,
      zIndex: -1,
    },
    constraints: {
      fit: "contain",
    },
  },
};