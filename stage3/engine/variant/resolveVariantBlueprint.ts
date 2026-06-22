"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — BLUEPRINT RESOLVER (FIXED VARIANT BRIDGE)
 * =========================================================
 *
 * CHANGE (2026-06-21)
 * ------------------
 * DEBUG INSTRUMENTATION PASS:
 * - Added full resolution tracing (variant → layout → blueprint)
 * - Added explicit null failure reasons
 * - Added registry validation visibility
 *
 * PURPOSE:
 * - Make blueprint failures fully explainable
 * - Eliminate silent null propagation
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
 * VARIANT → LAYOUT RESOLVER (CRITICAL DEBUG ZONE)
 * =========================================================
 */

function resolveLayoutFromVariant(variantId: string | null): LayoutIntent | null {
  console.log("[STAGE3 BLUEPRINT][LAYOUT RESOLVE ENTRY]", {
    variantId,
  });



  const variant = variantRegistry[variantId as keyof typeof variantRegistry];


  if (!variant) {
    console.error("[STAGE3 BLUEPRINT][VARIANT NOT FOUND IN REGISTRY]", {
      variantId,
      availableVariants: Object.keys(variantRegistry),
    });
    return null;
  }

  console.log("[STAGE3 BLUEPRINT][VARIANT FOUND]", {
    variantId,
    layout: variant.layout,
    maxAssets: variant.maxAssets,
    visibility: variant.visibility,
  });

  if (!variant.layout) {
    console.error("[STAGE3 BLUEPRINT][MISSING LAYOUT ON VARIANT]", {
      variantId,
      variant,
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
  console.log("[STAGE3 BLUEPRINT][BLUEPRINT RESOLVE ENTRY]", input);

  if (!input?.layout) {
    console.warn("[STAGE3 BLUEPRINT][NO LAYOUT PROVIDED]", input);
    return null;
  }

  const style = LAYOUT_BLUEPRINTS[input.layout];

  if (!style) {
    console.error("[STAGE3 BLUEPRINT][LAYOUT NOT IN BLUEPRINT TABLE]", {
      layout: input.layout,
      available: Object.keys(LAYOUT_BLUEPRINTS),
    });
    return null;
  }

  console.log("[STAGE3 BLUEPRINT][BLUEPRINT CREATED]", {
    layer: input.layer,
    layout: input.layout,
  });

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
 * MULTI-LAYER RESOLVER (FULL TRACE)
 * =========================================================
 */

export function resolveVariantBlueprints(input: {
  actors?: string | null;
  collage?: string | null;
  logo?: string | null;
}) {
  console.log("[STAGE3 BLUEPRINT][RESOLVE START]", input);

  const actorLayout = resolveLayoutFromVariant(input.actors);
  const collageLayout = resolveLayoutFromVariant(input.collage);
  const logoLayout = resolveLayoutFromVariant(input.logo);

  console.log("[STAGE3 BLUEPRINT][VARIANT → LAYOUT RESULT]", {
    actors: { variant: input.actors, layout: actorLayout },
    collage: { variant: input.collage, layout: collageLayout },
    logo: { variant: input.logo, layout: logoLayout },
  });

  const actorsBlueprint = actorLayout
    ? resolveVariantBlueprint({
        layer: "actors",
        layout: actorLayout,
      })
    : null;

  const collageBlueprint = collageLayout
    ? resolveVariantBlueprint({
        layer: "collage",
        layout: collageLayout,
      })
    : null;

  const logoBlueprint = logoLayout
    ? resolveVariantBlueprint({
        layer: "logo",
        layout: logoLayout,
      })
    : null;

  console.log("[STAGE3 BLUEPRINT][FINAL OUTPUT]", {
    actors: !!actorsBlueprint,
    collage: !!collageBlueprint,
    logo: !!logoBlueprint,
  });

  if (!actorsBlueprint) {
    console.warn("[STAGE3 BLUEPRINT][ACTORS NULL BLUEPRINT]", {
      reason: "actors pipeline failed at layout or registry stage",
      input: input.actors,
      resolvedLayout: actorLayout,
    });
  }

  return {
    actors: actorsBlueprint,
    collage: collageBlueprint,
    logo: logoBlueprint,
  };
}