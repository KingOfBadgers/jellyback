import { VARIANT_REGISTRY, VariantContract } from "./variantRegistry";
import { VariantSelection } from "@/stage3/store/compositionStore";

/**
 * =========================================================
 * PURE LOOKUP RESOLVER (NO LOGIC)
 * =========================================================
 */

export function resolveVariantContract(
  variant: VariantSelection
): VariantContract {
  const key = variant ?? "NONE";

  const resolved = VARIANT_REGISTRY[key];

  if (!resolved) {
    return VARIANT_REGISTRY.NONE;
  }

  return resolved;
}