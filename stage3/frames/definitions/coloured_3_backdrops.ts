import { FrameDefinition } from "../framestypes";

export const coloured3Backdrops: FrameDefinition = {
  id: "coloured_3_backdrops",
  displayName: "Coloured Frame — Backdrop",
  positionMode: "absolute",
  src: "/frames/threeframe.png",
  imageSource: "backdrops",
  maxAssets: 3,
  canvas: {
    width: 3206,
    height: 2494,
  },
  imageSlots: [
    {
      id: "card1",
      x: 195,
      y: 454,
      width: 1210,
      height: 1063,
      imageOffsetX: 0,
      imageOffsetY: 0,
      imageScale: 1,
    },
    {
      id: "card2",
      x: 195,
      y: 754,
      width: 1000,
      height: 756,
      imageOffsetX: 0,
      imageOffsetY: 0,
      imageScale: 1,
    },
    {
      id: "card3",
      x: 495,
      y: 454,
      width: 1355,
      height: 2130,
      imageOffsetX: 0,
      imageOffsetY: 0,
      imageScale: 1,
    },
  ],
  placement: {
    mode: "width",
    anchor: "center",
    width: 700,
    transformOrigin: "center center",
  },
};
