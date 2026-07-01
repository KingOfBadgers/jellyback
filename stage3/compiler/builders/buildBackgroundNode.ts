"use client";

export function buildBackgroundNode(
  backdrop: string | null
) {
  if (!backdrop) return null;

  return {
    id: "background",

    layer: "background",

    src: backdrop,

    visible: true,

    style: {
      position: "absolute" as const,

      top: "0px",

      left: "0px",

      width: "1000px",

      height: "1350px",

      opacity: 1,

      zIndex: 0,
    },

    treatments: [],
  };
}