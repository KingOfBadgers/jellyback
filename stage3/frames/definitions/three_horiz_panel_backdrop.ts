import { FrameDefinition } from "../framestypes";

export const threeHorizPanelBackdrop: FrameDefinition = {
  id: "three_horiz_panel_backdrop",

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
};
