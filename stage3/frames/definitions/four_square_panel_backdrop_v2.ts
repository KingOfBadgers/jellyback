import { FrameDefinition } from "../framestypes";

export const fourSquarePanelBackdropV2: FrameDefinition = {
  id:"four_square_panel_backdrop_v2",
  displayName:    "Four Square Panel — Backdrops (2)",
  src:    "/frames/foursquare.png",
  imageSource:    "backdrops",
  maxAssets:    4,
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
    slotFrameScale: 1,
  },
  {
    id:"actor2",
    x:1148,
    y:114,
    width:631,
    height:642,
    slotFrameScale: 1,
  },
  {
    id:"actor3",
    x:129,
    y:1090,
    width:631,
    height:642,
    slotFrameScale: 1,
  },
  {
    id:"actor4",
    x:1180,
    y:1088,
    width:631,
    height:642,
    slotFrameScale: 1,
  },
  ],

  placement:{
    mode:"width",
    anchor:"center",
    width:600,
  },
};