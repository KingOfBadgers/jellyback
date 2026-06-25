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
 *
 * RESPONSIBILITIES:
 *
 * - Receive seed data
 * - Resolve variant blueprints
 * - Build render nodes
 * - Transport explicit user-selected treatments
 * - Structural normalization only
 *
 * NON RESPONSIBILITIES:
 *
 * - No automatic treatment selection
 * - No visual rendering logic
 * - No hidden intelligence
 *
 * JELLYBACK LAW 1
 * ---------------------------------------------------------
 * Stage 3 is presentation only.
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
    | "logo";

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
   * Explicit user-selected treatments
   */

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

  return Object.values(
    treatmentGroup
  ).filter(
    (v): v is string =>
      Boolean(v)
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
  const baseBottom = 160;

  if (layout === "row") {
    const spacing = 120;

    const centerOffset =
      (total - 1) *
      spacing *
      0.5;

    return {
      position: "absolute" as const,

      bottom: `${baseBottom}px`,

      left: `calc(50% + ${
        index * spacing -
        centerOffset
      }px)`,

      transform:
        "translateX(-50%)",

      zIndex: 10 + index,
    };
  }

  if (
    layout ===
    "center-focus"
  ) {
    const spacing = 110;

    const centerOffset =
      (total - 1) *
      spacing *
      0.5;

    const isCenter =
      index ===
      Math.floor(total / 2);

    return {
      position: "absolute" as const,

      bottom: `${baseBottom}px`,

      left: `calc(50% + ${
        index * spacing -
        centerOffset
      }px)`,

      transform: isCenter
        ? "translateX(-50%) scale(1.08)"
        : "translateX(-50%)",

      zIndex: isCenter
        ? 20
        : 10 + index,
    };
  }

  if (
    layout ===
    "w-overlap"
  ) {
    const spacing = 100;

    const centerOffset =
      (total - 1) *
      spacing *
      0.5;

    const verticalNudge =
      index % 2 === 0
        ? 0
        : 20;

    return {
      position: "absolute" as const,

      bottom: `${
        baseBottom +
        verticalNudge
      }px`,

      left: `calc(50% + ${
        index * spacing -
        centerOffset
      }px)`,

      transform:
        "translateX(-50%) skewY(-2deg)",

      zIndex: 10 + index,
    };
  }

  if (layout === "grid") {
    const cols =
      Math.min(total, 3);

    const col =
      index % cols;

    const row =
      Math.floor(
        index / cols
      );

    return {
      position: "absolute" as const,

      bottom: `${
        baseBottom +
        row * 220
      }px`,

      left: `calc(50% + ${
        (col - 1) * 140
      }px)`,

      transform:
        "translateX(-50%)",

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
 *
 * NOTE:
 * Currently simple row system.
 *
 * Future variants may expand this.
 * =========================================================
 */

function computeCollagePosition(
  index: number,
  total: number
) {
  const baseTop = 120;
  const spacing = 180;

  const centerOffset =
    (total - 1) *
    spacing *
    0.5;

  return {
    position: "absolute" as const,

    top: `${baseTop}px`,

    left: `calc(50% + ${
      index * spacing -
      centerOffset
    }px)`,

    transform:
      "translateX(-50%)",

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
  const nodes: SceneNode[] =
    [];

  const actors =
    seed?.assets?.actors ??
    [];

  const collageAssets =
    seed?.assets?.collage ??
    seed?.assets?.backdrops ??
    [];

  const logo =
    seed?.assets?.logo ??
    null;

  const backdrop =
    seed?.background?.src ??
    seed?.assets
      ?.backdrops?.[0];

  /**
   * Precompute treatments once
   */

  const activeTreatments = {
    actors:
      flattenTreatments(
        treatments?.actors
      ),

    collage:
      flattenTreatments(
        treatments?.collage
      ),

    logo:
      flattenTreatments(
        treatments?.logo
      ),
  };

  console.log(
    "[STAGE3 COMPILER]",
    activeTreatments
  );

  const blueprints =
    resolveVariantBlueprints(
      {
        actors:
          selected.actors,

        collage:
          selected.collage,

        logo:
          selected.logo,
      }
    );

  /**
   * BACKGROUND
   */

  if (backdrop) {
    nodes.push({
      id: "background",

      layer:
        "background",

      src: backdrop,

      visible: true,

      style: {
        position:
          "absolute",

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

  const actorVariant =
    selected?.actors
      ? variantRegistry[
          selected.actors
        ]
      : null;

  const actorLimit =
    actorVariant?.maxAssets ??
    actors.length;

  const limitedActors =
    actors.slice(
      0,
      actorLimit
    );

  const actorLayout =
    (blueprints.actors
      ?.type as any) ??
    "row";

  if (
    limitedActors.length &&
    blueprints.actors
  ) {
    limitedActors.forEach(
      (
        actor: any,
        i: number
      ) => {
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

          src:
            actor.image,

          visible: true,

          style: {
            ...pos,
            width:
              "140px",
            height:
              "200px",
          },

          treatments:
            activeTreatments.actors,
        });
      }
    );
  }

  /**
   * LOGO
   */

  if (
    logo &&
    blueprints.logo
  ) {
    nodes.push({
      id: "logo",

      layer: "logo",

      src: logo,

      visible:
        blueprints.logo
          .type !==
        "none",

      style: {
        ...blueprints
          .logo.style,

        width:
          "180px",

        height:
          "80px",
      },

      treatments:
        activeTreatments.logo,
    });
  }

  /**
   * COLLAGE
   */

  const collageVariant =
    selected?.collage
      ? variantRegistry[
          selected.collage
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

  if (
    limitedCollage.length &&
    blueprints.collage
  ) {
    limitedCollage.forEach(
      (
        image: any,
        i: number
      ) => {
        const pos =
          computeCollagePosition(
            i,
            limitedCollage.length
          );

        nodes.push({
          id: `collage-${i}`,

          layer:
            "collage",

          src: image,

          visible: true,

          style: {
            ...pos,

            width:
              "260px",

            height:
              "180px",
          },

          treatments:
            activeTreatments.collage,
        });
      }
    );
  }

  console.log(
    "[STAGE3 SCENE COMPILER][FINAL]",
    {
      nodes:
        nodes.length,
    }
  );

  return {
    movieId:
      seed?.movieId,

    nodes,
  };
}