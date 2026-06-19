/**
 * =========================================================
 * JELLYBACK STAGE 3
 * COLLAGE LAYOUT BUILDER (SAFE PATTERN)
 * FILM STRIP — CANONICAL LOCKED LAYOUT
 * =========================================================
 *
 * PURPOSE
 * -------
 * Defines canonical film strip frame layout.
 *
 * RULES
 * -----
 * - Geometry only
 * - No rendering logic
 * - No store access
 * - No asset selection
 * - Must pass runtime validation before return
 *
 * =========================================================
 * CHANGE LOG
 * =========================================================
 *
 * 2026-06-18 BST
 *
 * Reason:
 * Added runtime layout validation guard.
 *
 * Impact:
 * Prevent renderer crashes caused by malformed
 * or undefined slot arrays reaching Stage 3 renderer.
 *
 * Author:
 * ChatGPT
 *
 * =========================================================
 */

import type { CompositionLayout } from "@/stage3/layouts/types";
import { assertLayout } from "@/stage3/layouts/utils/assertLayout";

/**
 * =========================================================
 * FILM STRIP FRAME LAYOUT BUILDER
 * =========================================================
 */
export function buildFilmStripFrame(): CompositionLayout {
  console.log(
    "[STAGE3][COLLAGE_LAYOUT][FILM_STRIP_FRAME] BUILD START"
  );

  /**
   * =====================================================
   * SLOT DEFINITIONS
   * =====================================================
   *
   * Canonical frame coordinates.
   *
   * IMPORTANT
   * ---------
   * These coordinates match frame asset exactly.
   */
  const slots = [
    {
      id: "film-0",
      x: 20,
      y: 24,
      width: 180,
      height: 140,
      frameSrc: "/frames/film-strip-5.png",
      imageInset: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },

    {
      id: "film-1",
      x: 210,
      y: 24,
      width: 180,
      height: 140,
      frameSrc: "/frames/film-strip-5.png",
      imageInset: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },

    {
      id: "film-2",
      x: 400,
      y: 24,
      width: 180,
      height: 140,
      frameSrc: "/frames/film-strip-5.png",
      imageInset: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },

    {
      id: "film-3",
      x: 590,
      y: 24,
      width: 180,
      height: 140,
      frameSrc: "/frames/film-strip-5.png",
      imageInset: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },

    {
      id: "film-4",
      x: 780,
      y: 24,
      width: 180,
      height: 140,
      frameSrc: "/frames/film-strip-5.png",
      imageInset: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },
  ];

  /**
   * =====================================================
   * BUILD LAYOUT OBJECT
   * =====================================================
   */
  const layout: CompositionLayout = {
    id: "FILM_STRIP_FRAME",
    name: "Film Strip Frame",
    slots,
  };

  /**
   * =====================================================
   * RUNTIME SAFETY GUARD
   * =====================================================
   *
   * CHANGE ADDED
   * ------------
   * Date: 2026-06-18 BST
   *
   * Reason:
   * Prevent undefined or malformed layouts from
   * crashing downstream renderer systems.
   */
  assertLayout(
    layout,
    "buildFilmStripFrame"
  );

  /**
   * =====================================================
   * BUILD COMPLETE
   * =====================================================
   */
  console.log(
    "[STAGE3][COLLAGE_LAYOUT][FILM_STRIP_FRAME] BUILT",
    {
      slotCount: slots.length,
    }
  );

  return layout;
}