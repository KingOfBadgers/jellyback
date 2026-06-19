/**
 * =========================================================
 * JELLYBACK STAGE 3
 * LAYOUT VALIDATION GUARD (RUNTIME SAFETY LAYER)
 * =========================================================
 *
 * PURPOSE
 * -------
 * Ensures all CompositionLayout objects are valid
 * BEFORE they reach renderer.
 *
 * This prevents:
 * - undefined slots crash
 * - partial layout injection
 * - silent generator failure
 *
 * =========================================================
 */

import type { CompositionLayout } from "../types";

export function assertLayout(layout: any, source?: string): asserts layout is CompositionLayout {
  console.log("[STAGE3][LAYOUT][ASSERT]", {
    source: source ?? "unknown",
    hasLayout: !!layout,
  });

  if (!layout) {
    console.error("[STAGE3][LAYOUT][INVALID] layout is undefined", {
      source,
    });
    throw new Error("Invalid layout: undefined");
  }

  if (!Array.isArray(layout.slots)) {
    console.error("[STAGE3][LAYOUT][INVALID] slots is not an array", {
      source,
      layout,
    });
    throw new Error("Invalid layout: slots missing or not array");
  }

  if (layout.slots.length === 0) {
    console.error("[STAGE3][LAYOUT][INVALID] empty slots array", {
      source,
      layout,
    });
    throw new Error("Invalid layout: no slots defined");
  }

  for (const slot of layout.slots) {
    if (
      typeof slot.x !== "number" ||
      typeof slot.y !== "number" ||
      typeof slot.width !== "number" ||
      typeof slot.height !== "number"
    ) {
      console.error("[STAGE3][LAYOUT][INVALID SLOT]", {
        source,
        slot,
      });

      throw new Error("Invalid layout: slot geometry missing");
    }
  }

  console.log("[STAGE3][LAYOUT][ASSERT] OK", {
    source,
    slotCount: layout.slots.length,
  });
}