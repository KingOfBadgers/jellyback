"use client";

import { variantRegistry } from "@/stage3/variants/variantRegistry";

/**
 * =========================================================
 * STAGE 3 — UNIFIED VARIANT CONTRACT BUILDER
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Collapses:
 * - eligibility output
 * - registry definition
 * INTO ONE render-safe contract
 *
 * This becomes the ONLY truth renderer consumes.
 *
 * =========================================================
 */

export type VariantRenderContract = {
  id: string;
  layer: "actors" | "collage" | "logo";
  visibility: "show" | "hide";
  layout: "row" | "center-focus" | "w-overlap" | "grid" | "none";
  displayName: string;
};

/**
 * ---------------------------------------------------------
 * BUILD CONTRACT
 * ---------------------------------------------------------
 */

export function buildVariantContract(variantId: string | null): VariantRenderContract {
  if (!variantId) {
    return {
      id: "NONE",
      layer: "actors",
      visibility: "hide",
      layout: "none",
      displayName: "None",
    };
  }

  const def = variantRegistry[variantId as keyof typeof variantRegistry];

  if (!def) {
    return {
      id: "NONE",
      layer: "actors",
      visibility: "hide",
      layout: "none",
      displayName: "None",
    };
  }

  return {
    id: def.id,
    layer: def.layer,
    visibility: def.visibility,
    layout: def.layout,
    displayName: def.displayName,
  };
}