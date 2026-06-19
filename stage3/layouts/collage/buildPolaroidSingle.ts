import type { CompositionLayout } from "@/stage3/layouts/types";
import { assertLayout } from "@/stage3/layouts/utils/assertLayout";

export function buildPolaroidSingle(): CompositionLayout {
  console.log(
    "[STAGE3][COLLAGE_LAYOUT][POLAROID_SINGLE] BUILD START"
  );

  const layout: CompositionLayout = {
    id: "POLAROID_SINGLE",
    name: "Polaroid Single",
    slots: [
      {
        id: "base-1",
        x: 280,
        y: 660,
        width: 420,
        height: 580,
        frameSrc: "/frames/polaroid-classic.png",
        imageInset: {
          top: 30,
          left: 30,
          right: 30,
          bottom: 160,
        },
        rotation: -8,
        zIndex: 1,
      },
      {
        id: "top",
        x: 320,
        y: 620,
        width: 420,
        height: 580,
        frameSrc: "/frames/polaroid-classic.png",
        imageInset: {
          top: 30,
          left: 30,
          right: 30,
          bottom: 160,
        },
        rotation: 4,
        zIndex: 2,
      },
    ],
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