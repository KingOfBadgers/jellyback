"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT REGISTRY (SINGLE SOURCE OF TRUTH)
 * =========================================================
 *
 * EXPANSION (2026-06-22)
 * ----------------------
 * - Collage variants now represent backdrop/treatment system
 * - NO new layout systems introduced
 * - Pure parity with actor variant structure
 * =========================================================
 */

import { collageVariants } from "@/stage3/variants/backdrop/collageVariants"

/**
 * =========================================================
 * CORE TYPES
 * =========================================================
 */

export type VariantLayer = "actors" | "collage" | "logo";

export type LayoutIntent =
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "none";

/**
 * =========================================================
 * VARIANT ID
 * =========================================================
 */

export type VariantId =
  | "ACTOR_1_CENTER"
  | "ACTOR_3_CENTER_FOCUS"
  | "ACTOR_5_ROW"
  | "ACTOR_5_W_OVERLAP"
  | "LOGO_STANDARD"
  | "NONE"
  // COLLAGE (BACKDROP BEHAVIOUR VIA EXISTING LAYER)
  | "COLLAGE_SOFT_WASH"
  | "COLLAGE_LAYERED_FIELD"
  | "COLLAGE_MULTI_SOURCE_ENV"
  | "COLLAGE_CINEMATIC_BLEND"
    "COLLAGE_GRID";

/**
 * =========================================================
 * VARIANT DEFINITION
 * =========================================================
 */

export type VariantDefinition = {
  id: VariantId;
  layer: VariantLayer;

  displayName: string;

  visibility: "show" | "hide";

  layout: LayoutIntent;

  maxAssets: number;

  group: "primary" | "secondary" | "experimental";

  tier: "free" | "pro" | "internal";
  experimentFlag: string | null;
};

/**
 * =========================================================
 * REGISTRY (ACTORS + LOGO + COLLAGE)
 * =========================================================
 */

export const variantRegistry: Record<VariantId, VariantDefinition> = {
  /**
   * =========================================================
   * ACTORS
   * =========================================================
   */

  ACTOR_1_CENTER: {
    id: "ACTOR_1_CENTER",
    layer: "actors",
    displayName: "1 Actor — Center",
    visibility: "show",
    layout: "center-focus",
    maxAssets: 1,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },

  ACTOR_3_CENTER_FOCUS: {
    id: "ACTOR_3_CENTER_FOCUS",
    layer: "actors",
    displayName: "3 Actors — Focus",
    visibility: "show",
    layout: "center-focus",
    maxAssets: 3,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },

  ACTOR_5_ROW: {
    id: "ACTOR_5_ROW",
    layer: "actors",
    displayName: "5 Actors — Row",
    visibility: "show",
    layout: "row",
    maxAssets: 5,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },

  ACTOR_5_W_OVERLAP: {
    id: "ACTOR_5_W_OVERLAP",
    layer: "actors",
    displayName: "5 Actors — Overlap",
    visibility: "show",
    layout: "w-overlap",
    maxAssets: 5,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },

  /**
   * =========================================================
   * LOGO
   * =========================================================
   */

  LOGO_STANDARD: {
    id: "LOGO_STANDARD",
    layer: "logo",
    displayName: "Logo",
    visibility: "show",
    layout: "center-focus",
    maxAssets: 1,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },

  /**
   * =========================================================
   * COLLAGE (BACKDROP VARIANTS USING EXISTING LAYER)
   * =========================================================
   */

  COLLAGE_SOFT_WASH: {
    id: "COLLAGE_SOFT_WASH",
    layer: "collage",
    displayName: "Soft Wash Field",
    visibility: "show",
    layout: "row",
    maxAssets: 1,
    group: "secondary",
    tier: "free",
    experimentFlag: null,
  },

  COLLAGE_LAYERED_FIELD: {
    id: "COLLAGE_LAYERED_FIELD",
    layer: "collage",
    displayName: "Layered Field",
    visibility: "show",
    layout: "grid",
    maxAssets: 3,
    group: "secondary",
    tier: "free",
    experimentFlag: null,
  },

  COLLAGE_MULTI_SOURCE_ENV: {
    id: "COLLAGE_MULTI_SOURCE_ENV",
    layer: "collage",
    displayName: "Multi-Source Environment",
    visibility: "show",
    layout: "row",
    maxAssets: 5,
    group: "secondary",
    tier: "free",
    experimentFlag: null,
  },

  COLLAGE_CINEMATIC_BLEND: {
    id: "COLLAGE_CINEMATIC_BLEND",
    layer: "collage",
    displayName: "Cinematic Blend Field",
    visibility: "show",
    layout: "w-overlap",
    maxAssets: 6,
    group: "secondary",
    tier: "free",
    experimentFlag: null,
  },
  COLLAGE_GRID: {
    id: "COLLAGE_GRID",
    layer: "collage",
    displayName: "Grid",
    visibility: "show",
    layout: "grid",
    maxAssets: 4,
    group: "secondary",
    tier: "free",
    experimentFlag: null,
  },


  /**
   * =========================================================
   * NONE
   * =========================================================
   */

  NONE: {
    id: "NONE",
    layer: "actors",
    displayName: "None",
    visibility: "hide",
    layout: "none",
    maxAssets: 0,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },
};