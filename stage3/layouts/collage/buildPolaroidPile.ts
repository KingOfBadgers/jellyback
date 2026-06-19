import type { CompositionLayout } from "@/stage3/layouts/types";
import { assertLayout } from "@/stage3/layouts/utils/assertLayout";

export function buildPolaroidPile(): CompositionLayout {
  console.log("[STAGE3][COLLAGE_LAYOUT][POLAROID_PILE] BUILD START");

  const slots = [
      {
        id: "back-left",
        x: 220,
        y: 560,
        width: 420,
        height: 580,
        frameSrc: "/frames/polaroid-classic.png",
        imageInset: {
          top: 30,
          left: 30,
          right: 30,
          bottom: 160,
        },

        rotation: -14,
        zIndex: 1,
      },
      {
        id: "back-right",
        x: 420,
        y: 600,
        width: 420,
        height: 580,
        frameSrc: "/frames/polaroid-classic.png",
        imageInset: {
          top: 30,
          left: 30,
          right: 30,
          bottom: 160,
        },

        rotation: 12,
        zIndex: 2,
      },
      {
        id: "front",
        x: 380,
        y: 520,
        width: 420,
        height: 580,
        frameSrc: "/frames/polaroid-classic.png",
        imageInset: {
          top: 30,
          left: 30,
          right: 30,
          bottom: 160,
        },

        rotation: -2,
        zIndex: 3,
      },
    ];

  /**
   * =====================================================
   * 3. BUILD FINAL LAYOUT OBJECT
   * =====================================================
   */
  const layout: CompositionLayout = {
    id: "POLAROID_PILE",
    name: "Your Layout Name",
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