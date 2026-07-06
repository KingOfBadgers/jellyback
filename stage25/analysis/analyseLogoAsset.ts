"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 2.5 — LOGO INTRINSIC ANALYSIS
 * =========================================================
 *
 * CHANGE: 2026-07-06
 * REASON:
 * Introduce deterministic logo shape classification layer.
 *
 * PURPOSE:
 * - Analyse logo image once
 * - Derive intrinsic geometry metadata
 * - Provide Stage 3 with non-layout presentation hints
 *
 * IMPORTANT:
 * - No positioning logic
 * - No variant logic
 * - No styling logic
 * =========================================================
 */

export type LogoShapeClass =
  | "ultra-wide"
  | "wide"
  | "standard"
  | "square"
  | "tall";

export type LogoAnalysis = {
  src: string;

  intrinsic: {
    width: number;
    height: number;
    aspectRatio: number;
  };

  classification: {
    shape: LogoShapeClass;
  };

  metrics: {
    paddingEstimate: number;
    visualDensity: number;
  };

  hints: {
    fitMode: "contain" | "scale-down" | "banner-fit";
    maxWidth: number;
    maxHeight: number;
    anchor: "center" | "bottom" | "top";
  };
};

/**
 * =========================================================
 * SIMPLE CLASSIFIER (NO ARTIST RULES)
 * =========================================================
 */

function classifyAspect(aspectRatio: number): LogoShapeClass {
  if (aspectRatio >= 4.0) return "ultra-wide";
  if (aspectRatio >= 2.3) return "wide";
  if (aspectRatio >= 1.2) return "standard";
  if (aspectRatio >= 0.8) return "square";
  return "tall";
}

/**
 * =========================================================
 * MAIN ANALYSIS FUNCTION
 * =========================================================
 *
 * NOTE:
 * This assumes we have width/height available from metadata
 * OR pre-fetched image probing step.
 */

export function analyseLogoAsset(input: {
  src: string;
  width: number;
  height: number;
  alphaCoverage?: number;
}): LogoAnalysis {
  const aspectRatio = input.width / input.height;

  const shape = classifyAspect(aspectRatio);

  /**
   * =========================================================
   * DENSITY MODEL (SAFE HEURISTIC)
   * =========================================================
   * If alphaCoverage exists, use it.
   * Otherwise assume moderate density.
   */
  const visualDensity =
    typeof input.alphaCoverage === "number"
      ? input.alphaCoverage
      : 0.7;

  const paddingEstimate = 1 - visualDensity;

  /**
   * =========================================================
   * FIT MODE LOGIC (NO POSITIONING)
   * =========================================================
   */
  let fitMode: LogoAnalysis["hints"]["fitMode"] = "contain";

  if (shape === "ultra-wide") {
    fitMode = "banner-fit";
  } else if (shape === "tall") {
    fitMode = "scale-down";
  }

  /**
   * =========================================================
   * SAFE SIZE HINTS (NOT HARD CONSTRAINTS)
   * =========================================================
   */
  const maxWidth =
    shape === "ultra-wide"
      ? 900
      : shape === "wide"
      ? 800
      : 700;

  const maxHeight =
    shape === "tall"
      ? 240
      : shape === "square"
      ? 220
      : 180;

  return {
    src: input.src,

    intrinsic: {
      width: input.width,
      height: input.height,
      aspectRatio,
    },

    classification: {
      shape,
    },

    metrics: {
      paddingEstimate,
      visualDensity,
    },

    hints: {
      fitMode,
      maxWidth,
      maxHeight,
      anchor: "center",
    },
  };
}