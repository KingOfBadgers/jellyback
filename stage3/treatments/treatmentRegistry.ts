"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — TREATMENT REGISTRY (CANONICAL)
 * =========================================================
 *
 * DATE: 2026-07-09
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Canonical registry for ALL user-selectable treatments.
 *
 * IMPORTANT:
 * ---------------------------------------------------------
 * This registry defines available choices only.
 *
 * It contains:
 *
 * - treatment definitions
 * - UI labels
 * - valid layer availability
 *
 * It does NOT contain:
 *
 * - automatic assignments
 * - variant relationships
 * - rendering logic
 * - CSS logic
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
  | "logo"
  | "banner"
  | "background";


/**
 * =========================================================
 * TREATMENT IDS
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

  /**
   * =====================================================
   * BACKGROUND TREATMENTS
   *
   * CHANGE: 2026-07-09
   *
   * Added user-selectable canonical
   * background treatments.
   *
   * These map directly to CSS semantic
   * identifiers:
   *
   * BACKGROUND_*
   *
   * No automatic selection occurs.
   * =====================================================
   */

  | "BACKGROUND_VIGNETTE"
  | "BACKGROUND_THEATRE"
  | "BACKGROUND_SOFT_FOCUS"
  | "BACKGROUND_FILM_GRAIN"
  | "BACKGROUND_WARM_GRADE"
  | "BACKGROUND_COOL_GRADE"
  | "BACKGROUND_STEELBOOK"
  | "BACKGROUND_CRITERION";



/**
 * =========================================================
 * TREATMENT DEFINITION
 * =========================================================
 */

export type TreatmentDefinition = {

  id: TreatmentId;

  displayName: string;

  layers: TreatmentLayer[];

  category:
    | "edges"
    | "depth"
    | "contrast"
    | "field"
    | "background";

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

  layers:[
    "actors",
    "collage",
    "banner"
  ],

  category:"edges",

},


hardEdges: {

  id:"hardEdges",

  displayName:"Hard Edges",

  layers:[
    "actors",
    "logo",
    "banner"
  ],

  category:"edges",

},



/**
 * =====================================================
 * VIGNETTE
 * =====================================================
 */

vignetteLight: {

  id:"vignetteLight",

  displayName:"Vignette Light",

  layers:[
    "collage",
  ],

  category:"field",

},


vignetteHeavy: {

  id:"vignetteHeavy",

  displayName:"Vignette Heavy",

  layers:[
    "collage",
  ],

  category:"field",

},



/**
 * =====================================================
 * DEPTH
 * =====================================================
 */

depthFloat: {

  id:"depthFloat",

  displayName:"Depth Float",

  layers:[
    "actors",
    "collage",
  ],

  category:"depth",

},


depthFlat: {

  id:"depthFlat",

  displayName:"Depth Flat",

  layers:[
    "actors",
    "logo",
  ],

  category:"depth",

},



/**
 * =====================================================
 * CONTRAST
 * =====================================================
 */

contrastBoost: {

  id:"contrastBoost",

  displayName:"Contrast Boost",

  layers:[
    "actors",
    "logo",
    "collage",
  ],

  category:"contrast",

},


contrastSoft: {

  id:"contrastSoft",

  displayName:"Contrast Soft",

  layers:[
    "actors",
    "collage",
  ],

  category:"contrast",

},



/**
 * =====================================================
 * FIELD SYSTEM
 * =====================================================
 */

fieldBlend: {

  id:"fieldBlend",

  displayName:"Field Blend",

  layers:[
    "collage",
  ],

  category:"field",

},


fieldSeparation: {

  id:"fieldSeparation",

  displayName:"Field Separation",

  layers:[
    "collage",
  ],

  category:"field",

},



/**
 * =====================================================
 * BACKGROUND TREATMENTS
 *
 * CHANGE: 2026-07-09
 *
 * Added canonical background treatment
 * choices.
 *
 * User selects these manually.
 * No intelligence is applied.
 * =====================================================
 */


BACKGROUND_VIGNETTE: {

  id:"BACKGROUND_VIGNETTE",

  displayName:"Background Vignette",

  layers:[
    "background",
  ],

  category:"background",

},


BACKGROUND_THEATRE: {

  id:"BACKGROUND_THEATRE",

  displayName:"Theatre Lighting",

  layers:[
    "background",
  ],

  category:"background",

},


BACKGROUND_SOFT_FOCUS: {

  id:"BACKGROUND_SOFT_FOCUS",

  displayName:"Soft Focus",

  layers:[
    "background",
  ],

  category:"background",

},


BACKGROUND_FILM_GRAIN: {

  id:"BACKGROUND_FILM_GRAIN",

  displayName:"Film Grain",

  layers:[
    "background",
  ],

  category:"background",

},


BACKGROUND_WARM_GRADE: {

  id:"BACKGROUND_WARM_GRADE",

  displayName:"Warm Grade",

  layers:[
    "background",
  ],

  category:"background",

},


BACKGROUND_COOL_GRADE: {

  id:"BACKGROUND_COOL_GRADE",

  displayName:"Cool Grade",

  layers:[
    "background",
  ],

  category:"background",

},


BACKGROUND_STEELBOOK: {

  id:"BACKGROUND_STEELBOOK",

  displayName:"Steelbook",

  layers:[
    "background",
  ],

  category:"background",

},


BACKGROUND_CRITERION: {

  id:"BACKGROUND_CRITERION",

  displayName:"Criterion",

  layers:[
    "background",
  ],

  category:"background",

},


};



/**
 * =========================================================
 * LAYER FILTER HELPER
 * =========================================================
 *
 * PURE FILTER ONLY
 *
 * No intelligence.
 *
 * =========================================================
 */

export function getTreatmentsForLayer(
  layer: TreatmentLayer
): TreatmentDefinition[] {


  const treatments =
    Object.values(
      treatmentRegistry
    ).filter(
      (treatment) =>
        treatment.layers.includes(
          layer
        )
    );


  console.log(
    "[TREATMENT REGISTRY][FILTER]",
    {
      layer,
      count:
        treatments.length,

      ids:
        treatments.map(
          (t) => t.id
        ),
    }
  );


  return treatments;

}