import { actorVariants } from "./actorVariants";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT FILTER
 * =========================================================
 *
 * PURPOSE
 * -------
 * Filter valid variants based on seed constraints.
 *
 * RULE:
 * - No scoring
 * - No ranking
 * - No optimization
 * - ONLY validity filtering
 * =========================================================
 */

export function resolveActorVariants(seed: any) {
  const actorCount =
    seed?.assets?.actors?.length ?? 0;

  console.log("[STAGE3 VARIANTS] actorCount:", actorCount);

  const valid = actorVariants.filter(
    (v) => v.requiredActors === actorCount
  );

  console.log("[STAGE3 VARIANTS] valid variants:", valid.map(v => v.id));

  return valid;
}