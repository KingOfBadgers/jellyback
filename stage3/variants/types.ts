/**
 * =========================================================
 * JELLYBACK STAGE 3
 * VARIANT TYPES (EXTENDED SAFE VERSION)
 * =========================================================
 *
 * DATE: 2026-06-18
 * TIME: BST
 *
 * CHANGE TYPE:
 * SAFE EXTENSION ONLY
 *
 * RULE:
 * - NO EXISTING CONTRACTS REMOVED
 * - ONLY ADDITIVE CHANGES
 */

/**
 * =========================================================
 * LAYOUT PRESET (GLOBAL POSITIONING SYSTEM)
 * =========================================================
 *
 * PURPOSE:
 * Controls vertical placement of ANY variant layer.
 *
 * This does NOT affect geometry.
 * This ONLY affects placement in canvas space.
 */
export type LayoutPreset =
  | "TOP"
  | "CENTER"
  | "BOTTOM";

/**
 * =========================================================
 * ACTOR LAYOUT TYPES
 * =========================================================
 */
export type ActorLayoutId =
  | "FIVE_STRIP"
  | "HERO_TRIPTYCH"
  | "CONTACT_SHEET";

/**
 * =========================================================
 * ACTOR VARIANT
 * =========================================================
 *
 * RULE:
 * - layoutId defines geometry
 * - preset defines vertical placement only
 */
export interface ActorVariant {
  id: string;
  name: string;
  layoutId: ActorLayoutId;

  /**
   * =====================================================
   * NEW: POSITIONING PRESET
   * =====================================================
   *
   * ADDED: 2026-06-18 BST
   *
   * Reason:
   * Replace duplicate top/bottom layouts with
   * single layout + positional control.
   */
  preset?: LayoutPreset;

  /**
   * =====================================================
   * OPTIONAL REQUIREMENTS
   * =====================================================
   *
   * ADDED: 2026-06-18 BST
   *
   * Reason:
   * Enable UI filtering without runtime guessing.
   */
  requirements?: {
    actors?: number;
  };
}

/**
 * =========================================================
 * BACKDROP VARIANT TYPES
 * =========================================================
 */
export type BackdropVariantId =
  | "FULL_BLEED"
  | "DARKEN_CINEMA"
  | "BLUR_DEPTH"
  | "POSTER_ZOOM";

/**
 * =========================================================
 * BACKDROP VARIANT
 * =========================================================
 *
 * RULE:
 * - same image source
 * - only rendering treatment changes
 */
export interface BackdropVariant {
  id: string;
  name: string;
  variantId: BackdropVariantId;
}