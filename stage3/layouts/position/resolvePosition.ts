"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — POSITION RESOLVER (CANONICAL)
 * =========================================================
 *
 * DATE: 2026-06-18 BST
 *
 * PURPOSE:
 * Applies unified positioning rules across ALL layout types:
 * - actors
 * - collage
 * - backdrop treatments (future)
 *
 * RULE:
 * This is the ONLY place position is applied.
 */

import type { CompositionLayout } from "@/stage3/layouts/types";

const log = (msg: string, data?: any) =>
  console.log(`[STAGE3][POSITION_RESOLVER] ${msg}`, data ?? {});

export function resolvePosition(
  layout: CompositionLayout,
  canvasHeight: number
): CompositionLayout {
  const preset = layout.position?.preset ?? "TOP";
  const offsetY = layout.position?.offsetY ?? 0;

  const baseY =
    preset === "TOP"
      ? 0
      : preset === "CENTER"
      ? canvasHeight / 2
      : canvasHeight;

  log("APPLY", {
    layoutId: layout.id,
    preset,
    offsetY,
    baseY,
  });

  return {
    ...layout,
    slots: layout.slots.map((slot) => ({
      ...slot,
      y: slot.y + baseY + offsetY,
    })),
  };
}