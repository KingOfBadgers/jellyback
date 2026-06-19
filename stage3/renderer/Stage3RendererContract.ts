"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — RENDERER CONTRACT (HARD LOCK)
 * =========================================================
 *
 * PURPOSE:
 * -------
 * This file defines STRICT rules for ALL render layers.
 *
 * AI + HUMAN:
 * ----------
 * This is the boundary between "data" and "visual output".
 *
 * If something is wrong visually, DO NOT fix it here.
 * Fix must happen upstream in:
 * - layout builders
 * - variant generators
 * - composition graph
 */

export const Stage3RendererContract = {
  /**
   * =====================================================
   * CORE RULE
   * =====================================================
   */
  mode: "STRICT_EXECUTION_ONLY",

  /**
   * =====================================================
   * FORBIDDEN BEHAVIOURS
   * =====================================================
   */
  forbidden: [
    "auto-centering",
    "auto-scaling",
    "layout inference",
    "fallback positioning",
    "dynamic slot adjustment",
    "visual correction heuristics",
  ],

  /**
   * =====================================================
   * REQUIRED BEHAVIOURS
   * =====================================================
   */
  required: [
    "render exact x/y from graph",
    "render exact width/height from graph",
    "respect zIndex strictly",
    "respect imageInset strictly",
    "no DOM restructuring",
  ],

  /**
   * =====================================================
   * DEBUG MODE RULE
   * =====================================================
   */
  debug: {
    logSlots: true,
    logMissingAssets: true,
    logRenderBounds: true,
  },
};