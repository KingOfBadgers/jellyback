import { FrameDefinition } from "../framestypes";

export const movieScatter4Backdrops: FrameDefinition = {
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

};
