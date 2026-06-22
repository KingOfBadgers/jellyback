"use client";

/**
 * =========================================================
 * JELLYFIN STAGE 3 — FINAL SCENE COMPILER (GEOMETRY FIX)
 * =========================================================
 *
 * CHANGE (2026-06-21)
 * ------------------
 * FIX:
 * - Introduced per-actor geometry distribution
 * - Eliminates shared-style stacking bug
 *
 * KEY CHANGE:
 * - Blueprint is now expanded per actor index
 * =========================================================
 */

import { resolveVariantBlueprints } from "@/stage3/engine/variant/resolveVariantBlueprint";
import { variantRegistry } from "@/stage3/variants/variantRegistry";

export type SceneNode = {
  id: string;
  layer: "background" | "actors" | "collage" | "logo";

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
};

export type CompositionScene = {
  movieId: string;
  nodes: SceneNode[];
};

/**
 * =========================================================
 * GEOMETRY ENGINE (PURE)
 * =========================================================
 *
 * FIX: per-index layout distribution
 * replaces previous single-style duplication bug
 */
function computeActorPosition(
  layout: "row" | "center-focus" | "w-overlap" | "grid" | "none",
  index: number,
  total: number
) {
  const baseBottom = 160;

  /**
   * ROW LAYOUT
   * evenly spreads actors horizontally
   */
  if (layout === "row") {
    const spacing = 120;
    const centerOffset = (total - 1) * spacing * 0.5;

    return {
      position: "absolute" as const,
      bottom: `${baseBottom}px`,
      left: `calc(50% + ${(index * spacing) - centerOffset}px)`,
      transform: "translateX(-50%)",
      zIndex: 10 + index,
    };
  }

  /**
   * CENTER FOCUS
   * middle actor slightly emphasized
   */
  if (layout === "center-focus") {
    const spacing = 110;
    const centerOffset = (total - 1) * spacing * 0.5;

    const isCenter = index === Math.floor(total / 2);

    return {
      position: "absolute" as const,
      bottom: `${baseBottom}px`,
      left: `calc(50% + ${(index * spacing) - centerOffset}px)`,
      transform: isCenter
        ? "translateX(-50%) scale(1.08)"
        : "translateX(-50%)",
      zIndex: isCenter ? 20 : 10 + index,
    };
  }

  /**
   * W OVERLAP
   * slight stagger effect
   */
  if (layout === "w-overlap") {
    const spacing = 100;
    const centerOffset = (total - 1) * spacing * 0.5;

    const verticalNudge = index % 2 === 0 ? 0 : 20;

    return {
      position: "absolute" as const,
      bottom: `${baseBottom + verticalNudge}px`,
      left: `calc(50% + ${(index * spacing) - centerOffset}px)`,
      transform: "translateX(-50%) skewY(-2deg)",
      opacity: 0.98,
      zIndex: 10 + index,
    };
  }

  /**
   * GRID (fallback simple)
   */
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

export function buildCompositionScene(seed: any, selected: any): CompositionScene {
  const nodes: SceneNode[] = [];

  const actors = seed?.assets?.actors ?? [];
  const logo = seed?.assets?.logo ?? null;
  const backdrop = seed?.background?.src ?? seed?.assets?.backdrops?.[0];

  console.log("[STAGE3 SCENE COMPILER][INPUT]", {
    movieId: seed?.movieId,
    actorCount: actors.length,
    selected,
  });

  const blueprints = resolveVariantBlueprints({
    actors: selected.actors,
    collage: selected.collage,
    logo: selected.logo,
  });

  console.log("[STAGE3 SCENE COMPILER][BLUEPRINTS]", blueprints);

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
    });
  }

  /**
   * =========================================================
   * ACTORS (FIXED GEOMETRY EXPANSION)
   * =========================================================
   */

  const actorVariantId = selected?.actors;
  const actorVariant = actorVariantId
    ? variantRegistry[actorVariantId]
    : null;

  const actorLimit = actorVariant?.maxAssets ?? actors.length;
  const limitedActors = actors.slice(0, actorLimit);

  const actorLayout =
    (blueprints.actors?.type as any) ?? "row";

  console.log("[STAGE3 SCENE COMPILER][ACTOR_LAYOUT]", {
    actorLayout,
    actorCount: limitedActors.length,
  });

  if (limitedActors.length && blueprints.actors) {
    limitedActors.forEach((actor: any, i: number) => {
      const pos = computeActorPosition(
        actorLayout,
        i,
        limitedActors.length
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
      });
    });
  }

  /**
   * LOGO
   */
  const logoBlueprint = blueprints.logo;

  if (logo && logoBlueprint) {
    nodes.push({
      id: "logo",
      layer: "logo",
      src: logo,
      visible: logoBlueprint.type !== "none",
      style: {
        ...logoBlueprint.style,
        width: "180px",
        height: "80px",
      },
    });
  }

  /**
   * COLLAGE
   */
  const collageBlueprint = blueprints.collage;

  if (collageBlueprint && collageBlueprint.type !== "none") {
    nodes.push({
      id: "collage",
      layer: "collage",
      visible: true,
      style: {
        ...collageBlueprint.style,
        width: "300px",
        height: "300px",
      },
    });
  }

  console.log("[STAGE3 SCENE COMPILER][FINAL]", {
    movieId: seed?.movieId,
    nodes: nodes.length,
  });

  return {
    movieId: seed?.movieId,
    nodes,
  };
}