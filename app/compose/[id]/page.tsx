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
 * EXPORT UPDATE:
 * ---------------------------------------------------------
 * - Added true export canvas boundary
 * - Fixed Jellyfin cover dimensions
 * - Export target now contains:
 *      SceneRenderer
 *      MetadataBarRenderer
 *
 * FINAL EXPORT SIZE:
 *      1000 x 1500
 *
 * =========================================================
 */

import { useEffect, useState, useRef } from "react";
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

      backdrops:
        seed.assets?.backdrops ?? [],

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


  /**
   * =====================================================
   * EXPORT TARGET
   * =====================================================
   *
   * This is the final Jellyfin cover canvas.
   *
   * Fixed:
   * 1000 x 1500
   *
   */
  const exportRef =
    useRef<HTMLDivElement>(null);



  /**
   * =====================================================
   * STORES
   * =====================================================
   */

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
   * DISPLAY SCALE ONLY
   * =====================================================
   *
   * This affects preview.
   *
   * It does NOT affect export dimensions.
   *
   */
  const [scale, setScale] =
    useState(1);



  useEffect(() => {

    function updateScale() {

      setScale(
        Math.min(
          window.innerWidth / 1000,
          window.innerHeight / 1500,
          1
        )
      );

    }


    updateScale();


    window.addEventListener(
      "resize",
      updateScale
    );


    return () =>
      window.removeEventListener(
        "resize",
        updateScale
      );


  }, []);



  /**
   * =====================================================
   * HYDRATE STAGE 3
   * =====================================================
   */
  useEffect(() => {

    if (!id) return;


    if (seed?.movieId === id) {
      return;
    }


    if (borderSeed?.movieId === id) {

      const normalized =
        normalizeStage3Seed(
          borderSeed
        );


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
      <div
        className="
          h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        "
      >
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
        scale={scale}
        setScale={setScale}
        exportRef={exportRef}
      />


      <CanvasViewport scale={scale}>

  <div
    id="jellyback-export"
    style={{
      width: "1000px",
      height: "1500px",
      position: "relative",
      overflow: "hidden",
      background: "#000",
    }}
  >

    <SceneRenderer seed={seed} />

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

  </div>

</CanvasViewport>

    </>
  );
}