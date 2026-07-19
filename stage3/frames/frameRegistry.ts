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

export type FramePositionMode =
  | "relative"
  | "absolute";

export type FrameImageSource =
  | "actors"
  | "backdrops";

export type FrameRenderMode =
  | "single"
  | "perSlot";

export type FrameImageSlot = {

  id:string;

  x:number;
  y:number;

  width:number;
  height:number;


  /**
   * Image adjustment inside frame
   */
  imageOffsetX?:number;

  imageOffsetY?:number;

  imageScale?:number;

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

  rotation?: number;
  positionMode?: FramePositionMode;
  transformOrigin?: string;

};
  renderMode?: FrameRenderMode;
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

 {
  id:"four_square_panel_actor",
  displayName:
    "Four Square Panel — Actors",
  src:
    "/frames/four_square.png",
  imageSource:
    "actors",
  maxAssets:
    4,
  canvas:{
    width:1660,
    height:1645,
  },
   imageSlots:[
  {
    id:"actor1",
    x:122,
    y:101,
    width:666,
    height:667,
  },
  {
    id:"actor2",
    x:868,
    y:101,
    width:666,
    height:667,
  },
  {
    id:"actor3",
    x:122,
    y:862,
    width:666,
    height:667,
  },
  {
    id:"actor4",
    x:868,
    y:862,
    width:666,
    height:667,
  },
  ],

  placement:{
    mode:"width",
    anchor:"center",
    width:600,
  },
}
,

{
  id:"four_square_panel_actor_v2",
  displayName:
    "Four Square Panel — Actors (2)",
  src:
    "/frames/foursquare.png",
  imageSource:
    "actors",
  maxAssets:
    4,
  canvas:{
    width:1923,
    height:1894,
  },
   imageSlots:[
  {
    id:"actor1",
    x:125,
    y:114,
    width:631,
    height:642,
  },
  {
    id:"actor2",
    x:1148,
    y:114,
    width:631,
    height:642,
  },
  {
    id:"actor3",
    x:129,
    y:1090,
    width:631,
    height:642,
  },
  {
    id:"actor4",
    x:1180,
    y:1088,
    width:631,
    height:642,
  },
  ],

  placement:{
    mode:"width",
    anchor:"center",
    width:600,
  },
}
,

{
  id:"four_square_panel_backdrop_v2",
  displayName:
    "Four Square Panel — Backdrops (2)",
  src:
    "/frames/foursquare.png",
  imageSource:
    "backdrops",
  maxAssets:
    4,
  canvas:{
    width:1923,
    height:1894,
  },
   imageSlots:[
  {
    id:"actor1",
    x:125,
    y:114,
    width:631,
    height:642,
  },
  {
    id:"actor2",
    x:1148,
    y:114,
    width:631,
    height:642,
  },
  {
    id:"actor3",
    x:129,
    y:1090,
    width:631,
    height:642,
  },
  {
    id:"actor4",
    x:1180,
    y:1088,
    width:631,
    height:642,
  },
  ],

  placement:{
    mode:"width",
    anchor:"center",
    width:600,
  },
}
,

 {
  id:"four_square_panel_backdrops",
  displayName:
    "Four Square Panel — Backdrop",
  src:
    "/frames/four_square.png",
  imageSource:
    "backdrops",
  maxAssets:
    4,
  canvas:{
    width:1660,
    height:1645,
  },
   imageSlots:[
  {
    id:"actor1",
    x:122,
    y:101,
    width:666,
    height:667,
  },
  {
    id:"actor2",
    x:868,
    y:101,
    width:666,
    height:667,
  },
  {
    id:"actor3",
    x:122,
    y:862,
    width:666,
    height:667,
  },
  {
    id:"actor4",
    x:868,
    y:862,
    width:666,
    height:667,
  },
  ],

  placement:{
    mode:"width",
    anchor:"center",
    width:600,
  },
}
,

{
  id: "polaroid_classic_actor",

  displayName:
    "Polaroid Classic — Actor",
  src:
    "/frames/polaroid-classic.png",
  imageSource:
    "actors",
  maxAssets:
    1,
  
  canvas: {
    width: 1600,
    height: 2200,
  },
  imageSlots: [
    {
      id: "image1",
      x: 140,
      y: 140,
      width: 1380,
      height: 1390,
    },
  ],
  placement:{

    mode:"width",
    anchor:"center",
    width:400,

    rotation:10,

    transformOrigin:"center center",


  },
},

{
  id: "polaroid_classic_backdrop",
  displayName:
    "Polaroid Classic — Backdrop",
  src:
    "/frames/polaroid-classic.png",
  imageSource:
    "backdrops",
  maxAssets:
    1,
  canvas: {
    width: 1600,
    height: 2200,
  },
  
  imageSlots: [
    {
      id: "image1",
      x: 140,
      y: 140,
      width: 1380,
      height: 1390,
    },
  ],
  placement:{

    mode:"width",
    anchor:"center",
    width:400,

    rotation:10,

    transformOrigin:"center center",


  },
},

{
  id: "paperrip_backdrop",
  displayName:
    "Paper Rip — Backdrop",
  src:
    "/frames/paperrip.png",
  imageSource:
    "backdrops",
  maxAssets:
    1,
  canvas: {
    width: 4096,
    height: 4081,
  },
  
  imageSlots: [
    {
      id: "image1",
      x: 868,
      y: 708,
      width: 2320,
      height: 2674,
    },
  ],
  placement:{

    mode:"width",
    anchor:"center",
    width:800,

    rotation:10,

    transformOrigin:"center center",


  },
},

{
  id: "paperrip_actor",
  displayName:
    "Paper Rip — Actor",
  src:
    "/frames/paperrip.png",
  imageSource:
    "actors",
  maxAssets:
    1,
  canvas: {
    width: 4096,
    height: 4081,
  },
  
  imageSlots: [
    {
      id: "image1",
      x: 868,
      y: 708,
      width: 2320,
      height: 2674,
    },
  ],
  placement:{

    mode:"width",
    anchor:"center",
    width:800,

    rotation:10,

    transformOrigin:"center center",


  },
},

{
  id: "polaroid_scatter_4_backdrops",

  displayName:
    "Polaroid Scatter — Backdrop",
  positionMode:"absolute",
  src:
    "/frames/polaroid-classic.png",

  imageSource:
    "backdrops",

  maxAssets:
    4,

  renderMode:
    "perSlot",

  canvas:{
    width:1600,
    height:2200,
  },

  imageSlots:[

{
 id:"card1",
 x:-80,
 y:520,
 width:1380,
 height:1390,
 rotation:-22,
 imageOffsetX:20,
 imageOffsetY:35,
 imageScale:1.05,
},

{
 id:"card2",
 x:180,
 y:330,
 width:1380,
 height:1390,
 rotation:12,
 imageOffsetX:30,
 imageOffsetY:30,
 imageScale:1.03,
},

{
 id:"card3",
 x:500,
 y:500,
 width:1380,
 height:1390,
 rotation:-8,
 imageOffsetX:15,
 imageOffsetY:30,
 imageScale:1.02,
},

{
 id:"card4",
 x:780,
 y:280,
 width:1380,
 height:1390,
 rotation:18,
 imageOffsetX:30,
 imageOffsetY:20,
 imageScale:1.04,
},

],

  placement:{

    mode:"width",
    anchor:"center",

    width:400,

    transformOrigin:"center center",

  },

},



{
  id: "polaroid_scatter_actor",

  displayName:
    "Polaroid Scatter — Actors",
  positionMode:"absolute",
  src:
    "/frames/polaroid-classic.png",

  imageSource:
    "actors",

  maxAssets:
    4,

  renderMode:
    "perSlot",

  canvas:{
    width:1600,
    height:2200,
  },

  imageSlots:[

{
 id:"card1",
 x:-80,
 y:520,
 width:1380,
 height:1390,
 rotation:-22,
 imageOffsetX:20,
 imageOffsetY:35,
 imageScale:1.05,
},

{
 id:"card2",
 x:180,
 y:330,
 width:1380,
 height:1390,
 rotation:12,
 imageOffsetX:30,
 imageOffsetY:30,
 imageScale:1.03,
},

{
 id:"card3",
 x:500,
 y:500,
 width:1380,
 height:1390,
 rotation:-8,
 imageOffsetX:15,
 imageOffsetY:30,
 imageScale:1.02,
},

{
 id:"card4",
 x:780,
 y:280,
 width:1380,
 height:1390,
 rotation:18,
 imageOffsetX:30,
 imageOffsetY:20,
 imageScale:1.04,
},

],

  placement:{

    mode:"width",
    anchor:"center",

    width:400,

    transformOrigin:"center center",

  },

},

{
  id: "movie_scatter_actor",

  displayName:
    "Movie Strip Scatter — Actors",
  positionMode:"absolute",
  src:
    "/frames/singleframe.png",

  imageSource:
    "actors",

  maxAssets:
    4,

  renderMode:
    "perSlot",

  canvas:{
    width:1660,
    height:1645,
  },

  imageSlots:[

{
 id:"card1",
 x:80,
 y:520,
 width:1600,
 height:1200,
 rotation:-22,
 imageOffsetX:0,
 imageOffsetY:30,
 imageScale:1,
},

{
 id:"card2",
 x:280,
 y:330,
 width:1600,
 height:1200,
 rotation:12,
 imageOffsetX:0,
 imageOffsetY:32,
 imageScale:1,
},

{
 id:"card3",
 x:500,
 y:500,
 width:1600,
 height:1200,
 rotation:-8,
 imageOffsetX:0,
 imageOffsetY:25,
 imageScale:1,
},

{
 id:"card4",
 x:750,
 y:380,
 width:1600,
 height:1200,
 rotation:18,
 imageOffsetX:0,
 imageOffsetY:30,
 imageScale:1,
},

],

  placement:{

    mode:"contain",
    anchor:"center",

    width:200,

    transformOrigin:"center center",

  },

},

{
  id: "frame_offset_backdrop",

  displayName:
    "Offset Frame — Backdrops",
  positionMode:"absolute",
  src:
    "/frames/fiveoffset.png",

  imageSource:
    "backdrops",

  maxAssets:
    5,


  canvas:{
    width:610,
    height:656,
  },

  imageSlots:[

{
 id:"card1",
 x:170,
 y:340,
 width:250,
 height:180,
 rotation:-7,
 imageOffsetX:0,
 imageOffsetY:0,
 imageScale:1,
},

{
 id:"card2",
 x:470,
 y:270,
 width:290,
 height:200,
 rotation:8,
 imageOffsetX:0,
 imageOffsetY:32,
 imageScale:1,
},
{
 id:"card3",
 x:140,
 y:780,
 width:279,
 height:193,
 rotation:6,
 imageOffsetX:0,
 imageOffsetY:0,
 imageScale:1,
  
},
{
 id:"card4",
 x:355,
 y:520,
 width:290,
 height:205,
 rotation:-2,
 imageOffsetX:0,
 imageOffsetY:25,
 imageScale:1,
 
},



{
 id:"card5",
 x:470,
 y:750,
 width:285,
 height:205,
 rotation:-9,
 imageOffsetX:0,
 imageOffsetY:30,
 imageScale:1,
},

],

  placement:{

    mode:"contain",
    anchor:"center",
    transformOrigin:"center center",
    width:800,

  },

},

{
  id: "frame_offset_actor",

  displayName:
    "Offset Frame — Actors",
  positionMode:"absolute",
  src:
    "/frames/fiveoffset.png",

  imageSource:
    "actors",

  maxAssets:
    5,


  canvas:{
    width:610,
    height:656,
  },

  imageSlots:[

{
 id:"card1",
 x:170,
 y:340,
 width:250,
 height:180,
 rotation:-7,
 imageOffsetX:0,
 imageOffsetY:0,
 imageScale:1,
},

{
 id:"card2",
 x:470,
 y:270,
 width:290,
 height:200,
 rotation:8,
 imageOffsetX:0,
 imageOffsetY:32,
 imageScale:1,
},
{
 id:"card3",
 x:140,
 y:780,
 width:279,
 height:193,
 rotation:6,
 imageOffsetX:0,
 imageOffsetY:0,
 imageScale:1,
  
},
{
 id:"card4",
 x:355,
 y:520,
 width:290,
 height:205,
 rotation:-2,
 imageOffsetX:0,
 imageOffsetY:25,
 imageScale:1,
 
},



{
 id:"card5",
 x:470,
 y:750,
 width:285,
 height:205,
 rotation:-9,
 imageOffsetX:0,
 imageOffsetY:30,
 imageScale:1,
},

],

  placement:{

    mode:"contain",
    anchor:"center",
    transformOrigin:"center center",
    width:800,

  },

},

{
  id: "polaroid_fan_3_backdrop",

  displayName:
    "Polaroid Fan — Backdrops",
  renderMode:"perSlot",
  src:"/frames/polaroid-classic.png",
  imageSource:"backdrops",
  maxAssets: 3,
  canvas:{
    width:1600,
    height:2200,
  },
  imageSlots:[
{
 id:"card1",
 x: 1,
 y: 1,

 width:1400,
 height:1390,

 rotation:-10,
},


{
 id:"card2",

 x:140,
 y:140,

 width:1400,
 height:1390,

 rotation:0,
},


{
 id:"card3",

 x:310,
 y:170,

 width:1400,
 height:1390,

 rotation:20,
},

],


  placement:{

    mode:"width",
    anchor:"center",
    width:400,

    transformOrigin:"left bottom",

},
},

{id: "three_horiz_panel_backdrop",

  displayName:
    "Wooden Panel (3) — Backdrop",

  src:
    "/frames/wooden3.png",

  imageSource:
    "backdrops",

  maxAssets:
    3,

  canvas:{
    width:1918,
    height:645,
  },

  imageSlots:[
  {
    id:"backdrop1",
    x:110,
    y:107,
    width:437,
    height:437,
  },
  {
    id:"backdrop2",
    x:745,
    y:107,
    width:437,
    height:437,
  },
  {
    id:"backdrop3",
    x:1381,
    y:107,
    width:437,
    height:437,
  },
],

  placement:{
    mode:"contain",
    anchor:"top",
    width:1000,
  },
},

{id: "three_horiz_panel_actorsp",

  displayName:
    "Wooden Panel (3) — Actors",

  src:
    "/frames/wooden3.png",

  imageSource:
    "actors",

  maxAssets:
    3,

  canvas:{
    width:1918,
    height:645,
  },

  imageSlots:[
  {
    id:"backdrop1",
    x:110,
    y:107,
    width:437,
    height:437,
  },
  {
    id:"backdrop2",
    x:745,
    y:107,
    width:437,
    height:437,
  },
  {
    id:"backdrop3",
    x:1381,
    y:107,
    width:437,
    height:437,
  },
],

  placement:{
    mode:"width",
    anchor:"top",
    width:1000,
  },
},

{
  id: "movie_scatter_4_backdrops",

  displayName:
    "Movie Scatter — Backdrop",
  positionMode:"absolute",
  src:
    "/frames/singleframe.png",

  imageSource:
    "backdrops",

  maxAssets:
    4,

  renderMode:
    "perSlot",

  canvas:{
    width:1600,
    height:1645,
  },

  imageSlots:[

{
 id:"card1",
 x:50,
 y:560,
 width:1560,
 height:1190,
 rotation:-22,
 imageOffsetX:0,
 imageOffsetY:45,
 imageScale:1,
},

{
 id:"card2",
 x:230,
 y:260,
 width:1380,
 height:1390,
 rotation:12,
 imageOffsetX:30,
 imageOffsetY:30,
 imageScale:1.03,
},

{
 id:"card3",
 x:500,
 y:600,
 width:1500,
 height:1190,
 rotation:-8,
 imageOffsetX:5,
 imageOffsetY:40,
 imageScale:1.02,
},

{
 id:"card4",
 x:650,
 y:250,
 width:1500,
 height:1100,
 rotation:18,
 imageOffsetX:5,
 imageOffsetY:45,
 imageScale:1.04,
},

],

  placement:{

    mode:"width",
    anchor:"center",

    width:300,

    transformOrigin:"center center",

  },

},


{
  id: "polaroid_fan_3_actor",

  displayName:
    "Polaroid Fan — Actors",
  renderMode:"perSlot",
  src:"/frames/polaroid-classic.png",
  imageSource:"actors",
  positionMode:"relative",
  maxAssets: 3,
  canvas:{
    width:1600,
    height:2200,
  },
  imageSlots:[
{
 id:"card1",
 x:1,
 y:1,

 width:1400,
 height:1390,

 rotation:-10,
},


{
 id:"card2",

 x:140,
 y:140,

 width:1400,
 height:1390,

 rotation:0,
},


{
 id:"card3",

 x:310,
 y:180,

 width:1410,
 height:1390,

 rotation:20,
},

],


  placement:{

    mode:"width",
    anchor:"center",
    width:400,

    transformOrigin:"left bottom",

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