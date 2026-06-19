/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT CONTRACT RESOLVER
 * =========================================================
 *
 * CHANGE (2026-06-19)
 * -------------------
 * - REMOVED internal variant map duplication
 * - NOW uses variantMap as single source of truth
 * - Eliminates drift between UI / resolver / registry
 *
 * RULE
 * ----
 * If it's not in variantMap → it is invalid → hide
 * =========================================================
 */

import type { VariantSelection } from "@/stage3/store/compositionStore";
import { variantMap } from "@/stage3/variants/variantMap";

export type VariantVisibility = "show" | "hide";

export type VariantLayout =
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "none";

export type VariantContract = {
  visibility: VariantVisibility;
  layout: VariantLayout;
  raw: VariantSelection;
  debug: {
    resolvedAt: number;
    reason: string;
  };
};

/**
 * =========================================================
 * RESOLVER (REGISTRY DRIVEN)
 * =========================================================
 */

export function resolveVariantContract(
  variant: VariantSelection
): VariantContract {
  const resolved = variant ? variantMap[variant] : undefined;

  if (!resolved) {
    console.log("[STAGE3 RESOLVER][MISS]", variant);

    return {
      raw: variant,
      visibility: "hide",
      layout: "none",
      debug: {
        resolvedAt: Date.now(),
        reason: "not_in_variant_registry",
      },
    };
  }

  return {
    raw: variant,
    visibility: "show",
    layout: mapLayerToLayout(resolved.layer),
    debug: {
      resolvedAt: Date.now(),
      reason: "resolved_from_variant_map",
    },
  };
}

/**
 * =========================================================
 * LAYER → LAYOUT NORMALISATION
 * =========================================================
 */

function mapLayerToLayout(layer: string): VariantLayout {
  switch (layer) {
    case "actors":
      return "center-focus";
    case "logo":
      return "row";
    case "collage":
      return "grid";
    default:
      return "none";
  }
}