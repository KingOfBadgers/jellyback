"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT ELIGIBILITY ENGINE (DIAGNOSTIC)
 * =========================================================
 *
 * CHANGE (2026-06-21)
 * ------------------
 * ADDED:
 * - Full eligibility trace logging
 * - Explicit "why empty" reasoning per layer
 *
 * PURPOSE:
 * - Make variant rejection observable
 * - Enable deterministic debugging of missing UI states
 *
 * NOTE:
 * - NO behavioural changes introduced
 * - ONLY diagnostics added
 * =========================================================
 */

import { variantRegistry } from "@/stage3/variants/variantRegistry";

export function resolveVariantEligibility(seed: any) {
  const actorCount = seed?.assets?.actors?.length ?? 0;
  const hasLogo = !!seed?.assets?.logo;
  const hasCollage = !!seed?.assets?.collage;

  console.log("[STAGE3][ELIGIBILITY][INPUT]", {
    actorCount,
    hasLogo,
    hasCollage,
  });

  /**
   * =========================================================
   * ACTOR VARIANTS
   * =========================================================
   */

  const actorVariants = Object.values(variantRegistry).filter(
    (v: any) => v.layer === "actors"
  );

  const eligibleActors = actorVariants.filter((v: any) => {
    const max = v.maxAssets ?? Infinity;

    const ok = max <= actorCount;

    if (!ok) {
      console.log("[STAGE3][ELIGIBILITY][REJECT ACTOR VARIANT]", {
        variant: v.id,
        reason: "actorCount > maxAssets",
        actorCount,
        maxAssets: max,
      });
    }

    return ok;
  });

  if (eligibleActors.length === 0) {
    console.warn("[STAGE3][ELIGIBILITY][NO ACTOR VARIANTS]", {
      reason: "No actor variants passed constraints",
      actorCount,
      checked: actorVariants.map((v: any) => ({
        id: v.id,
        maxAssets: v.maxAssets,
      })),
    });
  }

  /**
   * =========================================================
   * LOGO VARIANTS
   * =========================================================
   */

  const logoVariants = Object.values(variantRegistry).filter(
    (v: any) => v.layer === "logo"
  );

  const eligibleLogo = logoVariants.filter((v: any) => {
    const ok = hasLogo ? true : v.visibility !== "show";

    if (!ok) {
      console.log("[STAGE3][ELIGIBILITY][REJECT LOGO VARIANT]", {
        variant: v.id,
        reason: "no logo present but variant requires logo",
      });
    }

    return ok;
  });

  if (eligibleLogo.length === 0) {
    console.warn("[STAGE3][ELIGIBILITY][NO LOGO VARIANTS]", {
      reason: "No logo variants available",
      hasLogo,
    });
  }

  /**
   * =========================================================
   * COLLAGE VARIANTS
   * =========================================================
   */

  const collageVariants = Object.values(variantRegistry).filter(
    (v: any) => v.layer === "collage"
  );

  const eligibleCollage = collageVariants.filter((v: any) => {
    const ok = hasCollage ? true : v.visibility !== "show";

    if (!ok) {
      console.log("[STAGE3][ELIGIBILITY][REJECT COLLAGE VARIANT]", {
        variant: v.id,
        reason: "no collage present but variant requires it",
      });
    }

    return ok;
  });

  if (eligibleCollage.length === 0) {
    console.warn("[STAGE3][ELIGIBILITY][NO COLLAGE VARIANTS]", {
      reason: "No collage variants available",
      hasCollage,
    });
  }

  /**
   * =========================================================
   * FINAL OUTPUT
   * =========================================================
   */

  const result = {
    actors: eligibleActors,
    logo: eligibleLogo,
    collage: eligibleCollage,
  };

  console.log("[STAGE3][ELIGIBILITY][RESULT]", {
    actors: eligibleActors.map((v: any) => v.id),
    logo: eligibleLogo.map((v: any) => v.id),
    collage: eligibleCollage.map((v: any) => v.id),
  });

  console.log(
  "[ELIGIBILITY FINAL RETURN]",
  result
);

console.log(
  "[ELIGIBILITY ACTOR IDS]",
  result.actors.map((v: any) => ({
    id: v.id,
    displayName: v.displayName,
    layer: v.layer,
    maxAssets: v.maxAssets
  }))
);

  return result;
}