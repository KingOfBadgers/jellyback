"use client";

import type { CompositionLayout } from "@/stage3/layouts/types";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — LAYOUT POSITION RESOLVER
 * =========================================================
 *
 * PURPOSE:
 * Applies vertical placement rules to a frozen layout.
 *
 * IMPORTANT:
 * - Does NOT modify slot geometry
 * - Does NOT scale
 * - Does NOT reorder slots
 * - ONLY shifts Y position globally
 */

export function resolveLayoutPosition(
  layout: CompositionLayout,
  canvasHeight: number
): CompositionLayout {
  const preset = layout.preset ?? "TOP";

  const baseY =
    preset === "TOP"
      ? 0
      : preset === "CENTER"
      ? canvasHeight / 2
      : preset === "BOTTOM"
      ? canvasHeight
      : 0;

  const offsetY = layout.offsetY ?? 0;

  const resolvedSlots = layout.slots.map((slot) => {
    return {
      ...slot,
      y: slot.y + baseY + offsetY,
    };
  });

  console.log("[STAGE3][LAYOUT_RESOLVER]", {
    layoutId: layout.id,
    preset,
    baseY,
    offsetY,
    slotCount: layout.slots.length,
  });

  return {
    ...layout,
    slots: resolvedSlots,
  };
}