"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSITION ENGINE (NEW CORE)
 * =========================================================
 *
 * PURPOSE
 * ---
 * This is the SINGLE entry point for Stage 3 composition.
 *
 * It converts a frozen Stage 2.5 BorderSeed into:
 *
 *   1. Canvas Composition (visual scene)
 *   2. Metadata Strip Composition (DVD-style 1000x100 bar)
 *
 * IMPORTANT:
 * - NO rendering here
 * - NO React here
 * - NO DOM assumptions
 * - PURE deterministic composition output only
 *
 * This is the "film editor" layer of JellyBack.
 * =========================================================
 */

import type { BorderSeed } from "@/stage25/store/compositionBorderStore";
import {
  buildMetadataRenderPlan,
  type MetadataRenderPlan,
} from "@/stage3/metadata/buildMetadataRenderPlan";

/**
 * =========================================================
 * STAGE 3 OUTPUT TYPES
 * =========================================================
 */

export type Stage3CanvasVariant =
  | "DEFAULT"
  | "DENSE"
  | "MINIMAL"
  | "CINEMATIC";

export type Stage3CanvasComposition = {
  movieId: string;

  variant: Stage3CanvasVariant;

  /**
   * Raw seed passed through for now.
   * Later this will be transformed into structured layers.
   */
  seed: BorderSeed;

  /**
   * Composition decision metadata (no rendering logic)
   */
  layers: {
    background: boolean;
    actors: boolean;
    collage: boolean;
    logo: boolean;
  };

  /**
   * Simple heuristic metadata for future variant expansion
   */
  actorCount: number;
  backdropCount: number;
};

export type Stage3MetadataStrip = MetadataRenderPlan;

export type Stage3Output = {
  movieId: string;

  /**
   * Canvas scene (poster composition)
   */
  canvas: Stage3CanvasComposition;

  /**
   * Independent metadata strip asset (1000x100)
   */
  metadataStrip: Stage3MetadataStrip;

  /**
   * Debug trace for deterministic validation
   */
  _debug: {
    traceId: string;
    timestamp: number;
  };
};

/**
 * =========================================================
 * CANVAS VARIANT SELECTION (TEMPORARY HEURISTIC)
 * =========================================================
 *
 * This will later be replaced by treatment/placement system.
 * For now it stabilises Stage 3 output structure.
 */
function selectCanvasVariant(seed: BorderSeed): Stage3CanvasVariant {
  const actorCount = seed.assets?.actors?.length ?? 0;
  const backdropCount = seed.assets?.backdrops?.length ?? 0;

  if (actorCount > 12 || backdropCount > 5) return "DENSE";
  if (actorCount < 3) return "MINIMAL";

  if (seed.assets?.logo && backdropCount > 1) return "CINEMATIC";

  return "DEFAULT";
}

/**
 * =========================================================
 * CANVAS COMPOSITION BUILDER
 * =========================================================
 */
function buildCanvasComposition(seed: BorderSeed): Stage3CanvasComposition {
  const actorCount = seed.assets?.actors?.length ?? 0;
  const backdropCount = seed.assets?.backdrops?.length ?? 0;

  const variant = selectCanvasVariant(seed);

  console.log("[STAGE3][ENGINE][CANVAS]", {
    movieId: seed.movieId,
    variant,
    actorCount,
    backdropCount,
  });

  return {
    movieId: seed.movieId,

    variant,

    seed,

    actorCount,
    backdropCount,

    layers: {
      background: true,
      actors: actorCount > 0,
      collage: backdropCount > 0,
      logo: Boolean(seed.assets?.logo),
    },
  };
}

/**
 * =========================================================
 * METADATA STRIP BUILDER
 * =========================================================
 *
 * This is PURE DELEGATION to existing Stage 3 logic.
 */
function buildMetadataStrip(seed: BorderSeed): Stage3MetadataStrip {
  console.log("[STAGE3][ENGINE][METADATA]", {
    movieId: seed.movieId,
  });

  return buildMetadataRenderPlan(seed);
}

/**
 * =========================================================
 * MAIN STAGE 3 COMPOSITION ENTRY POINT
 * =========================================================
 *
 * This function is the ONLY approved entry for Stage 3.
 */
export function Stage3Compose(seed: BorderSeed): Stage3Output {
  const traceId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36);

  console.log("[STAGE3][ENGINE][START]", {
    traceId,
    movieId: seed.movieId,
  });

  /**
   * -----------------------------
   * CANVAS BUILD
   * -----------------------------
   */
  const canvas = buildCanvasComposition(seed);

  /**
   * -----------------------------
   * METADATA STRIP BUILD
   * -----------------------------
   */
  const metadataStrip = buildMetadataStrip(seed);

  /**
   * -----------------------------
   * FINAL OUTPUT PACKAGE
   * -----------------------------
   */
  const output: Stage3Output = {
    movieId: seed.movieId,

    canvas,
    metadataStrip,

    _debug: {
      traceId,
      timestamp: Date.now(),
    },
  };

  console.log("[STAGE3][ENGINE][OUTPUT]", {
    traceId,
    movieId: seed.movieId,
    canvasVariant: canvas.variant,
    metadataSlots: metadataStrip.slots.length,
  });

  return output;
}