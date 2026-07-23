import { FrameDefinition } from "../framestypes";

export const paperripBackdrop: FrameDefinition = {
  id: "paperrip_backdrop",
  displayName: "Paper Rip — Backdrop",
  src: "/frames/paperrip.png",
  imageSource: "backdrops",
  maxAssets: 1,
  canvas: {
    width: 4096,
    height: 4081,
  },
  imageSlots: [
    {
      id: "image1",
      x: 868,
      y: 708,
      width: 2320,
      height: 2674,
    },
  ],
  placement: {
    mode: "width",
    anchor: "center",
    width: 800,
    rotation: 10,
    transformOrigin: "center center",
  },
};
