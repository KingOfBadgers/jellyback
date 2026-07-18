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
 *
 * Slot based layouts provide their own geometry.
 * Legacy layouts use default variant sizing.
 */

let width: string | undefined;
let height: string | undefined;


if (collageLayout !== "hero-stack") {

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

}
      if (collageLayout === "hero-stack") {

        const slots = [
          {
            top: "250px",
            left: "40px",
            width: "320px",
            height: "180px",
            rotation: -3,
            zIndex: 12,
          },

          {
            top: "320px",
            left: "40px",
            width: "600px",
            height: "338px",
            rotation: 0,
            zIndex: 10,
          },

          {
            top: "540px",
            left: "560px",
            width: "320px",
            height: "180px",
            rotation: 3,
            zIndex: 13,
          },
        ];


        const slot = slots[index];


        if (slot) {

          position.top = slot.top;
          position.left = slot.left;

          position.width = slot.width;
          position.height = slot.height;

          position.transform =
            `rotate(${slot.rotation}deg)`;

          position.zIndex = slot.zIndex;
        }
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

...(collageLayout !== "hero-stack" && width && { width }),
...(collageLayout !== "hero-stack" && height && { height }),
},




        presentation,

        treatments,
      });
    }
  );

  return nodes;
}