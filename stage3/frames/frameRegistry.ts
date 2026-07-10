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

export type FramePlacementMode =
  | "width"
  | "height"
  | "contain"
  | "absolute";

export type FrameAnchor =
  | "top"
  | "bottom"
  | "center";

export type FrameImageSource =
  | "actors"
  | "backdrops";



export type FrameImageSlot = {

  id: string;

  /**
   * Native PNG coordinates
   */

  x: number;
  y: number;

  width: number;
  height: number;

};

export type FrameDefinition = {

  id: string;
  displayName: string;
  src: string;


  /**
   * Which asset collection fills slots
   */
  imageSource: FrameImageSource;


  /**
   * Eligibility requirement
   */
  maxAssets: number;


  /**
   * Native PNG dimensions
   */
  canvas: {

    width: number;

    height: number;

  };


  /**
   * Native slot geometry
   */
  imageSlots: FrameImageSlot[];


  /**
   * Placement on Stage 3 canvas
   */
  placement: {

    mode: FramePlacementMode;
    anchor?: FrameAnchor;
    width?: number;
    height?: number;

  };

};

export const frameRegistry: FrameDefinition[] = [

  {
  id:"five_horiz_panel_actor",
  displayName:
    "Five Horizontal Panel — Actors",
  src:
    "/frames/film-strip-5.png",
  imageSource:
    "actors",
  maxAssets:
    5,
  canvas:{
    width:1333,
    height:252,
  },
   imageSlots:[
  {
    id:"actor1",
    x:10,
    y:40,
    width:250,
    height:175,
  },
  {
    id:"actor2",
    x:275,
    y:40,
    width:250,
    height:175,
  },
  {
    id:"actor3",
    x:540,
    y:40,
    width:250,
    height:175,
  },
  {
    id:"actor4",
    x:805,
    y:40,
    width:250,
    height:175,
  },
  {
    id:"actor5",
    x:1070,
    y:40,
    width:250,
    height:175,
  },

  
  ],

  placement:{
    mode:"width",
    anchor:"bottom",
    width:1000,
  },
}
,
{id: "five_horiz_panel_backdrop",

  displayName:
    "Five Horizontal Panel — Backdrop",

  src:
    "/frames/film-strip-5.png",

  imageSource:
    "backdrops",

  maxAssets:
    5,

  canvas:{
    width:1333,
    height:252,
  },

  imageSlots:[
  {
    id:"backdrop1",
    x:0,
    y:40,
    width:266,
    height:175,
  },
  {
    id:"backdrop2",
    x:267,
    y:40,
    width:266,
    height:175,
  },
  {
    id:"backdrop3",
    x:534,
    y:40,
    width:266,
    height:175,
  },
  {
    id:"backdrop4",
    x:801,
    y:40,
    width:266,
    height:175,
  },
  {
    id:"backdrop5",
    x:1068,
    y:40,
    width:265,
    height:175,
  },
],

  placement:{
    mode:"width",
    anchor:"top",
    width:1000,
  },
},

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