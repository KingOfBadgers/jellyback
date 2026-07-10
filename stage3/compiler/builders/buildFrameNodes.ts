"use client";


/**
 * =========================================================
 * JELLYBACK STAGE 3 — FRAME NODE BUILDER
 * =========================================================
 *
 * CURRENT RESPONSIBILITY
 * ---------------------------------------------------------
 * Render selected PNG frame overlays.
 *
 * DOES:
 * - resolve registry definition
 * - scale native frame size
 * - place frame on Stage 3 canvas
 *
 * DOES NOT:
 * - populate image slots
 * - select assets
 * - perform composition logic
 *
 * =========================================================
 */

import { getFrameById } from "@/stage3/frames/frameRegistry";


export function buildFrameNodes(
  frameId: string | null,
  assets: any
) {

  if (!frameId) {
    return [];
  }


  const frame = getFrameById(frameId);


  if (!frame) {
    console.warn(
      "[FRAME BUILDER] Unknown frame",
      frameId
    );

    return [];
  }


  const scale =
    1000 / frame.canvas.width;

     const frameTop =
          frame.placement.anchor === "bottom"
            ? 1350 - (frame.canvas.height * scale)
            : 0;

  const nodes:any[] = [];


  /**
   * IMAGE SLOTS
   */

  const sourceAssets =
    frame.imageSource === "actors"
      ? assets.actors ?? []
      : assets.backdrops ?? [];


  frame.imageSlots.forEach(
    (slot,index)=>{

      const asset =
  sourceAssets[index];

const image =
  typeof asset === "string"
    ? asset
    : asset?.image ??
      asset?.src ??
      asset?.url ??
      asset?.path;

if (!image) {
  console.warn(
    "[FRAME SLOT] Missing image source",
    {
      frame: frame.id,
      slot: slot.id,
      asset,
    }
  );

  return;
}

nodes.push({
  id:
    `frame-slot-${frame.id}-${slot.id}`,

  layer:
    "frame",

  src:
    image,

  visible:
    true,


       

        style:{

  position:"absolute",

  left:
    `${slot.x * scale}px`,

  top:
    `${frameTop + (slot.y * scale)}px`,

  width:
    `${slot.width * scale}px`,

  height:
    `${slot.height * scale}px`,

  zIndex:850,


        },


        treatments:[],


        presentation:{},

      });

    }
  );



  /**
   * FRAME ARTWORK
   */

  nodes.push({

    id:
      `frame-${frame.id}`,

    layer:
      "frame",

    src:
      frame.src,

    visible:true,


    style:{

      position:"absolute",

      left:"0px",

      top:
        `${frame.placement.anchor === "bottom"
          ? 1350 - (frame.canvas.height * scale)
          : 0}px`,

      width:
        `${frame.canvas.width * scale}px`,


      height:
        `${frame.canvas.height * scale}px`,


      zIndex:900,

    },


    treatments:[],


    presentation:{},

  });


  return nodes;

}