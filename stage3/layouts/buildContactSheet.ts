/**
 * =========================================================
 * JELLYBACK STAGE 3
 * CONTACT SHEET LAYOUT
 * =========================================================
 *
 * PURPOSE
 * -------
 * Defines a premium 6-slot actor grid.
 *
 * DESIGN GOAL
 * -----------
 * Balanced cast presentation.
 *
 * Layout:
 *
 * [ 1 ] [ 2 ] [ 3 ]
 * [ 4 ] [ 5 ] [ 6 ]
 *
 * Unlike:
 *
 * FIVE_STRIP
 * - horizontal lineup
 *
 * HERO_TRIPTYCH
 * - hierarchy focused
 *
 * CONTACT_SHEET
 * - ensemble focused
 *
 * IMPORTANT
 * ---------
 * Geometry only.
 *
 * No rendering.
 * No styling.
 * No actor selection.
 *
 * =========================================================
 * CHANGE LOG
 * =========================================================
 *
 * 2026-06-10 18:00 BST
 *
 * Reason:
 * Introduce premium 6-slot actor grid.
 *
 * Impact:
 * New actor composition option.
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

export function buildContactSheet(): CompositionLayout {
  const canvasWidth = 1000;
  const canvasHeight = 1400;

  const columns = 3;
  const rows = 2;

  const slotWidth = 220;
  const slotHeight = 300;

  const columnGap = 30;
  const rowGap = 30;

  const totalWidth =
    columns * slotWidth +
    (columns - 1) * columnGap;

  const startX = Math.floor(
    (canvasWidth - totalWidth) / 2
  );

  const startY = 60;

  const slots: LayoutSlot[] = [];

  let index = 1;

  for (let row = 0; row < rows; row++) {
    for (
      let column = 0;
      column < columns;
      column++
    ) {
      slots.push({
        id: `slot-${index}`,

        x:
          startX +
          column *
            (slotWidth + columnGap),

        y:
          startY +
          row *
            (slotHeight + rowGap),

        width: slotWidth,
        height: slotHeight,
      });

      index++;
    }
  }

  console.log(
    "[STAGE3][LAYOUT][CONTACT_SHEET]",
    {
      slotCount: slots.length,
      canvasWidth,
      canvasHeight,
    }
  );

  return {
    id: "CONTACT_SHEET",
    name: "Contact Sheet",
    slots,
  };
}