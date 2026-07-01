import { SPATIAL_CONFIG } from "./spacingUtils";

export function resolveBannerPosition(
  index: number
) {
  const baseTop = 80;
  const spacing = 90;

  return {
    position: "absolute" as const,

    top: `${baseTop + index * spacing}px`,

    left: "0px",

    width: `${SPATIAL_CONFIG.canvasWidth}px`,

    height: "60px",

    zIndex: 50 + index,
  };
}