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
  | "soft-wash"
  | "none";

/**
 * =========================================================
 * PRESENTATION TYPES
 * =========================================================
 */

export type PresentationDefinition = {
  shape?: string;
  frame?: string;
  edge?: string;
  shadow?: string;
  rotation?: number;
  texture?: string;
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
  | "LOGO_CINEMATIC"
  | "LOGO_VERTICAL_MARK"
  | "BANNER_STANDARD"
  | "BANNER_MODERN"
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
  | "COLLAGE_GRID"
  | "BACKDROP_HERO_STACK";

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

  
  presentation?: PresentationDefinition;

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
      shape: "floating-glass",
     frame: "gallery",
    edge: "feather",
    shadow: "soft",
    texture: "linen",
    rotation: -2.5,
    stack: "overlap",},
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
      shape: "magazine-frame",
      edge: "rounded", 
      shadow: "floating", 
      texture: "paper",
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
      shape: "museum-frame",
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
      shape: "steelbook-frame",
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

  /**
 * =========================================================
 * LOGO — STANDARD
 * =========================================================
 */

LOGO_STANDARD: {
  id: "LOGO_STANDARD",
  layer: "logo",
  displayName: "Standard Logo",
  visibility: "show",

  layout: "center-focus",

  eligibility: {
    presentationHints: [
      "standard",
    ],
  },

  presentation: {
    shape: "standard",
  },

  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
},

/**
 * =========================================================
 * LOGO — CINEMATIC
 * =========================================================
 */

LOGO_CINEMATIC: {
  id: "LOGO_CINEMATIC",
  layer: "logo",
  displayName: "Cinematic Title",
  visibility: "show",

  layout: "center-focus",

  eligibility: {
    presentationHints: [
      "cinematic",
    ],
  },

  presentation: {
    shape: "cinematic",
  },

  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
},

/**
 * =========================================================
 * LOGO — VERTICAL MARK
 * =========================================================
 */

LOGO_VERTICAL_MARK: {
  id: "LOGO_VERTICAL_MARK",
  layer: "logo",
  displayName: "Vertical Mark",
  visibility: "show",

  layout: "center-focus",

  eligibility: {
    presentationHints: [
      "vertical-mark",
    ],
  },

  presentation: {
    shape: "portrait",
  },

  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
},

/**
 * =========================================================
 * LOGO — BADGE
 * =========================================================
 */

LOGO_BADGE: {
  id: "LOGO_BADGE",
  layer: "logo",
  displayName: "Badge",
  visibility: "show",

  layout: "center-focus",

  eligibility: {
    presentationHints: [
      "badge",
    ],
  },

  presentation: {
    shape: "square",
  },

  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
},

LOGO_FLOATING_TITLE: {
  id: "LOGO_FLOATING_TITLE",

  layer: "logo",

  displayName: "Floating Title",

  visibility: "show",

  layout: "center-focus",

  eligibility: {
    presentationHints: [
      "floating-title",
    ],
  },

  presentation: {
    shape: "very-wide",
  },

  maxAssets: 1,

  group: "primary",

  tier: "free",

  experimentFlag: null,
},
LOGO_WIDE: {
  id: "LOGO_WIDE",
  layer: "logo",
  displayName: "Wide Logo",
  visibility: "show",

  layout: "center-focus",

  eligibility: {
    presentationHints: [
      "wide",
    ],
  },

  presentation: {
    shape: "wide",
  },

  maxAssets: 1,
  group: "primary",
  tier: "free",
  experimentFlag: null,
},
LOGO_FLOATING_TITLE: {
  id: "LOGO_FLOATING_TITLE",
  layer: "logo",
  displayName: "Floating Title",
  visibility: "show",

  layout: "center-focus",

  eligibility: {
    presentationHints: [
      "floating-title",
    ],
  },

  presentation: {
    shape: "very-wide",
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

BACKDROP_HERO_STACK: {
  id: "BACKDROP_HERO_STACK",
  displayName: "Hero Stack",
  visibility: "show",
  layer: "collage",
  maxAssets: 3,
  layout: "hero-stack",
  group: "secondary",
  tier: "free",
  experimentFlag: null,
    presentation: {
    shape: "soft-frame"},

},

COLLAGE_VERTICAL_STRIP_RIGHT: {
  id: "COLLAGE_VERTICAL_STRIP_RIGHT",
  layer: "collage",
  displayName: "Vertical Strip Right",
  visibility: "show",
  layout: "vertical-right",
  maxAssets: 4,
  presentation: { shape: "floating-glass"},
  group: "secondary",
  tier: "free",
  experimentFlag: null,
},


  COLLAGE_SOFT_WASH: {
  id: "COLLAGE_SOFT_WASH",
  layer: "collage",
  displayName: "Soft Wash Field",
  visibility: "show",
  layout: "soft-wash",
  presentation: {
    shape: "soft-frame",
    frame: "gallery",
    edge: "feather",
    shadow: "soft",
    rotation: -2.5,
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
      shape: "floating-glass",
      stack: "overlap",
      rotation: -2.5,
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
    maxAssets: 1,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },
  BANNER_MODERN: {
    id: "BANNER_MODERN",
    layer: "banner",
    displayName: "Modern Banner",
    visibility: "show",
    layout: "center-focus",
    presentation: {
      shape: "floating-glass",
      edge: "rounded",
    },
    maxAssets: 1,
    group: "primary",
    tier: "free",
    experimentFlag: null,
  },
};