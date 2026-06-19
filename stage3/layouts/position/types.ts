/**
 * =========================================================
 * JELLYBACK STAGE 3 — POSITION CONTRACT
 * =========================================================
 *
 * DATE: 2026-06-18 BST
 *
 * PURPOSE:
 * Single unified positioning model for ALL layers.
 */

import type { LayoutPreset } from "@/stage3/layouts/types/layoutPreset";

export interface LayoutPosition {
  /**
   * Vertical placement rule
   */
  preset: LayoutPreset;

  /**
   * Optional pixel offset AFTER preset application
   */
  offsetY?: number;
}