"use client";

import { resolveVariantBlueprints } from "@/stage3/engine/variant/resolveVariantBlueprint";
import { variantRegistry } from "@/stage3/variants/variantRegistry";

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
 * SPATIAL TOOLKIT (NEW)
 * =========================================================
 *
 * CHANGE: 2026-06-26
 * REASON:
 * Extract deterministic spacing logic into shared utilities
 * without introducing layout decision complexity.
 */

const SPATIAL_CONFIG = {
  canvasWidth: 1000,
  actorWidth: 140,
  collageWidth: 260,
  logoWidth: 800,
  baseBottom: 160,
  baseTop: 120,
  outerMargin: 40,
};

function computeEvenSpacing(
  total: number,
  itemWidth: number,
  canvasWidth: number,
  margin: number
) {
  const usableWidth = canvasWidth - margin * 2;
  const totalItemsWidth = total * itemWidth;
  const remainingSpace = usableWidth - totalItemsWidth;

  return total > 1 ? remainingSpace / (total - 1) : 0;
}

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
 * COLLAGE POSITIONING (MINOR ALIGNMENT NORMALISATION)
 * =========================================================
 */

function computeCollagePosition(index: number, total: number) {
  const spacing = computeEvenSpacing(
    total,
    SPATIAL_CONFIG.collageWidth,
    SPATIAL_CONFIG.canvasWidth,
    SPATIAL_CONFIG.outerMargin
  );

  const totalWidth =
  total * SPATIAL_CONFIG.actorWidth +
  (total - 1) * spacing;

const startX =
  (SPATIAL_CONFIG.canvasWidth - totalWidth) / 2;

const x =
  startX + index * (SPATIAL_CONFIG.actorWidth + spacing);

  return {
    position: "absolute" as const,
    top: `${SPATIAL_CONFIG.baseTop}px`,
    left: `${x}px`,
    transform: "translateX(0)",
    zIndex: 2 + index,
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
  const collageAssets =
    seed?.assets?.collage ?? seed?.assets?.backdrops ?? [];

  const logo = seed?.assets?.logo ?? null;

  const backdrop =
    seed?.background?.src ?? seed?.assets?.backdrops?.[0];

  const activeTreatments = {
    actors: flattenTreatments(treatments?.actors),
    collage: flattenTreatments(treatments?.collage),
    logo: flattenTreatments(treatments?.logo),
  };

  console.log("[STAGE3 COMPILER]", activeTreatments);

  const blueprints = resolveVariantBlueprints({
    actors: selected.actors,
    collage: selected.collage,
    logo: selected.logo,
  });

  /**
   * BACKGROUND
   */

  if (backdrop) {
    nodes.push({
      id: "background",
      layer: "background",
      src: backdrop,
      visible: true,
      style: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "1000px",
        height: "1400px",
        opacity: 1,
        zIndex: 0,
      },
      treatments: [],
    });
  }


    /**
 * =========================================================
 * BANNERS
 * =========================================================
 */

if (banners.length) {
  banners.forEach((banner: any, i: number) => {
    const pos = computeBannerPosition(i);

    nodes.push({
      id: `banner-${i}`,
      layer: "banner",
      src: banner,
      visible: true,
      style: {
        ...pos,
      },
      treatments: [],
    });
  });
}
  /**
   * ACTORS
   */

  const actorVariant = selected?.actors
    ? variantRegistry[selected.actors]
    : null;

  const actorLimit = actorVariant?.maxAssets ?? actors.length;

  const limitedActors = actors.slice(0, actorLimit);

  const actorLayout = (blueprints.actors?.type as any) ?? "row";

  if (limitedActors.length && blueprints.actors) {
    limitedActors.forEach((actor: any, i: number) => {
      const pos = computeActorPosition(actorLayout, i, limitedActors.length);

console.log(
  "[ACTOR POSITION DEBUG]",
  {
    actor: i,
    layout: actorLayout,
    left: pos.left,
    bottom: pos.bottom,
    transform: pos.transform,
  }
);

      nodes.push({
        id: actor.id ?? `actor-${i}`,
        layer: "actors",
        src: actor.image,
        visible: true,
        style: {
          ...pos,
          width: "140px",
          height: "200px",
        },
        treatments: activeTreatments.actors,
      });
    });
  }

  /**
   * LOGO
   */

  if (logo && blueprints.logo) {
    nodes.push({
      id: "logo",
      layer: "logo",
      src: logo,
      visible: blueprints.logo.type !== "none",
      style: {
        ...blueprints.logo.style,
        width: "800px",
        height: "150px",
      },
      treatments: activeTreatments.logo,
    });
  }

  /**
   * COLLAGE
   */

  const collageVariant = selected?.collage
    ? variantRegistry[selected.collage]
    : null;

  const collageLimit =
    collageVariant?.maxAssets ?? collageAssets.length;

  const limitedCollage = collageAssets.slice(0, collageLimit);

  if (limitedCollage.length && blueprints.collage) {
    limitedCollage.forEach((image: any, i: number) => {
      const pos = computeCollagePosition(i, limitedCollage.length);

      nodes.push({
        id: `collage-${i}`,
        layer: "collage",
        src: image,
        visible: true,
        style: {
          ...pos,
          width: "260px",
          height: "180px",
        },
        treatments: activeTreatments.collage,
      });
    });
  }

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