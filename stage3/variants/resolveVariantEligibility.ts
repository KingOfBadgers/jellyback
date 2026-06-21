"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT ELIGIBILITY ENGINE
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Determines which variants are legal for a composition seed.
 *
 * This is the ONLY place allowed to inspect seed assets.
 *
 * RULES
 * ---------------------------------------------------------
 * - seed inspection allowed
 * - NO UI logic
 * - NO renderer logic
 * - NO positioning logic
 *
 * DATE: 2026-06-20
 * =========================================================
 */

import {
  variantRegistry,
  VariantDefinition,
} from "@/stage3/variants/variantRegistry";

type EligibilityResult = {
  actors: VariantDefinition[];
  logo: VariantDefinition[];
  collage: VariantDefinition[];
};

export function resolveVariantEligibility(
  seed: any
): EligibilityResult {
  const actorCount = seed?.assets?.actors?.length ?? 0;
  const hasLogo = Boolean(seed?.assets?.logo);

  console.log("[STAGE3 ELIGIBILITY]", {
    movieId: seed?.movieId,
    actorCount,
    hasLogo,
  });

  const actors = Object.values(variantRegistry).filter((variant) => {
    if (variant.layer !== "actors") return false;

    if (variant.id === "ACTOR_1_CENTER")
      return actorCount === 1;

    if (variant.id === "ACTOR_3_CENTER_FOCUS")
      return actorCount === 3;

    if (variant.id === "ACTOR_5_ROW")
      return actorCount === 5;

    if (variant.id === "ACTOR_5_W_OVERLAP")
      return actorCount === 5;

    return false;
  });

  const logo = Object.values(variantRegistry).filter((variant) => {
    if (variant.layer !== "logo") return false;

    if (variant.id === "LOGO_STANDARD")
      return hasLogo;

    return false;
  });

  const collage = Object.values(variantRegistry).filter((variant) => {
    return variant.layer === "collage";
  });

  console.log("[STAGE3 ELIGIBILITY][RESULT]", {
    actors: actors.map((v) => v.id),
    logo: logo.map((v) => v.id),
    collage: collage.map((v) => v.id),
  });

  return {
    actors,
    logo,
    collage,
  };
}