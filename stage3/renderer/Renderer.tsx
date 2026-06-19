"use client";

import BackgroundLayer from "./layers/BackgroundLayer";
import ActorLayer from "./layers/ActorLayer";
import CollageLayer from "./layers/CollageLayer";

import Stage3MetadataStripRenderer from "@/stage3/metadata/Stage3MetadataStripRenderer";

import { buildMetadataRenderPlan } from "@/stage3/metadata/buildMetadataRenderPlan";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — RENDERER PATCH
 * =========================================================
 *
 * FIX (2026-06-18 BST)
 * --------------------
 * ISSUE:
 * - transient undefined slots during hydration
 * - causes full renderer abort before layers mount
 *
 * STRATEGY:
 * - DO NOT modify layout system
 * - DO NOT introduce fallback geometry
 * - ONLY guard render entry to prevent premature exit
 *
 * RESULT:
 * - renderer stays mounted during hydration cycle
 * - layers receive seed when ready
 * =========================================================
 */

export default function Renderer({ seed }: any) {
  
  console.log("########################################");
console.log("RENDERER VERSION CHECK 18-JUNE-BST-V7");
console.log("########################################");
  
  /**
   * =========================================================
   * HARD GUARD (MINIMAL SAFETY PATCH)
   * =========================================================
   *
   * IMPORTANT:
   * We DO NOT exit early anymore.
   * Renderer must stay mounted to allow hydration convergence.
   */
  if (!seed) {
    console.log("[STAGE3][RENDERER][HYDRATION_WAIT]", {
      reason: "seed not ready",
    });

    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "black",
        }}
      />
    );
  }

  /**
   * =========================================================
   * METADATA PLAN
   * =========================================================
   */
  const metadataPlan = buildMetadataRenderPlan(seed);

  console.log("[STAGE3][RENDERER] Seed received:", {
    movieId: seed?.movieId,
    variant: metadataPlan.variant,
    slots: metadataPlan.slots?.length ?? 0,
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* CANVAS WRAPPER */}
      <div
        style={{
          width: 1000,
          height: 1500,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transform: "scale(0.6)",
          transformOrigin: "center",
          overflow: "hidden",
        }}
      >
        {/* ART ZONE */}
        <div
          style={{
            position: "relative",
            flex: 1,
            height: 1400,
          }}
        >
          <BackgroundLayer seed={seed} />
          <CollageLayer seed={seed} />
          <ActorLayer seed={seed} />
        </div>

        {/* METADATA STRIP */}
        <div
          style={{
            height: 100,
            width: 1000,
            flexShrink: 0,
            position: "relative",
          }}
        >
          <Stage3MetadataStripRenderer plan={metadataPlan} />
        </div>
      </div>
    </div>
  );
}