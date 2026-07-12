"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — FRAME NODE BUILDER
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Converts Frame Registry definitions into Scene Nodes.
 *
 *
 * A FRAME DEFINES:
 *
 * - PNG artwork
 * - native canvas size
 * - image slots
 * - asset source
 * - placement rules
 *
 *
 * THIS BUILDER DOES:
 *
 * Registry
 *      |
 *      v
 * Scale calculation
 *      |
 *      v
 * Canvas positioning
 *      |
 *      v
 * Scene nodes
 *
 *
 * THIS BUILDER DOES NOT:
 *
 * - choose assets
 * - query Jellyfin
 * - perform eligibility
 * - create variants
 * - make design decisions
 *
 * =========================================================
 */


import { getFrameById } from "@/stage3/frames/frameRegistry";



export function buildFrameNodes(
  frameId:string | null,
  assets:any
){



/**
 * =========================================================
 * SECTION 1 — VALIDATION
 * =========================================================
 */


if(!frameId){
  return [];
}


const frame =
  getFrameById(frameId);



if(!frame){

  console.warn(
    "[FRAME BUILDER] Unknown frame",
    frameId
  );

  return [];

}



/**
 * =========================================================
 * SECTION 2 — SCALE CALCULATION
 * =========================================================
 *
 * Registry values are ALWAYS native PNG values.
 *
 * Example:
 *
 * PNG:
 * 1600 x 2200
 *
 * Display:
 * 750px wide
 *
 * Scale:
 * 750 / 1600
 *
 * =========================================================
 */


const displayWidth =
  frame.placement.width ?? 1000;


const scale =
  displayWidth / frame.canvas.width;



const frameWidth =
  frame.canvas.width * scale;


const frameHeight =
  frame.canvas.height * scale;



/**
 * =========================================================
 * SECTION 3 — FRAME POSITION
 * =========================================================
 *
 * Stage 3 canvas:
 *
 * 1000 x 1350
 *
 * Supported anchors:
 *
 * top
 * bottom
 * center
 *
 * =========================================================
 */


const frameLeft =
  frame.placement.anchor === "center"
    ? (1000 - frameWidth) / 2
    : 0;



const frameTop =
  frame.placement.anchor === "bottom"
    ? 1350 - frameHeight
    : frame.placement.anchor === "center"
      ? (1350 - frameHeight) / 2
      : 0;

/**
 * =========================================================
 * TRANSFORM ORIGIN
 * =========================================================
 *
 * Every frame can define its own pivot.
 *
 * Images and frame artwork MUST use the
 * same transform origin.
 */

const transformOrigin =
  frame.placement.transformOrigin ??
  "center center";


/**
 * =========================================================
 * SECTION 4 — OUTPUT NODE COLLECTION
 * =========================================================
 */


const nodes:any[] = [];




/**
 * =========================================================
 * SECTION 5 — DETERMINE ASSET SOURCE
 * =========================================================
 *
 * Frame decides ONLY which collection.
 *
 * Eligibility has already happened earlier.
 *
 * =========================================================
 */


const sourceAssets =
  frame.imageSource === "actors"
    ? assets.actors ?? []
    : assets.backdrops ?? [];





/**
 * =========================================================
 * SECTION 6 — BUILD IMAGE SLOT NODES
 * =========================================================
 *
 * Creates:
 *
 * frame-slot-xxxx
 *
 *
 * SINGLE MODE:
 *
 * Image follows frame rotation.
 *
 *
 * PER SLOT MODE:
 *
 * Each card has its own rotation.
 *
 * =========================================================
 */


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



if(!image){

 console.warn(
   "[FRAME SLOT] Missing image",
   {
     frame:frame.id,
     slot:slot.id
   }
 );

 return;

}



/**
 * Rotation rules
 *
 * SINGLE:
 * frame controls rotation
 *
 * PER SLOT:
 * slot controls rotation
 */


const imageRotation =
  frame.renderMode === "perSlot"

    ? slot.rotation

    : frame.placement.rotation;



nodes.push({

id:
 `frame-slot-${frame.id}-${slot.id}`,


layer:
 "frame",


src:
 image,


visible:true,



style:{


position:"absolute",



left:
 frame.positionMode === "absolute"
   ? `${slot.x + (slot.imageOffsetX ?? 0)}px`
   : `${frameLeft + (slot.x * scale)}px`,


top:
 frame.positionMode === "absolute"
   ? `${slot.y + (slot.imageOffsetY ?? 0)}px`
   : `${frameTop + (slot.y * scale)}px`,



width:
 `${slot.width * (slot.imageScale ?? 1) * scale}px`,

height:
 `${slot.height * (slot.imageScale ?? 1) * scale}px`,



transform:
 imageRotation
   ? `rotate(${imageRotation}deg)`
   : undefined,



transformOrigin,



zIndex:
 850 + (index * 10),


},



treatments:[],


presentation:{},


});


});





/**
 * =========================================================
 * SECTION 7 — BUILD FRAME ARTWORK
 * =========================================================
 *
 * TWO MODES:
 *
 *
 * NORMAL
 * ------
 *
 * One PNG frame.
 *
 *
 * PER SLOT
 * --------
 *
 * Duplicate PNG for every card.
 *
 * =========================================================
 */



if(frame.renderMode === "perSlot"){



/**
 * MULTI CARD MODE
 *
 * Example:
 *
 * Card 1
 *   image
 *   frame
 *
 * Card 2
 *   image
 *   frame
 *
 * Card 3
 *   image
 *   frame
 *
 */


frame.imageSlots.forEach(
(slot,index)=>{


nodes.push({


id:
 `frame-${frame.id}-${slot.id}`,


layer:
 "frame",


src:
 frame.src,


visible:true,



style:{


position:
 "absolute",



/**
 * IMPORTANT
 *
 * Frame PNG uses the same
 * position as its card image.
 *
 */


left:
 frame.positionMode === "absolute"
   ? `${slot.x}px`
   : `${frameLeft}px`,


top:
 frame.positionMode === "absolute"
   ? `${slot.y}px`
   : `${frameTop}px`,



width:
 `${frameWidth}px`,



height:
 `${frameHeight}px`,



transform:
 slot.rotation
   ? `rotate(${slot.rotation}deg)`
   : undefined,



transformOrigin,



zIndex:
 855 + (index * 10),


},



treatments:[],


presentation:{},


});



});


}



else {



/**
 * SINGLE FRAME MODE
 *
 * Existing behaviour:
 *
 * One image
 * One PNG
 *
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


position:
 "absolute",



left:
 `${frameLeft}px`,



top:
 `${frameTop}px`,



width:
 `${frameWidth}px`,



height:
 `${frameHeight}px`,



transform:
 frame.placement.rotation

   ? `rotate(${frame.placement.rotation}deg)`

   : undefined,
transformOrigin,
zIndex:
 900,
},



treatments:[],


presentation:{},


});



}





/**
 * =========================================================
 * SECTION 8 — RETURN SCENE NODES
 * =========================================================
 */


return nodes;


}