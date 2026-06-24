"use client";

/**
 * =========================================================
 * STAGE 3 — TREATMENT SYSTEM
 * =========================================================
 * Created: 2026-06-22
 *
 * PURPOSE:
 * Separates visual styling from geometry.
 * Geometry = position
 * Treatment = appearance
 * =========================================================
 */

export type TreatmentType =
  | "clean"
  | "soft_wash"
  | "cinematic"
  | "faded_archive"
  | "none";

/**
 * Visual modifiers only (NO layout influence)
 */
export type Treatment = {
  type: TreatmentType;

  opacity?: number;

  blur?: number;

  saturate?: number;

  contrast?: number;

  brightness?: number;

  grayscale?: number;

  vignette?: number;
};

/**
 * Default safe treatment
 */
export const DEFAULT_TREATMENT: Treatment = {
  type: "clean",
  opacity: 1,
};