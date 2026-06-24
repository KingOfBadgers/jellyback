"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — TREATMENT REGISTRY (CANONICAL)
 * =========================================================
 *
 * DATE: 2026-06-23
 * TIME: 08:10
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Canonical registry for ALL user-selectable treatments.
 *
 * IMPORTANT ARCHITECTURAL CHANGE:
 * ---------------------------------------------------------
 * This REPLACES:
 *
 *   variantTreatmentMap.ts
 *
 * Previous architecture:
 *
 *   variant → automatic treatment assignment
 *
 * This violated:
 *
 *   JELLYBACK LAW 1
 *
 * Stage 3 must NEVER contain intelligence.
 *
 * NEW ARCHITECTURE:
 *
 *   user explicitly selects treatments
 *
 * This registry defines AVAILABLE CHOICES ONLY.
 *
 * RULES:
 * ---------------------------------------------------------
 * - NO automatic assignment logic
 * - NO variant relationships
 * - NO rendering logic
 * - NO CSS logic
 * - NO hidden intelligence
 *
 * ONLY:
 *
 * treatment definitions
 *
 * =========================================================
 */

/**
 * =========================================================
 * CORE TYPES
 * =========================================================
 */

export type TreatmentLayer =
  | "actors"
  | "collage"
  | "logo";

/**
 * =========================================================
 * TREATMENT IDS
 * =========================================================
 *
 * NOTE:
 * Keep intentionally constrained.
 *
 * Too many visual permutations will create
 * uncontrolled design explosion.
 * =========================================================
 */

export type TreatmentId =
  | "softEdges"
  | "hardEdges"
  | "vignetteLight"
  | "vignetteHeavy"
  | "depthFloat"
  | "depthFlat"
  | "contrastBoost"
  | "contrastSoft"
  | "fieldBlend"
  | "fieldSeparation"
  | "spacingTight"
  | "spacingLoose";

/**
 * =========================================================
 * TREATMENT DEFINITION
 * =========================================================
 */

export type TreatmentDefinition = {
  /**
   * Canonical ID
   */

  id: TreatmentId;

  /**
   * UI Display Name
   */

  displayName: string;

  /**
   * Which composition layers
   * this treatment is allowed to target
   */

  layers: TreatmentLayer[];

  /**
   * Grouping for future UI organisation
   */

  category:
    | "edges"
    | "depth"
    | "contrast"
    | "field"
    | "spacing";
};

/**
 * =========================================================
 * CANONICAL REGISTRY
 * =========================================================
 */

export const treatmentRegistry: Record<
  TreatmentId,
  TreatmentDefinition
> = {
  /**
   * =====================================================
   * EDGE TREATMENTS
   * =====================================================
   */

  softEdges: {
    id: "softEdges",

    displayName: "Soft Edges",

    layers: [
      "actors",
      "collage",
    ],

    category: "edges",
  },

  hardEdges: {
    id: "hardEdges",

    displayName: "Hard Edges",

    layers: [
      "actors",
      "logo",
    ],

    category: "edges",
  },

  /**
   * =====================================================
   * VIGNETTE
   * =====================================================
   */

  vignetteLight: {
    id: "vignetteLight",

    displayName: "Vignette Light",

    layers: [
      "collage",
    ],

    category: "field",
  },

  vignetteHeavy: {
    id: "vignetteHeavy",

    displayName: "Vignette Heavy",

    layers: [
      "collage",
    ],

    category: "field",
  },

  /**
   * =====================================================
   * DEPTH
   * =====================================================
   */

  depthFloat: {
    id: "depthFloat",

    displayName: "Depth Float",

    layers: [
      "actors",
      "collage",
    ],

    category: "depth",
  },

  depthFlat: {
    id: "depthFlat",

    displayName: "Depth Flat",

    layers: [
      "actors",
      "logo",
    ],

    category: "depth",
  },

  /**
   * =====================================================
   * CONTRAST
   * =====================================================
   */

  contrastBoost: {
    id: "contrastBoost",

    displayName: "Contrast Boost",

    layers: [
      "actors",
      "logo",
      "collage",
    ],

    category: "contrast",
  },

  contrastSoft: {
    id: "contrastSoft",

    displayName: "Contrast Soft",

    layers: [
      "actors",
      "collage",
    ],

    category: "contrast",
  },

  /**
   * =====================================================
   * FIELD SYSTEM
   * =====================================================
   */

  fieldBlend: {
    id: "fieldBlend",

    displayName: "Field Blend",

    layers: [
      "collage",
    ],

    category: "field",
  },

  fieldSeparation: {
    id: "fieldSeparation",

    displayName: "Field Separation",

    layers: [
      "collage",
    ],

    category: "field",
  },

  /**
   * =====================================================
   * SPACING
   * =====================================================
   */

  spacingTight: {
    id: "spacingTight",

    displayName: "Spacing Tight",

    layers: [
      "actors",
      "collage",
    ],

    category: "spacing",
  },

  spacingLoose: {
    id: "spacingLoose",

    displayName: "Spacing Loose",

    layers: [
      "actors",
      "collage",
    ],

    category: "spacing",
  },
};

/**
 * =========================================================
 * LAYER FILTER HELPER
 * =========================================================
 *
 * PURPOSE:
 * UI convenience helper.
 *
 * Returns all treatments valid for
 * a particular composition layer.
 *
 * NO intelligence.
 * Pure filtering only.
 *
 * =========================================================
 */

export function getTreatmentsForLayer(
  layer: TreatmentLayer
): TreatmentDefinition[] {
  const treatments =
    Object.values(
      treatmentRegistry
    ).filter((treatment) =>
      treatment.layers.includes(
        layer
      )
    );

  console.log(
    "[TREATMENT REGISTRY][FILTER]",
    {
      layer,
      count: treatments.length,
      ids: treatments.map(
        (t) => t.id
      ),
    }
  );

  return treatments;
}