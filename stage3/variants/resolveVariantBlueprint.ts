/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT RESOLVER
 * =========================================================
 *
 * PURPOSE
 * -------
 * Converts a selected variant ID into a deterministic
 * layout blueprint for the renderer.
 *
 * RULES
 * -----
 * - NO inference
 * - NO computation
 * - NO fallback logic chains
 * - ONLY direct lookup
 *
 * If a variant does not exist, return null.
 * =========================================================
 */

import { variantMap } from "./variantMap";
import type { LayoutBlueprint } from "./variantMap";

/**
 * Resolve a single variant into a blueprint
 */
export function resolveVariantBlueprint(
  variantId: string | null
): LayoutBlueprint | null {
  if (!variantId) return null;

  const blueprint = variantMap[variantId];

  if (!blueprint) {
    console.warn(
      "[STAGE3 VARIANT RESOLVER] Unknown variant:",
      variantId
    );
    return null;
  }

  console.log(
    "[STAGE3 VARIANT RESOLVER] Resolved:",
    variantId,
    blueprint.layer,
    blueprint.type
  );

  return blueprint;
}

/**
 * Resolve multiple layers (future-proofing)
 */
export function resolveVariantBlueprints(input: {
  actors?: string | null;
  collage?: string | null;
  logo?: string | null;
}) {
  return {
    actors: resolveVariantBlueprint(input.actors ?? null),
    collage: resolveVariantBlueprint(input.collage ?? null),
    logo: resolveVariantBlueprint(input.logo ?? null),
  };
}