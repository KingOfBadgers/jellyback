/**
 * =========================================================
 * JELLYBACK STAGE 3 — SINGLE VARIANT REGISTRY
 * =========================================================
 *
 * PURPOSE
 * -------
 * ONE canonical source of truth for ALL variant behaviour.
 *
 * RULES
 * -----
 * - NO logic
 * - NO fallback behavior
 * - NO duplication across files
 * - EVERY variant MUST exist here or it is invalid
 *
 * DATE: 2026-06-19
 * =========================================================
 */

export type VariantVisibility = "show" | "hide";

export type VariantLayout =
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "none";

export type VariantContract = {
  visibility: VariantVisibility;
  layout: VariantLayout;
};

/**
 * =========================================================
 * SINGLE SOURCE OF TRUTH
 * =========================================================
 */

export const VARIANT_REGISTRY: Record<string, VariantContract> = {
  /**
   * ACTORS
   */
  ACTOR_1_CENTER: {
    visibility: "show",
    layout: "center-focus",
  },

  ACTOR_3_CENTER_FOCUS: {
    visibility: "show",
    layout: "center-focus",
  },

  ACTOR_5_ROW: {
    visibility: "show",
    layout: "row",
  },

  ACTOR_5_W_OVERLAP: {
    visibility: "show",
    layout: "w-overlap",
  },

  /**
   * LOGO
   */
  LOGO_STANDARD: {
    visibility: "show",
    layout: "center-focus",
  },

  /**
   * COLLAGE
   */
  COLLAGE_STANDARD: {
    visibility: "show",
    layout: "grid",
  },

  /**
   * UNIVERSAL NULL STATE
   */
  NONE: {
    visibility: "hide",
    layout: "none",
  },
};