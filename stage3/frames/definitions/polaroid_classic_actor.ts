import { FrameDefinition } from "../framestypes";

export const polaroidClassicActor: FrameDefinition = {
  id: "polaroid_classic_actor",
  displayName: "Polaroid Classic — Actor",
  src: "/frames/polaroid-classic.png",
  imageSource: "actors",
  maxAssets: 1,
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
  placement: {
    mode: "width",
    anchor: "center",
    width: 400,
    rotation: 10,
    positionMode: "absolute",
    transformOrigin: "center center",
  },
};