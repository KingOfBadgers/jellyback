




/**
 * =========================================================
 * ACTOR POSITIONING
 * =========================================================
 */
import {  SPATIAL_CONFIG} from "@/stage3/engine/spatial/spacingUtils";


function computeActorPosition(
  layout:
    | "row"
    | "center-focus"
    | "w-overlap"
    | "grid"
    | "none",

  index: number,
  total: number
) {
  const baseBottom = SPATIAL_CONFIG.baseBottom;

  if (layout === "row") {
    const spacing = computeEvenSpacing(
      total,
      SPATIAL_CONFIG.actorWidth,
      SPATIAL_CONFIG.canvasWidth,
      SPATIAL_CONFIG.outerMargin
    );

    const x =
      SPATIAL_CONFIG.outerMargin +
      index * (SPATIAL_CONFIG.actorWidth + spacing);

    return {
      position: "absolute" as const,
      bottom: `${baseBottom}px`,
      left: `${x}px`,
      transform: "translateX(0)",
      zIndex: 10 + index,
    };
  }

  if (layout === "center-focus") {
  const baseBottom = SPATIAL_CONFIG.baseBottom;

  const mid = Math.floor(total / 2);
  const isCenter = index === mid;

  // How far each actor sits from center
  const offsetIndex = index - mid;

  // tighter grouping than row (cinematic compression)
  const spacing = 90;

  const x =
    SPATIAL_CONFIG.outerMargin +
    mid * (SPATIAL_CONFIG.actorWidth + spacing) +
    offsetIndex * (SPATIAL_CONFIG.actorWidth + spacing);

  /**
   * HERO (center actor)
   */
  if (isCenter) {
    return {
      position: "absolute" as const,
      bottom: `${baseBottom}px`,
      left: `${x}px`,
      transform: "translateX(0) scale(1.18)",
      zIndex: 30,
    };
  }

  /**
   * LEFT SIDE SUPPORT
   */
  if (offsetIndex < 0) {
    const depth = Math.abs(offsetIndex);

    return {
      position: "absolute" as const,
      bottom: `${baseBottom + depth * 6}px`,
      left: `${x}px`,
      transform: `translateX(0) scale(${1 - depth * 0.08}) rotate(${
        depth * -1.5
      }deg)`,
      zIndex: 20 - depth,
    };
  }

  /**
   * RIGHT SIDE SUPPORT
   */
  const depth = Math.abs(offsetIndex);

  return {
    position: "absolute" as const,
    bottom: `${baseBottom + depth * 6}px`,
    left: `${x}px`,
    transform: `translateX(0) scale(${1 - depth * 0.08}) rotate(${
      depth * 1.5
    }deg)`,
    zIndex: 20 - depth,
  };
}

 if (layout === "w-overlap") {
  /**
   * =========================================================
   * CHANGE: 2026-06-27
   * REASON:
   * Previous W composition shifted entire group right.
   * Rebuilt using centered deterministic canvas fit.
   * =========================================================
   */

  const canvasWidth = 1000;
  const actorWidth = 140;
  const spacing = 55;
  const baseBottom = 160;

  const totalWidth =
    total * actorWidth +
    (total - 1) * spacing;

  const startX =
    (canvasWidth - totalWidth) / 2;

  const x =
    startX +
    index * (actorWidth + spacing);

  /**
   * Composition structure:
   *
   * 1 = outer left
   * 2 = inner left
   * 3 = hero center
   * 4 = inner right
   * 5 = outer right
   */

  if (index === 2) {
  return {
    position: "absolute" as const,
    bottom: `${baseBottom - 30}px`,
    left: `${x}px`,
    transform: "scale(1.22)",
    zIndex: 50,
  };
}

if (index === 1 || index === 3) {
  const rotate = index === 1 ? -4 : 4;

  return {
    position: "absolute" as const,
    bottom: `${baseBottom + 20}px`,
    left: `${x}px`,
    transform: `scale(0.96) rotate(${rotate}deg)`,
    zIndex: 35,
  };


}

const rotate = index === 0 ? -7 : 7;

return {
  position: "absolute" as const,
  bottom: `${baseBottom + 55}px`,
  left: `${x}px`,
  transform: `scale(0.82) rotate(${rotate}deg)`,
  zIndex: 20,
};

}

  if (layout === "grid") {
    const cols = Math.min(total, 3);
    const col = index % cols;
    const row = Math.floor(index / cols);

    return {
      position: "absolute" as const,
      bottom: `${baseBottom + row * 220}px`,
      left: `calc(50% + ${(col - 1) * 140}px)`,
      transform: "translateX(-50%)",
      zIndex: 10 + index,
    };
  }

  return {
    position: "absolute" as const,
    bottom: "0px",
    left: "0px",
    opacity: 0,
    zIndex: -1,
  };
}
