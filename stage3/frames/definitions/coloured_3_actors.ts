import { FrameDefinition } from "../framestypes";

export const coloured3Actors: FrameDefinition = {
  id: "coloured_3_actors",
  displayName: "Coloured Frame — Actors",
  positionMode: "absolute",
  src: "/frames/threeframe.png",
  imageSource: "actors",
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
      width: 1100,
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
      height: 2100,
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
