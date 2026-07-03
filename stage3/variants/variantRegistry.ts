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

export type VariantLayer =
  | "actors"
  | "collage"
  | "logo"
  | "banner";

export type LayoutIntent =
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "vertical-left"
  | "vertical-right"
  | "none";

/**
 * =========================================================
 * PRESENTATION TYPES
 * =========================================================
 */

export type PresentationDefinition = {
  shape?: string;
  frame?: string;
  stack?: string;
};

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
  | "BANNER_STANDARD"
  | "NONE"

  /**
   * COLLAGE
   */

  | "COLLAGE_SOFT_WASH"
  | "COLLAGE_LAYERED_FIELD"
  | "COLLAGE_MULTI_SOURCE_ENV"
  | "COLLAGE_CINEMATIC_BLEND"
  | "COLLAGE_VERTICAL_STRIP_LEFT"
  | "COLLAGE_VERTICAL_STRIP_RIGHT"
  | "COLLAGE_GRID";

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

  /**
   * Spatial composition language
   */

  layout: LayoutIntent;

  /**
   * Visual appearance language
   */

  
  presentation?: {
  shape?: string;
  stack?: string;
}

  maxAssets: number;

  group:
    | "primary"
    | "secondary"
    | "experimental";

  tier:
    | "free"
    | "pro"
    | "internal";

  experimentFlag: string | null;
};

/**
 * =========================================================
 * REGISTRY
 * =========================================================
 */

export const variantRegistry:
Record<VariantId, VariantDefinition> = {

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
    presentation: {
      shape: "soft-frame",
    },
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
    presentation: {
      shape: "film-frame",
    },
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
    presentation: {
      shape: "soft-frame",
    },
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
    presentation: {
      shape: "film-frame",
      stack: "overlap",
    },
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
    presentation: {
      shape: "soft-frame",
    },
    maxAssets: 1,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },

  /**
   * =========================================================
   * COLLAGE
   * =========================================================
   */

  COLLAGE_VERTICAL_STRIP_LEFT: {
  id: "COLLAGE_VERTICAL_STRIP_LEFT",
  layer: "collage",
  displayName: "Vertical Strip Left",
  visibility: "show",
  layout: "vertical-left",
  maxAssets: 4,
  group: "secondary",
  presentation: { shape: "magazine-frame"},
  tier: "free",
  experimentFlag: null,
},

COLLAGE_VERTICAL_STRIP_RIGHT: {
  id: "COLLAGE_VERTICAL_STRIP_RIGHT",
  layer: "collage",
  displayName: "Vertical Strip Right",
  visibility: "show",
  layout: "vertical-right",
  maxAssets: 4,
  presentation: { shape: "magazine-frame"},
  group: "secondary",
  tier: "free",
  experimentFlag: null,
},


  COLLAGE_SOFT_WASH: {
    id: "COLLAGE_SOFT_WASH",
    layer: "collage",
    displayName: "Soft Wash Field",
    visibility: "show",
    layout: "row",
    presentation: {
      shape: "soft-frame",
    },
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
    layout: "w-overlap",
    presentation: {
      shape: "polaroid",
      stack: "tight-grid",
    },
    maxAssets: 3,
    group: "secondary",
    tier: "free",
    experimentFlag: null,
  },

  COLLAGE_MULTI_SOURCE_ENV: {
    id: "COLLAGE_MULTI_SOURCE_ENV",
    layer: "collage",
    displayName: "Multi Source Environment",
    visibility: "show",
    layout: "row",
    presentation: {
      shape: "soft-frame",
    },
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
    presentation: {
      shape: "film-frame",
      stack: "overlap",
    },
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
    presentation: {
      shape: "polaroid",
      stack: "tight-grid",
    },
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
    presentation: {},
    maxAssets: 0,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },

  /**
   * =========================================================
   * Banner
   * =========================================================
   */

  BANNER_STANDARD: {
    id: "BANNER_STANDARD",
    layer: "banner",
    displayName: "Banner",
    visibility: "show",
    layout: "center-focus",
    presentation: {
      shape: "soft-frame",
    },
    maxAssets: 1,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },
};