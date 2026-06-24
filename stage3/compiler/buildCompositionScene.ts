"use client";

import { resolveVariantBlueprints } from "@/stage3/engine/variant/resolveVariantBlueprint";
import { variantRegistry } from "@/stage3/variants/variantRegistry";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — FINAL SCENE COMPILER
 * =========================================================
 *
 * CHANGE: 2026-06-23 | 07:45
 * ---------------------------------------------------------
 * REMOVED AUTOMATIC TREATMENT INTELLIGENCE
 *
 * REASON:
 * ---------------------------------------------------------
 * JELLYBACK LAW 1
 *
 * Stage 3 is presentation only.
 *
 * Previous architecture automatically mapped:
 *
 * variant -> treatment
 *
 * This introduced hidden intelligence.
 *
 * Treatments must be explicitly selected by user.
 *
 * Scene compiler now acts ONLY as transport layer.
 *
 * NO automatic decision making permitted.
 * =========================================================
 */

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

  /**
   * =====================================================
   * USER CONTROLLED TREATMENTS ONLY
   * =====================================================
   *
   * DATE: 2026-06-23
   *
   * Compiler does NOT decide treatments.
   * UI/store must supply them explicitly.
   * =====================================================
   */

  treatments?: string[];
};

export type CompositionScene = {
  movieId: string;
  nodes: SceneNode[];
};

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
  const baseBottom = 160;

  if (layout === "row") {
    const spacing = 120;
    const centerOffset =
      (total - 1) * spacing * 0.5;

    return {
      position: "absolute" as const,
      bottom: `${baseBottom}px`,
      left: `calc(50% + ${
        index * spacing - centerOffset
      }px)`,
      transform: "translateX(-50%)",
      zIndex: 10 + index,
    };
  }

  if (layout === "center-focus") {
    const spacing = 110;

    const centerOffset =
      (total - 1) * spacing * 0.5;

    const isCenter =
      index === Math.floor(total / 2);

    return {
      position: "absolute" as const,
      bottom: `${baseBottom}px`,
      left: `calc(50% + ${
        index * spacing - centerOffset
      }px)`,

      transform: isCenter
        ? "translateX(-50%) scale(1.08)"
        : "translateX(-50%)",

      zIndex: isCenter
        ? 20
        : 10 + index,
    };
  }

  if (layout === "w-overlap") {
    const spacing = 100;

    const centerOffset =
      (total - 1) * spacing * 0.5;

    const verticalNudge =
      index % 2 === 0 ? 0 : 20;

    return {
      position: "absolute" as const,

      bottom: `${
        baseBottom + verticalNudge
      }px`,

      left: `calc(50% + ${
        index * spacing - centerOffset
      }px)`,

      transform:
        "translateX(-50%) skewY(-2deg)",

      zIndex: 10 + index,
    };
  }

  if (layout === "grid") {
    const cols = Math.min(total, 3);
    const col = index % cols;
    const row = Math.floor(index / cols);

    return {
      position: "absolute" as const,

      bottom: `${
        baseBottom + row * 220
      }px`,

      left: `calc(50% + ${
        (col - 1) * 140
      }px)`,

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
 * COLLAGE POSITIONING
 * =========================================================
 */

function computeCollagePosition(
  layout:
    | "row"
    | "center-focus"
    | "w-overlap"
    | "grid"
    | "none",
  index: number,
  total: number
) {
  const baseTop = 120;
  const spacing = 180;

  const centerOffset =
    (total - 1) * spacing * 0.5;

  return {
    position: "absolute" as const,

    top: `${baseTop}px`,

    left: `calc(50% + ${
      index * spacing - centerOffset
    }px)`,

    transform: "translateX(-50%)",

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

  /**
   * =====================================================
   * NEW INPUT
   * =====================================================
   *
   * Treatments come ONLY from user-controlled store.
   *
   * NO internal treatment resolution allowed.
   * =====================================================
   */

  treatments: any
): CompositionScene {
  const nodes: SceneNode[] = [];

  const actors =
    seed?.assets?.actors ?? [];

  const collageAssets =
    seed?.assets?.collage ??
    seed?.assets?.backdrops ??
    [];

  const logo =
    seed?.assets?.logo ?? null;

  const backdrop =
    seed?.background?.src ??
    seed?.assets?.backdrops?.[0];

  console.log(
    "[STAGE3 SCENE COMPILER][INPUT]",
    {
      movieId: seed?.movieId,
      actorCount: actors.length,
      collageCount:
        collageAssets.length,

      selected,

      /**
       * NEW LOGGING
       */

      treatments,
    }
  );

  const blueprints =
    resolveVariantBlueprints({
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
   * ACTORS
   */

  const actorVariantId =
    selected?.actors;

  const actorVariant =
    actorVariantId
      ? variantRegistry[
          actorVariantId
        ]
      : null;

  const actorLimit =
    actorVariant?.maxAssets ??
    actors.length;

  const limitedActors =
    actors.slice(0, actorLimit);

  const actorLayout =
    (blueprints.actors?.type as any) ??
    "row";

  if (
    limitedActors.length &&
    blueprints.actors
  ) {
    limitedActors.forEach(
      (actor: any, i: number) => {
        const pos =
          computeActorPosition(
            actorLayout,
            i,
            limitedActors.length
          );

        nodes.push({
          id:
            actor.id ??
            `actor-${i}`,

          layer: "actors",

          src: actor.image,

          visible: true,

          style: {
            ...pos,
            width: "140px",
            height: "200px",
          },

          /**
           * USER CONTROLLED
           */

          treatments:
            treatments?.actors
              ? [treatments.actors]
              : [],
        });
      }
    );
  }

  /**
   * LOGO
   */

  const logoBlueprint =
    blueprints.logo;

  if (logo && logoBlueprint) {
    nodes.push({
      id: "logo",

      layer: "logo",

      src: logo,

      visible:
        logoBlueprint.type !==
        "none",

      style: {
        ...logoBlueprint.style,
        width: "180px",
        height: "80px",
      },

      treatments:
        treatments?.logo
          ? [treatments.logo]
          : [],
    });
  }

  /**
   * COLLAGE
   */

  const collageVariantId =
    selected?.collage;

  const collageVariant =
    collageVariantId
      ? variantRegistry[
          collageVariantId
        ]
      : null;

  const collageLimit =
    collageVariant?.maxAssets ??
    collageAssets.length;

  const limitedCollage =
    collageAssets.slice(
      0,
      collageLimit
    );

  const collageLayout =
    (blueprints.collage?.type as any) ??
    "row";

  if (
    limitedCollage.length &&
    blueprints.collage
  ) {
    limitedCollage.forEach(
      (image: any, i: number) => {
        const pos =
          computeCollagePosition(
            collageLayout,
            i,
            limitedCollage.length
          );

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

          treatments:
            treatments?.collage
              ? [treatments.collage]
              : [],
        });
      }
    );
  }

  console.log(
    "[STAGE3 SCENE COMPILER][FINAL]",
    {
      movieId: seed?.movieId,
      nodes: nodes.length,
    }
  );

  return {
    movieId: seed?.movieId,
    nodes,
  };
}