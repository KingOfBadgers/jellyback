/**
 * =========================================================
 * JELLYBACK STAGE 3
 * HERO TRIPTYCH LAYOUT
 * =========================================================
 *
 * PURPOSE
 * -------
 * Defines a three-column hero composition.
 *
 * DESIGN GOAL
 * -----------
 * Unlike FIVE_STRIP, this layout intentionally creates
 * hierarchy.
 *
 * Centre actor receives a larger slot.
 *
 * Left and right actors act as supporting imagery.
 *
 * IMPORTANT
 * ---------
 * This file contains GEOMETRY ONLY.
 *
 * It does NOT:
 * - choose actors
 * - choose backdrops
 * - render images
 * - apply styling
 * - apply treatments
 *
 * It ONLY defines where assets may be placed.
 *
 * FUTURE
 * ------
 * Additional layouts should follow the same contract:
 *
 * - buildFiveStrip
 * - buildHeroTriptych
 * - buildContactSheet
 * - buildCornerCluster
 *
 * =========================================================
 * CHANGE LOG
 * =========================================================
 *
 * 2026-06-09 15:45 BST
 *
 * Reason:
 * Introduce second reusable Stage 3 layout.
 *
 * Purpose:
 * Validate architecture can support multiple
 * interchangeable layout generators.
 *
 * Impact:
 * No rendering logic changes.
 * No asset selection changes.
 * Geometry only.
 *
 * Author:
 * ChatGPT
 *
 * =========================================================
 */

import type {
  CompositionLayout,
  LayoutSlot,
} from "./types";

export function buildHeroTriptych(): CompositionLayout {
  /**
   * =====================================================
   * CANVAS REFERENCE
   * =====================================================
   *
   * Matches current Stage 3 art zone.
   */
  const canvasWidth = 1000;
  const canvasHeight = 1400;

  /**
   * =====================================================
   * HERO SLOT
   * =====================================================
   *
   * Large centre placement.
   */
  const heroWidth = 280;
  const heroHeight = 420;

  /**
   * =====================================================
   * SIDE SLOTS
   * =====================================================
   *
   * Supporting actor imagery.
   */
  const sideWidth = 180;
  const sideHeight = 280;

  const centreX =
    Math.floor(
      (canvasWidth - heroWidth) / 2
    );

  const heroY = 60;

  const leftX = 120;
  const rightX =
    canvasWidth -
    sideWidth -
    120;

  const sideY = 150;

  const slots: LayoutSlot[] = [
    {
      id: "left-support",

      x: leftX,
      y: sideY,

      width: sideWidth,
      height: sideHeight,
    },

    {
      id: "hero",

      x: centreX,
      y: heroY,

      width: heroWidth,
      height: heroHeight,
    },

    {
      id: "right-support",

      x: rightX,
      y: sideY,

      width: sideWidth,
      height: sideHeight,
    },
  ];

  console.log(
    "[STAGE3][LAYOUT][HERO_TRIPTYCH]",
    {
      slotCount: slots.length,
      canvasWidth,
      canvasHeight,
    }
  );

  return {
    id: "HERO_TRIPTYCH",
    name: "Hero Triptych",
    slots,
  };
}