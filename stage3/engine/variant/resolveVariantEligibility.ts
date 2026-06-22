"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT ELIGIBILITY ENGINE
 * =========================================================
 *
 * CHANGE:
 * ---------------------------------------------------------
 * Date: 2026-06-22
 *
 * CHANGE SUMMARY
 * ---------------------------------------------------------
 * Added collage eligibility filtering.
 *
 * REASON
 * ---------------------------------------------------------
 * Collage variants now follow identical deterministic
 * asset-capacity rules as actor variants.
 *
 * RULE
 * ---------------------------------------------------------
 * Variant eligible when:
 *
 *      maxAssets <= available asset count
 *
 * Applied independently to:
 *
 * - actors      → seed.assets.actors
 * - collage     → seed.assets.backdrops
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
 * HELPERS
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
  const backdropCount = seed?.assets?.backdrops?.length ?? 0;

  console.log("[STAGE3][ELIGIBILITY][INPUT]", {
    actorsCount,
    backdropCount,
    hasLogo: isLogoSeedValid(seed),
  });

  /**
   * =========================================================
   * ACTORS
   * =========================================================
   */

  const actors: EligibleVariant[] = Object.values(variantRegistry)
    .filter((v: any) => v.layer === "actors")
    .filter((v: any) => {
      const max = v.maxAssets ?? 0;
      const isEligible = max > 0 && max <= actorsCount;

      if (!isEligible) {
        console.log("[STAGE3][ELIGIBILITY][REJECT ACTOR VARIANT]", {
          variant: v.id,
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
   * COLLAGE
   * =========================================================
   *
   * CHANGE: 2026-06-22
   *
   * Mirrors actor eligibility pipeline.
   *
   * Collage variants are constrained by available
   * backdrop asset count.
   */

  const collage: EligibleVariant[] = Object.values(variantRegistry)
    .filter((v: any) => v.layer === "collage")
    .filter((v: any) => {
      const max = v.maxAssets ?? 0;
      const isEligible = max > 0 && max <= backdropCount;

      if (!isEligible) {
        console.log("[STAGE3][ELIGIBILITY][REJECT COLLAGE VARIANT]", {
          variant: v.id,
          maxAssets: max,
          backdropCount,
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
   * LOGO
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
   * ALWAYS PROVIDE NONE
   */

  const noneVariant = (variantRegistry as any).NONE;

  logo.push({
    id: noneVariant.id,
    displayName: noneVariant.displayName,
  });

  /**
   * FINAL TRACE
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