import { FrameDefinition } from "../framestypes";

export const paperripActor: FrameDefinition = {
  id: "paperrip_actor",
  displayName: "Paper Rip — Actor",
  src: "/frames/paperrip.png",
  imageSource: "actors",
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
