"use client";

import { variantRegistry } from "@/stage3/variants/variantRegistry";

/**
 * =========================================================
 * STAGE 3 — BLUEPRINT RESOLVER (CANONICAL)
 * =========================================================
 */

export type LayoutIntent =
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "none";

export type LayoutBlueprint = {
  layer: "actors" | "collage" | "logo";
  type: LayoutIntent;

  style: {
    position: "absolute";
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
    transform?: string;
    opacity?: number;
    zIndex?: number;
  };

  constraints: {
    fit: "contain" | "cover" | "fixed";
  };
};

const BLUEPRINT_TABLE: Record<LayoutIntent, LayoutBlueprint["style"]> = {
  row: {
    position: "absolute",
    bottom: "160px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  },

  "center-focus": {
    position: "absolute",
    bottom: "180px",
    left: "50%",
    transform: "translateX(-50%) scale(1.05)",
    zIndex: 10,
  },

  "w-overlap": {
    position: "absolute",
    bottom: "160px",
    left: "50%",
    transform: "translateX(-50%) skewY(-2deg)",
    Index: 10,
  },

  grid: {
    position: "absolute",
    bottom: "160px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  },

  none: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    opacity: 0,
    zIndex: -1,
  },
};

/**
 * =========================================================
 * VARIANT → LAYOUT
 * =========================================================
 */
function resolveLayoutFromVariant(
  variantId: string | null
): LayoutIntent | null {
  if (!variantId) return null;

  const variant = variantRegistry[variantId as any];

  if (!variant?.layout) return null;

  return variant.layout as LayoutIntent;
}

/**
 * =========================================================
 * BLUEPRINT RESOLVER
 * =========================================================
 */
export function resolveVariantBlueprint(input: {
  layer: "actors" | "collage" | "logo";
  layout: LayoutIntent;
}): LayoutBlueprint | null {
  const style = BLUEPRINT_TABLE[input.layout];
  if (!style) return null;

  return {
    layer: input.layer,
    type: input.layout,
    style,
    constraints: { fit: "contain" },
  };
}

/**
 * =========================================================
 * MULTI-LAYER RESOLVER
 * =========================================================
 */
export function resolveVariantBlueprints(input: {
  actors?: string | null;
  collage?: string | null;
  logo?: string | null;
}) {
  const actorLayout = resolveLayoutFromVariant(input.actors);
  const collageLayout = resolveLayoutFromVariant(input.collage);
  const logoLayout = resolveLayoutFromVariant(input.logo);

  return {
    actors: actorLayout
      ? resolveVariantBlueprint({ layer: "actors", layout: actorLayout })
      : null,

    collage: collageLayout
      ? resolveVariantBlueprint({ layer: "collage", layout: collageLayout })
      : null,

    logo: logoLayout
      ? resolveVariantBlueprint({ layer: "logo", layout: logoLayout })
      : null,
  };
}