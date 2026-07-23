import { FrameDefinition } from "../framestypes";

export const fourSquarePanelActor: FrameDefinition = {
  id:"four_square_panel_actor",
  displayName:    "Four Square Panel — Actors",
  src:    "/frames/four_square.png",
  imageSource:    "actors",
  maxAssets:    4,
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
};