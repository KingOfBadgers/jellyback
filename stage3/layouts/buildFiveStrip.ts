/**
 * =========================================================
 * JELLYBACK STAGE 3
 * FIVE STRIP LAYOUT
 * =========================================================
 *
 * PURPOSE
 * -------
 * Defines a reusable slot-based composition layout.
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
 *
 * It ONLY defines where assets may be placed.
 *
 * CHANGE LOG
 * ----------
 * 2026-06-08 14:00 BST
 *
 * Reason:
 * First reusable layout definition for Stage 3.
 *
 * Impact:
 * Establishes slot-based composition architecture.
 *
 * Author:
 * ChatGPT
 * =========================================================
 */

export interface LayoutSlot {
  id: string;

  x: number;
  y: number;

  width: number;
  height: number;
}

export interface CompositionLayout {
  id: string;
  name: string;

  slots: LayoutSlot[];
}

export function buildFiveStrip(): CompositionLayout {
  const canvasWidth = 1000;
  const canvasHeight = 1400;

  const slotWidth = 180;
  const slotHeight = 320;

  const gap = 20;

  const totalWidth =
    slotWidth * 5 +
    gap * 4;

  const startX =
    Math.floor(
      (canvasWidth - totalWidth) / 2
    );

  const startY = 80;

  const slots: LayoutSlot[] = [];

  for (let i = 0; i < 5; i++) {
    slots.push({
      id: `slot-${i + 1}`,

      x:
        startX +
        i * (slotWidth + gap),

      y: startY,

      width: slotWidth,
      height: slotHeight,
    });
  }

  console.log(
    "[STAGE3][LAYOUT][FIVE_STRIP]",
    {
      slotCount: slots.length,
      canvasWidth,
      canvasHeight,
    }
  );

  return {
    id: "FIVE_STRIP",
    name: "Five Strip",
    slots,
  };
}