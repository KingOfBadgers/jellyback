"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — BLUEPRINT RESOLVER (FIXED VARIANT BRIDGE)
 * =========================================================
 *
 * CHANGE (2026-06-21)
 * ------------------
 * Fix:
 * - Added registry → layout translation step
 * - Variant IDs are now properly mapped to layout intents
 * - Prevents blueprint null failures causing missing renders
 *
 * CRITICAL RULE:
 * ---------------------------------------------------------
 * Variant ID (e.g. ACTOR_5_ROW)
 * MUST be translated into layout intent ("row", etc)
 * BEFORE blueprint resolution
 *
 * This restores deterministic rendering flow:
 *
 * variant ID → registry → layout → blueprint → renderer
 * =========================================================
 */

import { variantRegistry } from "@/stage3/variants/variantRegistry";

/**
 * =========================================================
 * TYPES
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

/**
 * =========================================================
 * BLUEPRINT TABLE (PURE LAYOUT SYSTEM)
 * =========================================================
 */

const LAYOUT_BLUEPRINTS: Record<LayoutIntent, LayoutBlueprint["style"]> = {
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
    opacity: 0.98,
    zIndex: 10,
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
 * VARIANT → LAYOUT RESOLVER (CRITICAL FIX)
 * =========================================================
 */

function resolveLayoutFromVariant(variantId: string | null): LayoutIntent | null {
  if (!variantId) return null;

  const variant = variantRegistry[variantId as keyof typeof variantRegistry];

  if (!variant) {
    console.log("[STAGE3 BLUEPRINT][UNKNOWN VARIANT]", {
      variantId,
    });
    return null;
  }

  return variant.layout as LayoutIntent;
}

/**
 * =========================================================
 * RESOLVER (LAYOUT → BLUEPRINT)
 * =========================================================
 */

export function resolveVariantBlueprint(input: {
  layer: "actors" | "collage" | "logo";
  layout: LayoutIntent;
}): LayoutBlueprint | null {
  if (!input?.layout) return null;

  const style = LAYOUT_BLUEPRINTS[input.layout];

  if (!style) {
    console.log("[STAGE3 BLUEPRINT][MISSING LAYOUT STYLE]", {
      layout: input.layout,
    });
    return null;
  }

  return {
    layer: input.layer,
    type: input.layout,
    style,
    constraints: {
      fit: "contain",
    },
  };
}

/**
 * =========================================================
 * MULTI-LAYER RESOLVER (FIXED VARIANT AWARE)
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

  console.log("[STAGE3 BLUEPRINT][VARIANT→LAYOUT]", {
    actors: { variant: input.actors, layout: actorLayout },
    collage: { variant: input.collage, layout: collageLayout },
    logo: { variant: input.logo, layout: logoLayout },
  });

  return {
    actors: actorLayout
      ? resolveVariantBlueprint({
          layer: "actors",
          layout: actorLayout,
        })
      : null,

    collage: collageLayout
      ? resolveVariantBlueprint({
          layer: "collage",
          layout: collageLayout,
        })
      : null,

    logo: logoLayout
      ? resolveVariantBlueprint({
          layer: "logo",
          layout: logoLayout,
        })
      : null,
  };
}