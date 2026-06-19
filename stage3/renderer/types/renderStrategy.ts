/**
 * =========================================================
 * JELLYBACK STAGE 3
 * RENDER STRATEGY SYSTEM
 * =========================================================
 *
 * PURPOSE
 * -------
 * Defines how a slot should be visually rendered.
 *
 * This replaces implicit logic inside FramedImage.
 *
 * Each strategy describes a different rendering behaviour
 * for the same underlying slot geometry.
 *
 * =========================================================
 * CHANGE LOG
 * =========================================================
 *
 * 2026-06-16 11:45 BST
 *
 * Reason:
 * Introduce explicit rendering strategy layer to separate
 * slot geometry from rendering behaviour.
 *
 * Impact:
 * No runtime changes yet (type-only foundation).
 *
 * Author:
 * ChatGPT
 */

export type RenderStrategy =
  /**
   * Standard image inside a slot with optional per-slot frame
   * (current Polaroid behaviour)
   */
  | "slot-framed"

  /**
   * One shared frame rendered once over multiple slots
   * (Film strip, contact sheet, etc.)
   */
  | "shared-frame"

  /**
   * Pure CSS / layout-driven composition
   * (Edge stack, editorial layouts)
   */
  | "css"

  /**
   * Mask / clipping-based rendering
   * (future torn paper, irregular shapes)
   */
  | "masked"

  /**
   * Fully custom renderer (escape hatch)
   */
  | "custom";

/**
 * =========================================================
 * OPTIONAL STRATEGY CONFIG
 * =========================================================
 *
 * Some render modes require additional configuration.
 */
export interface RenderStrategyConfig {
  /**
   * Shared frame asset (film strip, contact sheet overlay, etc)
   */
  frameSrc?: string;

  /**
   * Insets applied to image inside slot
   */
  imageInset?: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };

  /**
   * Optional CSS blend mode / effects hook (future)
   */
  blendMode?: string;
}