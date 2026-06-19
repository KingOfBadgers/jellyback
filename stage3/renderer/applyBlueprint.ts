/**
 * =========================================================
 * JELLYBACK STAGE 3 — RENDERER BINDING LAYER
 * =========================================================
 *
 * PURPOSE
 * -------
 * Applies a LayoutBlueprint directly to a DOM element.
 *
 * RULES
 * -----
 * - NO logic
 * - NO branching decisions
 * - NO layout inference
 * - ONLY deterministic CSS application
 *
 * This is a "compiler output executor"
 * =========================================================
 */

import type { LayoutBlueprint } from "@/stage3/variants/variantMap";

/**
 * Apply blueprint to a DOM element
 */
export function applyBlueprint(
  el: HTMLElement | null,
  blueprint: LayoutBlueprint | null
) {
  if (!el || !blueprint) return;

  const { style } = blueprint;

  console.log(
    "[STAGE3 RENDERER] Applying blueprint:",
    blueprint.layer,
    blueprint.type
  );

  /**
   * Reset first to ensure deterministic rendering
   */
  el.style.position = "absolute";

  /**
   * Apply positional rules
   */
  if (style.top !== undefined) el.style.top = style.top;
  if (style.bottom !== undefined) el.style.bottom = style.bottom;
  if (style.left !== undefined) el.style.left = style.left;
  if (style.right !== undefined) el.style.right = style.right;

  /**
   * Apply size rules
   */
  if (style.width) el.style.width = style.width;
  if (style.height) el.style.height = style.height;

  /**
   * Apply transform rules
   */
  if (style.transform) el.style.transform = style.transform;

  /**
   * Apply visual rules
   */
  if (style.opacity !== undefined) {
    el.style.opacity = String(style.opacity);
  }

  if (style.zIndex !== undefined) {
    el.style.zIndex = String(style.zIndex);
  }

  /**
   * Apply containment strategy
   */
  el.style.objectFit =
    blueprint.constraints.fit === "cover" ? "cover" : "contain";

  console.log(
    "[STAGE3 RENDERER] Blueprint applied successfully"
  );
}