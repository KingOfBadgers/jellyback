"use client";

/**
 * =========================================================
 * ACTOR PRESENTATION ENGINE
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Determines physical visual appearance.
 *
 * NOT position.
 *
 * Position = composition engine
 * Presentation = shape engine
 * =========================================================
 */

export function resolveActorPresentation(
  layout: string,
  index: number,
  total: number
) {
  /**
   * CINEMATIC HERO
   */

  if (layout === "center-focus") {
    const mid = Math.floor(total / 2);

    if (index === mid) {
      return {
        shape: "hero-cutout",
        width: "260px",
        height: "420px",
      };
    }

    return {
      shape: "soft-frame",
      width: "170px",
      height: "240px",
    };
  }

  /**
   * W COMPOSITION
   */

  if (layout === "w-overlap") {
    if (index === 2) {
      return {
        shape: "hero-cutout",
        width: "280px",
        height: "420px",
      };
    }

    return {
      shape: "angled-card",
      width: "180px",
      height: "260px",
    };
  }

  /**
   * GRID COLLAGE STYLE
   */

  if (layout === "grid") {
    return {
      shape: "polaroid",
      width: "220px",
      height: "220px",
    };
  }

  /**
   * DEFAULT
   */

  return {
    shape: "soft-frame",
    width: "160px",
    height: "220px",
  };
}