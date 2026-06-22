"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT ELIGIBILITY ENGINE
 * =========================================================
 *
 * CHANGE:
 * ---------------------------------------------------------
 * Date: 2026-06-22
 * Time: 00:00 (UTC reference - adjust if needed)
 *
 * CHANGE SUMMARY:
 * - Replaced discrete actorCount branching logic
 * - Implemented registry-driven inclusive capacity filter
 * - Eligibility now returns ALL variants where:
 *      maxAssets <= available actor count
 *
 * REASON:
 * - Previous implementation used hard-coded tiers (1, 3, >=5)
 * - This caused missing intermediate eligibility states
 * - System now aligns with intended "progressive inclusion rule"
 *
 * RULE APPLIED:
 * ---------------------------------------------------------
 * “All variants where required capacity ≤ available actors”
 *
 * =========================================================
 */

import { variantRegistry } from "@/stage3/variants/variantRegistry";

/**
 * =========================================================
 * TYPES
 * =========================================================
 */

export type EligibleVariant = {
  id: string;
  displayName: string;
};

export type EligibilityContract = {
  actors: EligibleVariant[];
  collage: EligibleVariant[];
  logo: EligibleVariant[];
};

/**
 * =========================================================
 * SEED VALIDATION HELPERS
 * =========================================================
 */

function isLogoSeedValid(seed: any) {
  return Boolean(seed?.assets?.logo);
}

/**
 * =========================================================
 * MAIN ENGINE
 * =========================================================
 */

export function resolveVariantEligibility(seed: any): EligibilityContract {
  const actorsCount = seed?.assets?.actors?.length ?? 0;

  console.log("[STAGE3][ELIGIBILITY][INPUT]", {
    actorsCount,
    hasLogo: isLogoSeedValid(seed),
    hasCollage: Boolean(seed?.assets?.collage),
  });

  /**
   * =========================================================
   * ACTORS (INCLUSIVE CAPACITY FILTER — CORE FIX)
   * =========================================================
   *
   * RULE:
   * - include ALL variants where maxAssets <= actorsCount
   * - no hard-coded branching
   */
  const actors: EligibleVariant[] = Object.values(variantRegistry)
    .filter((v: any) => v.layer === "actors")
    .filter((v: any) => {
      const max = v.maxAssets ?? 0;

      const isEligible = max > 0 && max <= actorsCount;

      if (!isEligible) {
        console.log("[STAGE3][ELIGIBILITY][REJECT ACTOR VARIANT]", {
          variant: v.id,
          reason: "maxAssets > actorsCount",
          maxAssets: max,
          actorsCount,
        });
      }

      return isEligible;
    })
    .map((v: any) => ({
      id: v.id,
      displayName: v.displayName,
    }));

  /**
   * =========================================================
   * COLLAGE (STUB - FUTURE EXTENSION)
   * =========================================================
   */
  const collage: EligibleVariant[] = Object.values(variantRegistry)
    .filter((v: any) => v.layer === "collage")
    .map((v: any) => ({
      id: v.id,
      displayName: v.displayName,
    }));

  /**
   * =========================================================
   * LOGO (SIMPLE PRESENCE RULE)
   * =========================================================
   */
  const logo: EligibleVariant[] = [];

  if (isLogoSeedValid(seed)) {
    const logoVariant = (variantRegistry as any).LOGO_STANDARD;

    if (logoVariant) {
      logo.push({
        id: logoVariant.id,
        displayName: logoVariant.displayName,
      });
    }
  }

  /**
   * ALWAYS provide fallback NONE state
   */
  const noneVariant = (variantRegistry as any).NONE;

  logo.push({
    id: noneVariant.id,
    displayName: noneVariant.displayName,
  });

  /**
   * =========================================================
   * FINAL OUTPUT + TRACE
   * =========================================================
   */

  const result = {
    actors,
    collage,
    logo,
  };

  console.log("[STAGE3][ELIGIBILITY][RESULT]", {
    actors: actors.map((v) => v.id),
    collage: collage.map((v) => v.id),
    logo: logo.map((v) => v.id),
  });

  console.log("[STAGE3][ELIGIBILITY][FINAL RETURN OBJECT]", result);

  return result;
}