"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT REGISTRY (SINGLE SOURCE OF TRUTH)
 * =========================================================
 *
 * EXPANSION (2026-06-29)
 * ---------------------------------------------------------
 * ARCHITECTURE CLEANUP
 *
 * VARIANT now controls:
 *
 * 1. Layout
 * 2. Asset limits
 * 3. Visual presentation language
 *
 * Presentation resolver removed.
 *
 * Variant = Complete creative decision.
 * =========================================================
 */

/**
 * =========================================================
 * CORE TYPES
 * =========================================================
 */

import type { VariantLayer } from "./variantTypes";
import type { LayoutIntent } from "./variantTypes";
import type { PresentationDefinition } from "./variantTypes";
import type { VariantId } from "./variantTypes";
import type { VariantDefinition } from "./variantTypes";


/**
 * =========================================================
 * REGISTRY
 * =========================================================
 */

import { ACTOR_1_CENTER, 
  ACTOR_3_CENTER_FOCUS, 
  ACTOR_5_ROW, 
  ACTOR_5_W_OVERLAP } from "./definitions/actors";

import { 
  LOGO_STANDARD, 
  LOGO_CINEMATIC, 
  LOGO_VERTICAL_MARK,
  LOGO_WIDE,
  LOGO_FLOATING_TITLE,
  LOGO_BADGE   } from "./definitions/logos";

import { 
  COLLAGE_VERTICAL_STRIP_LEFT, 
  BACKDROP_HERO_STACK, 
  COLLAGE_VERTICAL_STRIP_RIGHT, 
  COLLAGE_SOFT_WASH, 
  COLLAGE_LAYERED_FIELD, 
  COLLAGE_MULTI_SOURCE_ENV, 
  COLLAGE_CINEMATIC_BLEND, 
  COLLAGE_GRID 
} from "./definitions/collages";

import { 
  BANNER_STANDARD, 
  BANNER_MODERN } 
  from "./definitions/banners";

export const variantRegistry: Record<VariantId, VariantDefinition> = {
  ACTOR_1_CENTER,
  ACTOR_3_CENTER_FOCUS,
  ACTOR_5_ROW,
  ACTOR_5_W_OVERLAP,
  LOGO_STANDARD,
  LOGO_CINEMATIC,
  LOGO_VERTICAL_MARK,
  COLLAGE_VERTICAL_STRIP_LEFT,
  BACKDROP_HERO_STACK,
  COLLAGE_VERTICAL_STRIP_RIGHT,
  COLLAGE_SOFT_WASH,
  COLLAGE_LAYERED_FIELD,
  COLLAGE_MULTI_SOURCE_ENV,
  COLLAGE_CINEMATIC_BLEND,
  COLLAGE_GRID,
  BANNER_STANDARD,
  BANNER_MODERN,
  LOGO_WIDE,
  LOGO_FLOATING_TITLE,
  LOGO_BADGE
};
/**
*export const variantRegistry:
*Record<VariantId, VariantDefinition> = {



  /**
   * =========================================================
   * NONE
   * =========================================================
   */
/**
  *NONE: {
   * id: "NONE",
  *  layer: "actors",
    displayName: "None",
  *  visibility: "hide",
   * layout: "none",
 *   presentation: {},
  *  maxAssets: 0,
   * group: "primary",
*    *tier: "free",
 *   experimentFlag: null,
  *},
*/
  