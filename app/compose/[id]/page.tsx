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
 * - Render Stage3CanvasShell once seed is available
 *
 * DOES NOT
 * --------
 * - Perform rendering logic
 * - Perform variant selection
 * - Modify seed contents
 * - Perform composition decisions
 *
 * =========================================================
 *
 * CHANGE LOG
 * ----------
 * 2026-06-19 18:05 UTC
 *
 * CHANGED BY: ChatGPT
 *
 * REASON:
 * Stage 3 was failing to hydrate because previous Sprint 1
 * simplification removed Stage 2.5 → Stage 3 border transfer.
 *
 * CHANGES:
 * - Restored border store import
 * - Restored border seed hydration logic
 * - Added pipeline logging
 * - Preserved all existing functionality
 *
 * =========================================================
 */

import { useEffect } from "react";
import { useParams } from "next/navigation";
import CanvasViewport from "@/stage3/view/CanvasViewport";

/**
 * Stage 2.5 Border Store
 * --------------------------------
 * Holds seed created during desktop save process.
 */
import { useCompositionBorderStore } from "@/stage25/store/compositionBorderStore";

/**
 * Stage 3 Runtime Store
 */
import { useCompositionStore } from "@/stage3/store/compositionStore";

/**
 * Stage 3 Canvas Renderer (Sprint 1)
 */
import Stage3CanvasShell from "@/stage3/layout/Stage3CanvasShell.tsx";

export default function ComposePage() {
  /**
   * =========================================================
   * ROUTE PARAMS
   * =========================================================
   */
  const { id } = useParams();

  /**
   * =========================================================
   * BORDER STORE (STAGE 2.5)
   * =========================================================
   *
   * Seed produced before crossing into Stage 3.
   */
  const borderSeed =
    useCompositionBorderStore(
      (s) => s.seed
    );

  /**
   * =========================================================
   * STAGE 3 STORE
   * =========================================================
   */
  const seed =
    useCompositionStore(
      (s) => s.seed
    );

  const setSeed =
    useCompositionStore(
      (s) => s.setSeed
    );

  /**
   * =========================================================
   * SEED HYDRATION PIPELINE
   * =========================================================
   *
   * Transfers seed across Stage 2.5 → Stage 3 boundary.
   *
   * RULE:
   * Stage 3 must receive seed before rendering can begin.
   */
  useEffect(() => {
    /**
     * Route not ready
     */
    if (!id) {
      console.warn(
        "[STAGE3] No route id present"
      );
      return;
    }

    /**
     * Seed already hydrated
     */
    if (seed?.movieId === id) {
      console.log(
        "[STAGE3] Seed already present:",
        id
      );
      return;
    }

    /**
     * Border transfer available
     */
    if (
      borderSeed?.movieId === id
    ) {
      console.log(
        "[STAGE3] Hydrating from border store:",
        borderSeed.movieId
      );

      setSeed(borderSeed);

      console.log(
        "[STAGE3] Stage 3 hydration complete"
      );

      return;
    }

    /**
     * Seed missing from border store
     */
    console.warn(
      "[STAGE3] Border seed unavailable:",
      id
    );
  }, [
    id,
    borderSeed,
    seed,
    setSeed,
  ]);

  /**
   * =========================================================
   * SAFE LOADING STATE
   * =========================================================
   */
  if (!seed) {
    console.log(
      "[STAGE3] Waiting for seed hydration..."
    );

    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading composition...
      </div>
    );
  }

  /**
   * =========================================================
   * RENDER STAGE 3
   * =========================================================
   */
  console.log(
    "[STAGE3] Rendering canvas shell:",
    seed.movieId
  );

  return (
  <CanvasViewport>
    <Stage3CanvasShell seed={seed} />
  </CanvasViewport>
  );
}