"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSE PAGE
 * =========================================================
 *
 * CHANGE (2026-07-01)
 * ---------------------------------------------------------
 * FIX: Asset URL alignment with public/assets/meta structure
 *
 * REASON:
 * ---------------------------------------------------------
 * Previous footer renderer used incorrect asset paths.
 * Now aligned to canonical /public/assets/meta tree.
 * =========================================================
 */

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

import CanvasViewport from "@/stage3/view/CanvasViewport";
import Stage3VariantPanel from "@/stage3/ui/Stage3VariantPanel";

import { useCompositionBorderStore } from "@/stage25/store/compositionBorderStore";
import { useCompositionStore } from "@/stage3/store/compositionStore";

import SceneRenderer from "@/stage3/renderer/SceneRenderer";

import "@/stage3/styles/treatmentEngine.css";
import "@/stage3/styles/shapeengine.css";

import MetadataBarRenderer from "@/stage3/metadata/MetadataBarRenderer";
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
 * FOOTER PROJECTION (PURE DERIVATION)
 * =========================================================
 */
function buildFooter(seed: any) {
  if (!seed) return null;

  return {
    rating: seed.ratings?.mpaa ?? seed.ratings?.bbfc,

    runtime: seed.runtimeMinutes,

    resolution: seed.media?.resolution,

    cc: seed.media?.subtitles,

    qi: {
      imdbUrl:
        seed.metaAssets?.find((x: any) => x.type === "imdb")
          ?.src ?? null,

      tmdbUrl:
        seed.metaAssets?.find((x: any) => x.type === "tmdb")
          ?.src ?? null,
    },

    logo: seed.assets?.logo,

    jbIcon: "/assets/meta/jb/jb.png",
  };
}

export default function ComposePage() {
  const { id } = useParams();

  const borderSeed = useCompositionBorderStore((s) => s.seed);

  const seed = useCompositionStore((s) => s.seed);
  const setSeed = useCompositionStore((s) => s.setSeed);

  useEffect(() => {
    if (!id) return;

    if (seed?.movieId === id) return;

    if (borderSeed?.movieId === id) {
      const normalized = normalizeStage3Seed(borderSeed);
      setSeed(normalized);
      return;
    }

    console.warn("[STAGE3] Missing border seed:", id);
  }, [id, borderSeed, seed, setSeed]);

  const footer = useMemo(() => buildFooter(seed), [seed]);

  if (!seed) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading composition...
      </div>
    );
  }

  return (
    <>
      <Stage3VariantPanel seed={seed} />

      <CanvasViewport>
        <SceneRenderer seed={seed} />

        {/* =====================================================
            FOOTER LAYER
            ===================================================== */}
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
          <MetadataBarRenderer footer={footer} /> 
        </div>
      </CanvasViewport>
    </>
  );
}



