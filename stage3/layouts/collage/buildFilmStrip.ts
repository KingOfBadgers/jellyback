 /**
  * 
 *
 * COLLAGE LAYOUT BUILDER (SAFE PATTERN)
 * =========================================================
 *
 * RULES:
 * - Geometry only
 * - No rendering logic
 * - No store access
 * - No asset selection
 * - Must pass runtime validation before return
 */

import type { CompositionLayout } from "@/stage3/layouts/types"
import { assertLayout } from "@/stage3/layouts/utils/assertLayout";

/**
 * =========================================================
 * BUILD LAYOUT
 * =========================================================
*/
export function buildFilmStrip(): CompositionLayout {
  console.log(
    "[STAGE3][COLLAGE_LAYOUT][FILM_STRIP] BUILD START"
  );

  const canvasWidth = 1000;
  const canvasHeight = 1400;

  const slotWidth = 700;
  const slotHeight = 350;

  const gap = 40;

  const totalHeight = slotHeight * 3 + gap * 2;

  const startY = Math.floor(
    (canvasHeight - totalHeight) / 2
  );

  const startX = Math.floor(
    (canvasWidth - slotWidth) / 2
  );

  const slots = [];

  for (let i = 0; i < 3; i++) {
    slots.push({
      id: `film-strip-${i}`,
      x: startX,
      y: startY + i * (slotHeight + gap),
      width: slotWidth,
      height: slotHeight,
    });
  }



/** 
  * =====================================================
   * 3. BUILD FINAL LAYOUT OBJECT
   * =====================================================
   */

  const layout: CompositionLayout = {
    id: "FILM_STRIP",
    name: "Film Strip",
    slots,
  };

  /** 
   * =====================================================
   * 4. RUNTIME SAFETY GUARD (CRITICAL)
   * =====================================================
   * Reason: prevents renderer crash from undefined slots
   * Date: 2026-06-18 BST
  */

assertLayout(layout, "buildYourLayoutName");

 
 /**
   * =====================================================
   * 5. RETURN CANONICAL LAYOUT
   * =====================================================
   */
  
 console.log("[STAGE3][COLLAGE_LAYOUT][YOUR_LAYOUT] BUILT", {
    slotCount: slots.length,
  });

  return layout;
}
