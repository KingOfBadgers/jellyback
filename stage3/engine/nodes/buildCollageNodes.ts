"use client";

import { resolveCollagePosition }
  from "@/stage3/engine/spatial/collagePositionResolver";

/**
 * =========================================================
 * BUILD COLLAGE NODES
 * =========================================================
 */

export function buildCollageNodes(
  collageAssets: any[],

  collageVariant: any,

  blueprint: any,

  treatments: string[]
) {
  const nodes: any[] = [];
  /**
 * Respect hidden variants (NONE)
 */

if (
  !collageVariant ||
  collageVariant.visibility === "hide"
) {
  return [];
}
  if (!collageAssets?.length || !blueprint) {
    return nodes;
  }

  /**
   * Asset limiting from variant
   */

  const collageLimit =
    collageVariant?.maxAssets ??
    collageAssets.length;

  const limitedCollage =
    collageAssets.slice(
      0,
      collageLimit
    );

  /**
   * Variant layout
   */

  const collageLayout =
    blueprint?.type ?? "row";

  limitedCollage.forEach(
    (image: any, i: number) => {
      /**
       * Spatial resolver
       */

      const pos =
        resolveCollagePosition(
          collageLayout,
          i,
          limitedCollage.length
        );

      /**
       * Presentation metadata
       */

      const presentation =
        collageVariant?.presentation ?? {};

      /**
       * Size rules
       */

      const isVertical =
        collageLayout === "vertical-left" ||
        collageLayout === "vertical-right";

      const isGrid =
        collageLayout === "grid";

      const width =
        isVertical
          ? "180px"
          : isGrid
          ? "300px"
          : "260px";

      const height =
        isVertical
          ? "210px"
          : isGrid
          ? "210px"
          : "180px";

      console.log(
        "[COLLAGE NODE]",
        {
          layout: collageLayout,
          index: i,
        }
      );

      nodes.push({id: `${collageVariant.id}-collage-${i}`,

        layer: "collage",

        src: image,

        visible: true,

        style: {
          ...pos,
          width,
          height,
        },

        presentation,

        treatments,
      });
    }
  );

  return nodes;
}