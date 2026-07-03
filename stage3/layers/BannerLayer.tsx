"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";
import { resolveVariantContract } from "@/stage3/engine/variant/resolveVariantContract";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — Banner LAYER (STRICT CONTRACT FIX)
 * =========================================================
 *
 * FIX:
 * ---------------------------------------------------------
 * - Removed seed-based render gating
 * - Contract is now sole source of truth
 * - Ensures NONE fully removes banner from DOM
 *
 * DATE: 2026-06-19
 * =========================================================
 */

export default function BannerLayer() {
  const seed = useCompositionStore((s) => s.seed);
  const selected = useCompositionStore((s) => s.selected);

  const contract = resolveVariantContract(selected.banner);

  /**
   * =========================================================
   * CONTRACT IS THE ONLY GATE
   * =========================================================
   */
  if (contract.visibility !== "show") {
    console.log("[STAGE3 Banner LAYER] hidden by contract", contract);
    return null;
  }

  const bannerSrc = seed?.assets?.banner

  if (!bannerSrc) {
    console.log("[STAGE3 Banner LAYER] missing asset");
    return null;
  }

  /**
   * =========================================================
   * POSITIONING (PURE PRESENTATION)
   * =========================================================
   */
  const position =
    contract.layout === "center-focus"
      ? { top: 40, left: "50%", transform: "translateX(-50%)" }
      : { top: 40, left: 40 };

  console.log("[STAGE3 BANNER LAYER]", {
    layout: contract.layout,
    visibility: contract.visibility,
    src: bannerSrc,
  });

  return (
    <img
      src={bannerSrc}
      style={{
        position: "absolute",
        width: 180,
        objectFit: "contain",
        zIndex: 20,
        ...position,
      }}
    />
  );
}