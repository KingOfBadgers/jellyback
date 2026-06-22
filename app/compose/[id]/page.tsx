"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSE PAGE
 * =========================================================
 *
 * PURPOSE
 * -------
 * Entry point for Stage 3 composition rendering.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Receive route movie id
 * - Pull seed from Stage 2.5 Border Store
 * - Hydrate Stage 3 Composition Store
 * - Render SceneRenderer once seed is available
 *
 * DOES NOT
 * --------
 * - Perform rendering logic
 * - Perform variant selection
 * - Modify seed contents
 * - Perform composition decisions
 *
 * =========================================================
 */

import { useEffect } from "react";
import { useParams } from "next/navigation";

import CanvasViewport from "@/stage3/view/CanvasViewport";
import Stage3VariantPanel from "@/stage3/ui/Stage3VariantPanel";
/**
 * Stage 2.5 Border Store
 */
import { useCompositionBorderStore } from "@/stage25/store/compositionBorderStore";

/**
 * Stage 3 Store
 */
import { useCompositionStore } from "@/stage3/store/compositionStore";

/**
 * SINGLE ACTIVE RENDERER (Scene Graph Pipeline)
 */
import SceneRenderer from "@/stage3/renderer/SceneRenderer";

export default function ComposePage() {
  const { id } = useParams();

  const borderSeed = useCompositionBorderStore((s) => s.seed);

  const seed = useCompositionStore((s) => s.seed);
  const setSeed = useCompositionStore((s) => s.setSeed);

  /**
   * SEED HYDRATION (Stage 2.5 → Stage 3)
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
      console.log("[STAGE3] Hydrating from border store:", borderSeed.movieId);

      setSeed(borderSeed);

      console.log("[STAGE3] Stage 3 hydration complete");
      return;
    }

    console.warn("[STAGE3] Border seed unavailable:", id);
  }, [id, borderSeed, seed, setSeed]);

  /**
   * LOADING STATE
   */
  if (!seed) {
    console.log("[STAGE3] Waiting for seed hydration...");

    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading composition...
      </div>
    );
  }

  /**
   * RENDER PIPELINE ENTRY
   */
  console.log("[STAGE3] Rendering SceneRenderer:", seed.movieId);
console.log("[STAGE3][COMPOSE PAGE RENDER]", { seed });
  return (
  <CanvasViewport>
    <Stage3VariantPanel seed={seed}/>
    <SceneRenderer seed={seed} />
  </CanvasViewport>
);
}