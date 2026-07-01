"use client";

import { resolveVariantBlueprints } from "@/stage3/engine/variant/resolveVariantBlueprint";
import { variantRegistry } from "@/stage3/variants/variantRegistry";
import { resolveCollagePosition} from "@/stage3/engine/spatial/collagePositionResolver";
import { flattenTreatments } from "@/stage3/engine/treatments/flattenTreatments" ;
import { computeEvenSpacing, SPATIAL_CONFIG,} from "@/stage3/engine/spatial/spacingUtils";
import { resolveBannerPosition } from "@/stage3/engine/spatial/bannerPositionResolver";
import { buildBackgroundNode } from "@/stage3/compiler/builders/buildBackgroundNode";
import { buildBannerNodes } from "@/stage3/compiler/builders/buildBannerNodes";
import { buildLogoNode } from "@/stage3/compiler/builders/buildLogoNode";
import { buildActorNodes } from "@/stage3/compiler/builders/buildActorNodes";
import { buildCollageNodes } from "@/stage3/engine/nodes/buildCollageNodes";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — FINAL SCENE COMPILER
 * =========================================================
 *
 * DATE: 2026-06-25
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Canonical scene compiler.
 * =========================================================
 */


/**
 * =========================================================
 * TREATMENT TYPES
 * =========================================================
 */

type LayerTreatmentGroup = {
  edges: string | null;
  depth: string | null;
  contrast: string | null;
  field?: string | null;
  spacing?: string | null;
};

type CompositionTreatments = {
  actors: LayerTreatmentGroup;
  collage: LayerTreatmentGroup;
  logo: LayerTreatmentGroup;
};

/**
 * =========================================================
 * SCENE TYPES
 * =========================================================
 */

export type SceneNode = {
  id: string;

  layer:
  | "background"
  | "actors"
  | "collage"
  | "logo"
  | "banner";

  src?: string;

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

  visible: boolean;

treatments?: string[];

presentation?: {
  shape?: string;
  frame?: string;
  stack?: string;
};

};


export type CompositionScene = {
  movieId: string;
  nodes: SceneNode[];
};

/**
 * =========================================================
 * NORMALIZE TREATMENTS
 * =========================================================
 */

function flattenTreatments(
  treatmentGroup:
    | Record<string, string | null>
    | null
    | undefined
): string[] {
  if (!treatmentGroup) return [];

  return Object.values(treatmentGroup).filter(
    (v): v is string => Boolean(v)
  );
}

/**
 * =========================================================
 * ACTOR POSITIONING
 * =========================================================
 */

function computeActorPosition(
  layout:
    | "row"
    | "center-focus"
    | "w-overlap"
    | "grid"
    | "none",

  index: number,
  total: number
) {
  const baseBottom = SPATIAL_CONFIG.baseBottom;

  if (layout === "row") {
    const spacing = computeEvenSpacing(
      total,
      SPATIAL_CONFIG.actorWidth,
      SPATIAL_CONFIG.canvasWidth,
      SPATIAL_CONFIG.outerMargin
    );

    const x =
      SPATIAL_CONFIG.outerMargin +
      index * (SPATIAL_CONFIG.actorWidth + spacing);

    return {
      position: "absolute" as const,
      bottom: `${baseBottom}px`,
      left: `${x}px`,
      transform: "translateX(0)",
      zIndex: 10 + index,
    };
  }

  if (layout === "center-focus") {
  const baseBottom = SPATIAL_CONFIG.baseBottom;

  const mid = Math.floor(total / 2);
  const isCenter = index === mid;

  // How far each actor sits from center
  const offsetIndex = index - mid;

  // tighter grouping than row (cinematic compression)
  const spacing = 90;

  const x =
    SPATIAL_CONFIG.outerMargin +
    mid * (SPATIAL_CONFIG.actorWidth + spacing) +
    offsetIndex * (SPATIAL_CONFIG.actorWidth + spacing);

  /**
   * HERO (center actor)
   */
  if (isCenter) {
    return {
      position: "absolute" as const,
      bottom: `${baseBottom}px`,
      left: `${x}px`,
      transform: "translateX(0) scale(1.18)",
      zIndex: 30,
    };
  }

  /**
   * LEFT SIDE SUPPORT
   */
  if (offsetIndex < 0) {
    const depth = Math.abs(offsetIndex);

    return {
      position: "absolute" as const,
      bottom: `${baseBottom + depth * 6}px`,
      left: `${x}px`,
      transform: `translateX(0) scale(${1 - depth * 0.08}) rotate(${
        depth * -1.5
      }deg)`,
      zIndex: 20 - depth,
    };
  }

  /**
   * RIGHT SIDE SUPPORT
   */
  const depth = Math.abs(offsetIndex);

  return {
    position: "absolute" as const,
    bottom: `${baseBottom + depth * 6}px`,
    left: `${x}px`,
    transform: `translateX(0) scale(${1 - depth * 0.08}) rotate(${
      depth * 1.5
    }deg)`,
    zIndex: 20 - depth,
  };
}

 if (layout === "w-overlap") {
  /**
   * =========================================================
   * CHANGE: 2026-06-27
   * REASON:
   * Previous W composition shifted entire group right.
   * Rebuilt using centered deterministic canvas fit.
   * =========================================================
   */

  const canvasWidth = 1000;
  const actorWidth = 140;
  const spacing = 55;
  const baseBottom = 160;

  const totalWidth =
    total * actorWidth +
    (total - 1) * spacing;

  const startX =
    (canvasWidth - totalWidth) / 2;

  const x =
    startX +
    index * (actorWidth + spacing);

  /**
   * Composition structure:
   *
   * 1 = outer left
   * 2 = inner left
   * 3 = hero center
   * 4 = inner right
   * 5 = outer right
   */

  if (index === 2) {
  return {
    position: "absolute" as const,
    bottom: `${baseBottom - 30}px`,
    left: `${x}px`,
    transform: "scale(1.22)",
    zIndex: 50,
  };
}

if (index === 1 || index === 3) {
  const rotate = index === 1 ? -4 : 4;

  return {
    position: "absolute" as const,
    bottom: `${baseBottom + 20}px`,
    left: `${x}px`,
    transform: `scale(0.96) rotate(${rotate}deg)`,
    zIndex: 35,
  };


}

const rotate = index === 0 ? -7 : 7;

return {
  position: "absolute" as const,
  bottom: `${baseBottom + 55}px`,
  left: `${x}px`,
  transform: `scale(0.82) rotate(${rotate}deg)`,
  zIndex: 20,
};

}

  if (layout === "grid") {
    const cols = Math.min(total, 3);
    const col = index % cols;
    const row = Math.floor(index / cols);

    return {
      position: "absolute" as const,
      bottom: `${baseBottom + row * 220}px`,
      left: `calc(50% + ${(col - 1) * 140}px)`,
      transform: "translateX(-50%)",
      zIndex: 10 + index,
    };
  }

  return {
    position: "absolute" as const,
    bottom: "0px",
    left: "0px",
    opacity: 0,
    zIndex: -1,
  };
}




/**
 * =========================================================
 * MAIN COMPILER
 * =========================================================
 */

export function buildCompositionScene(
  seed: any,
  selected: any,
  treatments: CompositionTreatments
): CompositionScene {
  const nodes: SceneNode[] = [];

  const actors = seed?.assets?.actors ?? [];
  const banners = seed?.assets?.banners ?? [];
  const collageAssets = seed?.assets?.collage ?? seed?.assets?.backdrops ?? [];
  const logo = seed?.assets?.logo ?? null;

 const blueprints = resolveVariantBlueprints({
    actors: selected.actors,
    collage: selected.collage,
    logo: selected.logo,
  });

  console.log(
  "[BLUEPRINT DEBUG]",
  JSON.stringify(blueprints, null, 2)
);
  

  const backdrop =
    seed?.background?.src ?? seed?.assets?.backdrops?.[0];

  const activeTreatments = {
    actors: flattenTreatments(treatments?.actors),
    collage: flattenTreatments(treatments?.collage),
    logo: flattenTreatments(treatments?.logo),
  };

/**
 * 
 * Actor
 */

const actorVariant =
  selected?.actors
    ? variantRegistry[
        selected.actors
      ]
    : null;

const actorNodes =
  buildActorNodes(
    actors,

    actorVariant,

    blueprints.actors,

    activeTreatments.actors,

    computeActorPosition
  );

nodes.push(...actorNodes);

console.log(
  "[ACTOR TEST]",
  actorNodes.length
);

  console.log("[STAGE3 COMPILER]", activeTreatments);

console.log( "[SELECTED DEBUG]", JSON.stringify(selected, null, 2) );

const collageVariant =
  selected?.collage
    ? variantRegistry[
        selected.collage
      ]
    : null;

const collageNodes =
  buildCollageNodes(
    collageAssets,

    collageVariant,

    blueprints.collage,

    activeTreatments.collage
  );

nodes.push(...collageNodes);

console.log(
  "[COLLAGE TEST]",
  collageNodes.length
);


  
const backgroundNode =
  buildBackgroundNode(backdrop);

if (backgroundNode) {
  nodes.push(backgroundNode);
}
console.log(
  "[BACKGROUND TEST]",
  backgroundNode
);

    /**
 * =========================================================
 * BANNERS
 * =========================================================
 */

const bannerNodes =
  buildBannerNodes(
    banners,
    computeBannerPosition
  );

nodes.push(...bannerNodes);

  console.log(
  "[BANNER TEST]",
  bannerNodes
);

  /**
   * LOGO
   */

  const logoNode =
  buildLogoNode(
    logo,
    blueprints.logo,
    activeTreatments.logo
  );

if (logoNode) {
  nodes.push(logoNode);
}
console.log(
  "[LOGO TEST]",
  logoNode
);
 

  console.log("[STAGE3 SCENE COMPILER][FINAL]", {
    nodes: nodes.length,
  });

  return {
    movieId: seed?.movieId,
    nodes,
  };

  function computeBannerPosition(index: number) {
  const canvasWidth = 1000;

  const baseTop = 80;
  const spacing = 90;

  return {
    position: "absolute" as const,
    top: `${baseTop + index * spacing}px`,
    left: "0px",
    width: `${canvasWidth}px`,
    height: "60px",
    zIndex: 50 + index,
  };
}
}


