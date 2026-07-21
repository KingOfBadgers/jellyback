"use client";

/**
 * =========================================================
 * STAGE 3 — LOGO NODE BUILDER
 * =========================================================
 *
 * RESPONSIBILITIES
 * ---------------------------------------------------------
 *
 * - Resolve canonical logo source.
 * - Expose Stage 2.5 logo analysis.
 * - Build presentation node only.
 *
 * NO IMAGE ANALYSIS OCCURS HERE.
 *
 * =========================================================
 */

function resolveLogo(seed: any) {
  return seed?.assets?.logo ?? null;
}

function resolveLogoSrc(seed: any, logo: string | null) {
  return (
    logo ??
    resolveLogo(seed)?.src ??
    seed?.footer?.logo ??
    null
  );
}

function resolveLogoAnalysis(seed: any) {
  return resolveLogo(seed)?.analysis ?? null;
}

function isSquareLogoHint(
  analysis: any,
  src: string | null
) {
  /**
   * =======================================================
   * Stage 2.5 analysis takes priority.
   * =======================================================
   */

  const shape = analysis?.shape;

if (shape === "square") {
  return true;
}

if (
  shape === "portrait"
) {
  return true;
}

return false;
  }




export function buildLogoNode(
  seed: any,
  logo: string | null,
  logoBlueprint: any,
  logoTreatments: string[]
) {
  if (!logoBlueprint) {
    return null;
  }

  const src = resolveLogoSrc(seed, logo);

  if (!src) {
    return null;
  }

  const analysis =
    resolveLogoAnalysis(seed);

  const baseStyle =
    logoBlueprint.style ?? {};

  const square =
    isSquareLogoHint(
      analysis,
      src
    );

  return {
    id: "logo",

    layer: "logo",

    src,

    /**
     * Stage 2.5 metadata.
     * Renderer can ignore today.
     */
    analysis,

    visible:
      logoBlueprint.type !== "none",

    style: {
      ...baseStyle,

      /**
       * ===================================================
       * Temporary sizing.
       *
       * Future versions will use analysis.kind,
       * coverage and transparency.
       * ===================================================
       */

      width: square ? "auto" : "800px",

      height: square ? "auto" : "150px",

      maxWidth: "800px",

      maxHeight: "180px",

      objectFit: "contain",

      display: "block",
    },

    treatments:
      logoTreatments ?? [],
  };
}