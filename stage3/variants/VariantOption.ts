// /stage3/variants/types/VariantOption.ts

/**
 * =========================================================
 * JELLYBACK STAGE 3
 * VARIANT OPTION SCHEMA v1 (LOCKED)
 * =========================================================
 *
 * FIX (2026-06-18 BST)
 * --------------------
 * Introduced explicit NONE render contract.
 *
 * Reason:
 * Prevent undefined layoutId from cascading into renderer
 * failure states.
 *
 * Impact:
 * - Enables safe "None" UI option
 * - Prevents layout resolution crashes
 * - Keeps layout system untouched
 */

export type VariantLayer =
  | "collage"
  | "actors"
  | "backdrop"
  | "background"
  | "logo"
  | "banner"
  | "treatment"
  | "metadata";

export type VariantPlacement =
  | "top"
  | "bottom"
  | "center"
  | "floating";

export type VariantRenderMode =
  | "css"
  | "canvas"
  | "none"; // ✅ FIX: allows intentional no-render state

/**
 * =========================================================
 * CORE CONTRACT
 * =========================================================
 */
export type VariantOption = {
  id: string;
  label: string;
  layer: VariantLayer;

  /**
   * FIX:
   * layoutId is now explicitly nullable-safe
   *
   * BEFORE:
   *   layoutId?: string
   *
   * AFTER:
   *   layoutId?: string | null
   *
   * Reason:
   * We must distinguish:
   * - "not set yet" (undefined)
   * - "intentionally none" (null)
   */
  layoutId?: string | null;

  requires: {
    minActors?: number;
    minBackdrops?: number;
    requiresLogo?: boolean;
    requiresBanner?: boolean;
  };

  group: "core" | "cinematic" | "editorial" | "experimental";

  /**
   * FIX:
   * renderMode now includes explicit NONE state
   *
   * This replaces implicit "layoutId = null" behaviour
   */
  renderMode: VariantRenderMode;

  placement?: VariantPlacement;
};