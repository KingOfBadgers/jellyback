import { FrameDefinition } from "../framestypes";

export const polaroidFan3Backdrop: FrameDefinition = {
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
};