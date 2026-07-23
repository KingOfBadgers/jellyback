import { FrameDefinition } from "../framestypes";

export const polaroidClassicBackdrop: FrameDefinition = {
  id: "polaroid_classic_backdrop",
  displayName: "Polaroid Classic — Backdrop",
  src: "/frames/polaroid-classic.png",
  imageSource: "backdrops",
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
    transformOrigin: "center center",
  },
};
