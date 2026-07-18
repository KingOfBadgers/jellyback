import {
  computeEvenSpacing,
  SPATIAL_CONFIG,
} from "./spacingUtils";

export function resolveCollagePosition(
  layout: string,
  index: number,
  total: number
) {
  if (layout === "vertical-left") {
    const cardHeight = 210;
    const gap = 35;
    const leftMargin = 45;

    return {
      position: "absolute" as const,

      top: `${140 + index * (cardHeight + gap)}px`,

      left: `${leftMargin}px`,

      transform: `rotate(${
        index % 2 === 0 ? -2 : 2
      }deg)`,

      zIndex: 10 + index,
    };
  }

  if (layout === "vertical-right") {
    const cardHeight = 210;
    const gap = 35;
    const rightMargin = 775;

    return {
      position: "absolute" as const,

      top: `${140 + index * (cardHeight + gap)}px`,

      left: `${rightMargin}px`,

      transform: `rotate(${
        index % 2 === 0 ? 2 : -2
      }deg)`,

      zIndex: 10 + index,
    };
  }

if (layout === "hero-stack") {

  const smallWidth = 320;
  const smallHeight = 180;

  const heroWidth = 600;
  const heroHeight = 338;


  const slots = [
    {
      top: "100px",
      left: "40px",
      width: smallWidth,
      height: smallHeight,
      rotation: -2,
      zIndex: 12,
    },

    {
      top: "300px",
      left: "40px",
      width: heroWidth,
      height: heroHeight,
      rotation: 0,
      zIndex: 10,
    },

    {
      top: "560px",
      left: "640px",
      width: smallWidth,
      height: smallHeight,
      rotation: 2,
      zIndex: 13,
    },
  ];


  const slot = slots[index];

  if (!slot) {
    return null;
  }


  return {
    position: "absolute" as const,

    top: `${slot.top}`,

    left: `${slot.left}`,

    width: `${slot.width}px`,

    height: `${slot.height}px`,

    transform: `rotate(${slot.rotation}deg)`,

    zIndex: slot.zIndex,
  };
}


  


  if (layout === "grid") {
    const cols = 2;

    const cardWidth = 300;
    const cardHeight = 210;

    const gapX = 35;
    const gapY = 35;

    const totalWidth =
      cols * cardWidth + gapX;

    const startX =
      (SPATIAL_CONFIG.canvasWidth - totalWidth) / 2;

    const row = Math.floor(index / 2);
    const col = index % 2;

    const rotations = [-2, 1.5, 2, -1];
    const depth = [12, 11, 14, 13];

    const rotation =
      rotations[index] ?? 0;

    const zIndex =
      depth[index] ?? 10;

    return {
      position: "absolute" as const,

      top: `${140 + row * (cardHeight + gapY)}px`,

      left: `${
        col * (cardWidth + gapX)
      }px`,

      transform: `rotate(${rotation}deg)`,

      zIndex,
    };
  }

  const spacing = computeEvenSpacing(
    total,
    SPATIAL_CONFIG.collageWidth,
    SPATIAL_CONFIG.canvasWidth,
    SPATIAL_CONFIG.outerMargin
  );

  const x =
    SPATIAL_CONFIG.outerMargin +
    index *
      (SPATIAL_CONFIG.collageWidth + spacing);

  return {
    position: "absolute" as const,

    top: `${SPATIAL_CONFIG.baseTop}px`,

    left: `${x}px`,

    transform: "translateX(0)",

    zIndex: 2 + index,
  };
}