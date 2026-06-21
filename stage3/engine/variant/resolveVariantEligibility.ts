"use client";

import { variantRegistry } from "@/stage3/variants/variantRegistry";

/**
 * =========================================================
 * JELLYFIN BACK COVER — VARIANT ELIGIBILITY ENGINE
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Determines WHICH variants are allowed for a given seed.
 *
 * This is NOT UI logic.
 * This is NOT rendering logic.
 * This is NOT layout logic.
 *
 * It is a strict filtering layer.
 *
 * OUTPUT = UI SAFE OPTIONS ONLY
 *
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

function isActorSeedValid(seed: any) {
  return (seed?.assets?.actors?.length ?? 0) > 0;
}

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

  const actors: EligibleVariant[] = [];
  const collage: EligibleVariant[] = [];
  const logo: EligibleVariant[] = [];

  /**
   * -----------------------------------------------------
   * ACTORS
   * -----------------------------------------------------
   */
  if (actorsCount === 1) {
    actors.push({
      id: "ACTOR_1_CENTER",
      displayName: variantRegistry.ACTOR_1_CENTER.displayName,
    });
  }

  if (actorsCount === 3) {
    actors.push({
      id: "ACTOR_3_CENTER_FOCUS",
      displayName: variantRegistry.ACTOR_3_CENTER_FOCUS.displayName,
    });
  }

  if (actorsCount >= 5) {
    actors.push(
      {
        id: "ACTOR_5_ROW",
        displayName: variantRegistry.ACTOR_5_ROW.displayName,
      },
      {
        id: "ACTOR_5_W_OVERLAP",
        displayName: variantRegistry.ACTOR_5_W_OVERLAP.displayName,
      }
    );
  }

  /**
   * -----------------------------------------------------
   * COLLAGE (stubbed future-proof)
   * -----------------------------------------------------
   */
  collage.push({
    id: "NONE",
    displayName: variantRegistry.NONE.displayName,
  });

  /**
   * -----------------------------------------------------
   * LOGO
   * -----------------------------------------------------
   */
  if (isLogoSeedValid(seed)) {
    logo.push({
      id: "LOGO_STANDARD",
      displayName: variantRegistry.LOGO_STANDARD.displayName,
    });
  }

  logo.push({
    id: "NONE",
    displayName: variantRegistry.NONE.displayName,
  });

  return {
    actors,
    collage,
    logo,
  };
}