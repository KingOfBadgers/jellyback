"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT REGISTRY (SINGLE SOURCE OF TRUTH)
 * =========================================================
 *
 * CHANGE (2026-06-21)
 * ------------------
 * Added maxAssets as deterministic rendering constraint
 *
 * Reason:
 * - Stage 3 compiler requires explicit asset limits
 * - Previously all actor variants rendered full seed array
 * - No capacity constraint existed in system
 *
 * This ensures:
 * - deterministic output
 * - no implicit rendering overflow
 * - consistent contract enforcement
 * =========================================================
 *
 * EXPANSION (2026-06-22)
 * ----------------------
 * Stage 3 Contract Expansion (NO BEHAVIOUR CHANGES)
 *
 * Reason:
 * - Future-proof layout system stability
 * - Prevent architectural drift in compiler/render pipeline
 * - Introduce explicit composition contract fields
 *
 * IMPORTANT:
 * - All new fields are OPTIONAL in behaviour (defaulted)
 * - Existing pipeline remains unchanged
 * - No renderer/compiler logic is modified here
 * =========================================================
 */

export type VariantLayer = "actors" | "collage" | "logo";

/**
 * =========================================================
 * EXPANDED LAYER CONTRACT (2026-06-22)
 * =========================================================
 */
export type ExtendedVariantLayer =
  | "actors"
  | "collage"
  | "logo"
  // [JELLYBACK STAGE 3 CONTRACT EXTENSION]
  // added for future pipeline completeness (no runtime impact)
  | "background"
  | "metadata"
  | "overlay"
  | "fx"
  | "frame";

/**
 * =========================================================
 * EXPANDED LAYOUT INTENT SPACE
 * =========================================================
 */
export type LayoutIntent =
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "none"
  // [JELLYBACK STAGE 3 CONTRACT EXTENSION - 2026-06-22]
  | "top-banner"
  | "bottom-banner"
  | "full-bleed"
  | "left-stack"
  | "right-stack"
  | "center-stack"
  | "floating"
  | "diagonal"
  | "split-left"
  | "split-right";

/**
 * =========================================================
 * VERTICAL ANCHOR CONTRACT
 * =========================================================
 */
export type VerticalAnchor = "top" | "middle" | "bottom" | "full";

/**
 * =========================================================
 * COMPOSITION ROLE CONTRACT
 * =========================================================
 */
export type CompositionRole =
  | "primary"
  | "supporting"
  | "decorative"
  | "background"
  | "ui-anchor";

/**
 * =========================================================
 * BEHAVIOUR FLAGS (DECLARATIVE ONLY)
 * =========================================================
 */
export type BehaviorFlags = {
  overlapsAllowed: boolean;
  scaleWithActors: boolean;
  centerBias: number; // 0–1
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
  | "NONE";

/**
 * =========================================================
 * VARIANT DEFINITION (EXPANDED CONTRACT)
 * =========================================================
 */
export type VariantDefinition = {
  id: VariantId;
  layer: VariantLayer;

  displayName: string;

  /**
   * Render contract base (pure data)
   */
  visibility: "show" | "hide";

  layout: LayoutIntent;

  /**
   * CRITICAL CONSTRAINT
   */
  maxAssets: number;

  /**
   * UI grouping
   */
  group: "primary" | "secondary" | "experimental";

  /**
   * Future extensibility flags
   */
  tier: "free" | "pro" | "internal";

  experimentFlag: string | null;

  // =========================================================
  // [JELLYBACK STAGE 3 CONTRACT EXTENSION - 2026-06-22]
  // =========================================================

  verticalAnchor?: VerticalAnchor;
  density?: "low" | "medium" | "high";
  role?: CompositionRole;

  behaviorFlags?: BehaviorFlags;

  version?: number;
  deprecated?: boolean;
};

/**
 * =========================================================
 * DEBUG LOGGER (SAFE, NON-PROD LOGGING)
 * =========================================================
 */

const logVariant = (message: string, data?: unknown) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[JELLYBACK][VARIANT_REGISTRY][2026-06-22] ${message}`,
      data ?? ""
    );
  }
};

/**
 * =========================================================
 * VARIANT REGISTRY
 * =========================================================
 */

export const variantRegistry: Record<VariantId, VariantDefinition> = {
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

    // [JELLYBACK STAGE 3 CONTRACT EXTENSION - 2026-06-22]
    verticalAnchor: "middle",
    density: "low",
    role: "primary",
    behaviorFlags: {
      overlapsAllowed: false,
      scaleWithActors: true,
      centerBias: 1,
    },
    version: 1,
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

    verticalAnchor: "middle",
    density: "medium",
    role: "primary",
    behaviorFlags: {
      overlapsAllowed: true,
      scaleWithActors: true,
      centerBias: 0.8,
    },
    version: 1,
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

    verticalAnchor: "bottom",
    density: "high",
    role: "primary",
    behaviorFlags: {
      overlapsAllowed: false,
      scaleWithActors: true,
      centerBias: 0.5,
    },
    version: 1,
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

    verticalAnchor: "bottom",
    density: "high",
    role: "primary",
    behaviorFlags: {
      overlapsAllowed: true,
      scaleWithActors: true,
      centerBias: 0.6,
    },
    version: 1,
  },

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

    verticalAnchor: "top",
    density: "low",
    role: "ui-anchor",
    behaviorFlags: {
      overlapsAllowed: false,
      scaleWithActors: false,
      centerBias: 1,
    },
    version: 1,
  },

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

    verticalAnchor: "middle",
    density: "low",
    role: "decorative",
    behaviorFlags: {
      overlapsAllowed: false,
      scaleWithActors: false,
      centerBias: 0,
    },
    version: 1,
  },
};

/**
 * =========================================================
 * REGISTRY INITIALIZATION TRACE (DEBUG)
 * =========================================================
 */

logVariant("Registry loaded", Object.keys(variantRegistry));

/**
 * =========================================================
 * CONTRACT SAFETY NOTE
 * =========================================================
 *
 * - No runtime logic added
 * - No eligibility changes
 * - No compiler or renderer coupling introduced
 * - Only declarative extension of variant contract
 *
 * This preserves Stage 3 determinism guarantees.
 * =========================================================
 */