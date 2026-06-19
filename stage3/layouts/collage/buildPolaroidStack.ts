import type { CompositionLayout } from "@/stage3/layouts/types";
import { assertLayout } from "@/stage3/layouts/utils/assertLayout";

export function buildPolaroidStack(): CompositionLayout {
  console.log(
    "[STAGE3][COLLAGE_LAYOUT][POLAROID_STACK] BUILD START"
  );

  const canvasWidth = 1000;
  const canvasHeight = 1400;

  const baseWidth = 520;
  const baseHeight = 380;

  const centerX = (canvasWidth - baseWidth) / 2;
  const centerY = (canvasHeight - baseHeight) / 2;

  const slots = [];

  for (let i = 0; i < 3; i++) {
    const offset = i * 35;

    slots.push({
      id: `polaroid-${i}`,
      x: centerX + offset,
      y: centerY + offset,
      width: baseWidth,
      height: baseHeight,
    });
  }

  const layout: CompositionLayout = {
    id: "POLAROID_STACK",
    name: "Polaroid Stack",
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