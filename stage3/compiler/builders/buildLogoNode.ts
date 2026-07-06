"use client";

/**
 * =========================================================
 * STAGE 3 — LOGO NODE BUILDER (INTRINSIC SAFE)
 * =========================================================
 */

function resolveLogoSrc(seed: any, logo: string | null) {
  return (
    logo ??
    seed?.assets?.logo ??
    seed?.footer?.logo ??
    null
  );
}

function isSquareLogoHint(src: string | null) {
  if (!src) return false;

  // heuristic only (NO per-movie logic)
  // treat Jellyfin logos as unknown intrinsic aspect
  return true;
}

export function buildLogoNode(
  seed: any,
  logo: string | null,
  logoBlueprint: any,
  logoTreatments: string[]
) {
  if (!logoBlueprint) return null;

  const src = resolveLogoSrc(seed, logo);
  if (!src) return null;

  const baseStyle = logoBlueprint.style ?? {};

  const square = isSquareLogoHint(src);

  return {
    id: "logo",
    layer: "logo",
    src,

    visible: logoBlueprint.type !== "none",

    style: {
      ...baseStyle,

      /**
       * CRITICAL FIX:
       * DO NOT constrain logo into banner rectangle
       */
      width: square ? "auto" : "800px",
      height: square ? "auto" : "150px",

      /**
       * allow natural aspect scaling
       */
      maxWidth: "800px",
      maxHeight: "180px",

      objectFit: "contain",
      display: "block",
    },

    treatments: logoTreatments ?? [],
  };
}