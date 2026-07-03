
"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSE PAGE
 * =========================================================
 *
 * PHASE A REFACTOR
 * ---------------------------------------------------------
 * Footer extracted to metadata architecture.
 *
 * CHANGE:
 * - Removed inline FooterRenderer
 * - Added MetadataBarRenderer system
 * - Preserved existing footer projection logic
 *
 * NO VISUAL CHANGES EXPECTED
 * =========================================================
 */

import { useEffect } from "react";
import { useParams } from "next/navigation";

import CanvasViewport from "@/stage3/view/CanvasViewport";
import Stage3VariantPanel from "@/stage3/ui/Stage3VariantPanel";

import { useCompositionBorderStore } from "@/stage25/store/compositionBorderStore";
import { useCompositionStore } from "@/stage3/store/compositionStore";

import SceneRenderer from "@/stage3/renderer/SceneRenderer";

import MetadataBarRenderer from "@/stage3/metadata/MetadataBarRenderer";

import "@/stage3/styles/treatmentEngine.css";
import "@/stage3/styles/shapeengine.css";

/**
 * =========================================================
 * SEED NORMALISER
 * =========================================================
 */
function normalizeStage3Seed(seed: any) {
  if (!seed) return null;

  return {
    ...seed,
    assets: {
      ...seed.assets,
      backdrops: seed.assets?.backdrops ?? [],
      collageBackdrops:
        seed.assets?.collageBackdrops ??
        seed.assets?.backdrops ??
        [],
    },
  };
}



/**
 * =========================================================
 * MAIN PAGE
 * =========================================================
 */
export default function ComposePage() {
  const { id } = useParams();

  const borderSeed =
    useCompositionBorderStore(
      (s) => s.seed
    );

  const seed =
    useCompositionStore(
      (s) => s.seed
    );

  const setSeed =
    useCompositionStore(
      (s) => s.setSeed
    );

  const metadataBarStyle =
    useCompositionStore(
      (s) => s.metadataBarStyle
    );

  /**
   * =====================================================
   * HYDRATE STAGE 3
   * =====================================================
   */
  useEffect(() => {
    if (!id) return;

    if (seed?.movieId === id) return;

    if (borderSeed?.movieId === id) {
      const normalized =
        normalizeStage3Seed(borderSeed);

      setSeed(normalized);

      return;
    }

    console.warn(
      "[STAGE3] Missing border seed:",
      id
    );
  }, [
    id,
    borderSeed,
    seed,
    setSeed,
  ]);



  /**
   * =====================================================
   * LOADING
   * =====================================================
   */
  if (!seed) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading composition...
      </div>
    );
  }

  /**
   * =====================================================
   * RENDER
   * =====================================================
   */
  return (
    <>
      <Stage3VariantPanel
        seed={seed}
      />

      <CanvasViewport>
        <SceneRenderer seed={seed} />

        {/* ============================================
            METADATA BAR LAYER
        ============================================ */}
        <div
          style={{
            width: 1000,
            height: 150,

            position: "absolute",

            bottom: 0,
            left: 0,

            zIndex: 50,
          }}
        >
          <MetadataBarRenderer
  seed={seed}
  style={metadataBarStyle}
/>
        </div>
      </CanvasViewport>
    </>
  );
}
