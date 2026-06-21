"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — CONTRACT RESOLVER (REGISTRY SAFE)
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Converts selected variant IDs into a fully deterministic
 * renderer-safe contract using variantRegistry as source of truth.
 *
 * RULES
 * ---------------------------------------------------------
 * - NO legacy maps
 * - NO partial returns
 * - NO undefined fields
 * - ALWAYS resolve from registry OR fallback NONE
 *
 * DATE: 2026-06-20
 * =========================================================
 */

import { variantRegistry, VariantId } from "@/stage3/variants/variantRegistry";

export type VariantRenderContract = {
  visibility: "show" | "hide";
  layout: "row" | "center-focus" | "w-overlap" | "grid" | "none";
  raw: string;
  id: string;
  debug: {
    resolvedAt: number;
    source: "registry" | "fallback";
  };
};

/**
 * Safe fallback contract (NEVER undefined)
 */
const FALLBACK_CONTRACT: VariantRenderContract = {
  visibility: "hide",
  layout: "none",
  raw: "NONE",
  id: "NONE",
  debug: {
    resolvedAt: Date.now(),
    source: "fallback",
  },
};

/**
 * =========================================================
 * RESOLVER
 * =========================================================
 */
export function resolveVariantContract(
  variant: string | null | undefined
): VariantRenderContract {
  if (!variant) {
    return FALLBACK_CONTRACT;
  }

  const entry = variantRegistry[variant as VariantId];

  if (!entry) {
    return FALLBACK_CONTRACT;
  }

  return {
    visibility: entry.visibility,
    layout: entry.layout,
    raw: entry.id,
    id: entry.id,
    debug: {
      resolvedAt: Date.now(),
      source: "registry",
    },
  };
}