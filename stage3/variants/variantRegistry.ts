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
 */

export type VariantLayer = "actors" | "collage" | "logo";

export type VariantId =
  | "ACTOR_1_CENTER"
  | "ACTOR_3_CENTER_FOCUS"
  | "ACTOR_5_ROW"
  | "ACTOR_5_W_OVERLAP"
  | "LOGO_STANDARD"
  | "NONE";

export type VariantDefinition = {
  id: VariantId;
  layer: VariantLayer;

  displayName: string;

  /**
   * Render contract base (pure data)
   */
  visibility: "show" | "hide";
  layout: "row" | "center-focus" | "w-overlap" | "grid" | "none";

  /**
   * CRITICAL ADDITION:
   * Hard constraint for renderer/compiler
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