"use client";
/**
 * =========================================================
 * JELLYBACK STAGE 3 — FRAME REGISTRY
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Canonical registry for reusable PNG frame templates.
 *
 * A frame defines:
 *
 * • PNG artwork
 * • Native coordinate system
 * • Display size on the Stage 3 canvas
 * • Image slot geometry
 *
 * The builder is responsible for:
 *
 * Native Space
 *        ↓
 * Display Space
 *        ↓
 * Canvas Space
 *
 * using a single uniform scale factor.
 *
 * =========================================================
 */


import type {
  FrameDefinition,
  FramePlacementMode, 
  FrameAnchor, 
  FramePositionMode, 
  FrameImageSource, 
  FrameRenderMode, 
  FrameImageSlot,
  } 
  from "./framestypes";

  import { 
    fiveHorizPanelActor,
    fourSquarePanelActor,
    fourSquarePanelActorV2,
    paperripActor,
    polaroidScatterActor,
    coloured3Actors,
    fiveHorizPanelBackdrop,
    paperripScatter4Backdrops,
    fourSquarePanelBackdropV2,
    fourSquarePanelBackdrops,
    polaroidClassicBackdrop,
    paperripBackdrop,
    polaroidScatter4Backdrops,
    coloured3Backdrops,
    frameOffsetBackdrop,
    polaroidFan3Backdrop,
    threeHorizPanelBackdrop,
    movieScatter4Backdrops,
    frameOffsetActor,
    movieHero3Actors,
    movieHero3Backdrops,
    polaroidClassicActor
  } from "./definitions";


export const frameRegistry: FrameDefinition[] = [
  fiveHorizPanelActor,
  fourSquarePanelActor,
  fourSquarePanelActorV2,
  paperripActor,
  polaroidScatterActor,
  coloured3Actors,
  fiveHorizPanelBackdrop,
  paperripScatter4Backdrops,
  fourSquarePanelBackdropV2,
  fourSquarePanelBackdrops,
  polaroidClassicBackdrop,
  paperripBackdrop,
  polaroidScatter4Backdrops,
  coloured3Backdrops,
  frameOffsetBackdrop,
  polaroidFan3Backdrop,
  threeHorizPanelBackdrop,
  movieScatter4Backdrops,
  frameOffsetActor,
  movieHero3Actors,
  movieHero3Backdrops,
  polaroidClassicActor
];


 export function getFrameById(
  id:string | null
):FrameDefinition | null {

  if(!id){
    return null;
  }

  return (
    frameRegistry.find(
      (frame)=>frame.id===id
    )
    ??
    null
  );
}