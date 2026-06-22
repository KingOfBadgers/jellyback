"use client";

import { variantRegistry, VariantId } from "@/stage3/variants/variantRegistry";

/**
 * =========================================================
 * STAGE 3 — UNIFIED VARIANT CONTRACT BUILDER
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Converts registry entry → render-safe deterministic contract
 *
 * RULES
 * ---------------------------------------------------------
 * - Registry is single source of truth
 * - No computed layout logic
 * - No UI assumptions
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
 * =========================================================
 * FALLBACK CONTRACT (NEVER INVALID)
 * =========================================================
 */
const FALLBACK: VariantRenderContract = {
  id: "NONE",
  layer: "actors",
  visibility: "hide",
  layout: "none",
  displayName: "None",
};

/**
 * =========================================================
 * BUILD CONTRACT
 * =========================================================
 */
export function buildVariantContract(
  variantId: string | null
): VariantRenderContract {
  if (!variantId) return FALLBACK;

  const def = variantRegistry[variantId as VariantId];

  if (!def) return FALLBACK;

  return {
    id: def.id,
    layer: def.layer,
    visibility: def.visibility,
    layout: def.layout,
    displayName: def.displayName,
  };
}