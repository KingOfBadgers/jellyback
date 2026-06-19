/**
 * =========================================================
 * JELLYBACK STAGE 3
 * LAYOUT GUARD WRAPPER
 * =========================================================
 *
 * PURPOSE
 * -------
 * Standardises runtime validation for all layouts.
 *
 * Avoids inconsistent logging strings.
 * Prevents copy/paste drift.
 */

import type { CompositionLayout } from "./types";
import { assertLayout } from "./utils/assertLayout";

export function withLayoutGuard(
  layout: CompositionLayout,
  source: string
): CompositionLayout {
  assertLayout(layout, source);
  return layout;
}