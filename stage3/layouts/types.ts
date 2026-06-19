import type { LayoutPreset } from "./layoutPreset";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSITION LAYOUT
 * =========================================================
 */

export interface CompositionLayout {
  id: string;
  name: string;
  slots: LayoutSlot[];

  /**
   * =====================================================
   * UNIFIED POSITION SYSTEM (SPRINT 4)
   * =====================================================
   *
   * ADDED: 2026-06-18 BST
   *
   * REASON:
   * Replace layer-specific positioning hacks with
   * a single deterministic system.
   *
   * RULE:
   * - Geometry stays frozen
   * - Position applied ONLY at final composition stage
   */
  position?: {
    preset: LayoutPreset;
    offsetY?: number;
  };
}