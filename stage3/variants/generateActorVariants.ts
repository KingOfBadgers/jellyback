"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3
 * ACTOR VARIANT GENERATOR (V1 SCHEMA LOCKED)
 * =========================================================
 */

import type { VariantOption } from "./VariantOption";

export function generateActorVariants(seed: any): VariantOption[] {
  const actors = seed?.assets?.actors || [];

  console.log("[STAGE3][ACTORS][GENERATOR] START", {
    movieId: seed?.movieId,
    actorCount: actors.length,
  });

  const candidates: VariantOption[] = [
    {
      id: "actor-five-strip",
      label: "Five Strip",
      layer: "actors",
      layoutId: "FIVE_STRIP",
      requires: { minActors: 5 },
      group: "cinematic",
      renderMode: "css",
    },

    {
      id: "actor-hero-triptych",
      label: "Hero Triptych",
      layer: "actors",
      layoutId: "HERO_TRIPTYCH",
      requires: { minActors: 3 },
      group: "cinematic",
      renderMode: "css",
    },

    {
      id: "actor-contact-sheet",
      label: "Contact Sheet",
      layer: "actors",
      layoutId: "CONTACT_SHEET",
      requires: { minActors: 6 },
      group: "editorial",
      renderMode: "css",
    },
  ];

  const filtered = candidates.filter((v) => {
    return (
      v.requires?.minActors === undefined ||
      actors.length >= v.requires.minActors
    );
  });

  console.log("[STAGE3][ACTORS][GENERATOR] RESULT", {
    input: candidates.length,
    output: filtered.length,
  });

  return filtered;
}