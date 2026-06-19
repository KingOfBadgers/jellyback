import type { CompositionLayout } from "@/stage3/layouts/types";
import { assertLayout } from "@/stage3/layouts/utils/assertLayout";

export function buildEdgeStack(): CompositionLayout {
  console.log(
    "[STAGE3][COLLAGE_LAYOUT][EDGE_STACK] BUILD START"
  );

  const canvasWidth = 1000;
  const canvasHeight = 1400;

  const slotWidth = 600;
  const slotHeight = 320;

  const slots = [
    {
      id: "edge-0",
      x: -120,
      y: 120,
      width: slotWidth,
      height: slotHeight,
    },
    {
      id: "edge-1",
      x: 520,
      y: 320,
      width: slotWidth,
      height: slotHeight,
    },
    {
      id: "edge-2",
      x: -80,
      y: 620,
      width: slotWidth,
      height: slotHeight,
    },
  ];

  const layout: CompositionLayout = {
    id: "EDGE_STACK",
    name: "Edge Stack",
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