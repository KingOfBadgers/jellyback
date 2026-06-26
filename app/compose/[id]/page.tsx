"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSE PAGE
 * =========================================================
 *
 * CHANGE (2026-06-22)
 * ---------------------------------------------------------
 * FIX: Stage 2.5 → Stage 3 seed boundary normalization
 *
 * REASON:
 * ---------------------------------------------------------
 * Collage/backdrop separation introduced in Stage 2.5
 * requires mapping legacy `backdrops` → `collageBackdrops`
 * while preserving canonical background integrity.
 *
 * RULE:
 * ---------------------------------------------------------
 * Stage 3 MUST NOT interpret Stage 2.5 structure directly.
 * It receives a NORMALISED runtime seed.
 * =========================================================
 */

import { useEffect } from "react";
import { useParams } from "next/navigation";

import CanvasViewport from "@/stage3/view/CanvasViewport";
import Stage3VariantPanel from "@/stage3/ui/Stage3VariantPanel";

import { useCompositionBorderStore } from "@/stage25/store/compositionBorderStore";
import { useCompositionStore } from "@/stage3/store/compositionStore";

import SceneRenderer from "@/stage3/renderer/SceneRenderer";

import "@/stage3/styles/treatmentEngine.css";

/**
 * =========================================================
 * SEED NORMALISER (BOUNDARY FIX)
 * =========================================================
 */
function normalizeStage3Seed(seed: any) {
  if (!seed) return null;

  return {
    ...seed,

    /**
     * FIX:
     * Ensure Stage 3 NEVER uses mixed backdrop arrays
     */
    assets: {
      ...seed.assets,

      /**
       * canonical safety
       */
      backdrops: seed.assets?.backdrops ?? [],

      /**
       * NEW REQUIRED FIELD (safe fallback)
       */
      collageBackdrops:
        seed.assets?.collageBackdrops ??
        seed.assets?.backdrops ??
        [],
    },
  };
}

export default function ComposePage() {
  const { id } = useParams();

  const borderSeed = useCompositionBorderStore((s) => s.seed);

  const seed = useCompositionStore((s) => s.seed);
  const setSeed = useCompositionStore((s) => s.setSeed);

  /**
   * =========================================================
   * HYDRATION PIPELINE
   * =========================================================
   */
  useEffect(() => {
    if (!id) {
      console.warn("[STAGE3] No route id present");
      return;
    }

    if (seed?.movieId === id) {
      console.log("[STAGE3] Seed already present:", id);
      return;
    }

    if (borderSeed?.movieId === id) {
      console.log(
        "[STAGE3] Hydrating from border store:",
        borderSeed.movieId
      );

      /**
       * FIX:
       * Normalize boundary before entering Stage 3 store
       */
      const normalized = normalizeStage3Seed(borderSeed);

      setSeed(normalized);

      console.log("[STAGE3] Stage 3 hydration complete");
      return;
    }

    console.warn("[STAGE3] Border seed unavailable:", id);
  }, [id, borderSeed, seed, setSeed]);

  /**
   * =========================================================
   * LOADING STATE
   * =========================================================
   */
  if (!seed) {
    console.log("[STAGE3] Waiting for seed hydration...");

    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading composition...
      </div>
    );
  }

  console.log("[PIPELINE] ComposePage ACTIVE");
  console.log("[STAGE3] Rendering SceneRenderer:", seed.movieId);
  console.log("[STAGE3][COMPOSE PAGE RENDER]", { seed });

  return (
    <>
      <Stage3VariantPanel seed={seed} />

      <CanvasViewport>
        <SceneRenderer seed={seed} />
      </CanvasViewport>
    </>
  );
}