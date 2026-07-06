"use client";

import { resolveCollagePosition } from "@/stage3/engine/spatial/collagePositionResolver";

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
  /**
   * Hidden variants (NONE)
   */

  if (
    !collageVariant ||
    collageVariant.visibility === "hide"
  ) {
    return [];
  }

  const nodes: any[] = [];

  if (!collageAssets?.length || !blueprint) {
    return nodes;
  }

  /**
   * Respect variant asset limits
   */

  const collageLimit =
    collageVariant.maxAssets ??
    collageAssets.length;

  const limitedCollage =
    collageAssets.slice(0, collageLimit);

  /**
   * Blueprint layout
   */

  const collageLayout =
    blueprint.type ?? "row";

  limitedCollage.forEach(
    (image: any, index: number) => {

      /**
       * Spatial placement
       */

      const position =
        resolveCollagePosition(
          collageLayout,
          index,
          limitedCollage.length
        );

      /**
       * Presentation metadata
       */

      const presentation =
        collageVariant.presentation ?? {};

      /**
       * =====================================================
       * Variant sizing
       * =====================================================
       */

      let width = "260px";
      let height = "180px";

      switch (collageLayout) {

        case "vertical-left":
        case "vertical-right":
          width = "180px";
          height = "210px";
          break;

        case "grid":
          width = "300px";
          height = "210px";
          break;

        case "soft-wash":
          width = "560px";
          height = "340px";
          break;

        default:
          width = "260px";
          height = "180px";
      }

      console.log(
        "[COLLAGE NODE]",
        {
          layout: collageLayout,
          index,
          width,
          height,
        }
      );

      nodes.push({
        id: `${collageVariant.id}-collage-${index}`,

        layer: "collage",

        src: image,

        visible: true,

        style: {
          ...position,
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