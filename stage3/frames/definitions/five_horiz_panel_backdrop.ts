import { FrameDefinition } from "../framestypes";

export const fiveHorizPanelBackdrop: FrameDefinition = {
  id:"five_horiz_panel_backdrop",
  displayName:     "Five Horizontal Panel — Backdrop",
  src:     "/frames/film-strip-5.png",
  imageSource:     "backdrops",
  maxAssets:    5,
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
};