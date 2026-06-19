/**
 * =========================================================
 * JELLYBACK STAGE 3 — BACKGROUND RESOLVER
 * =========================================================
 *
 * PURPOSE
 * -------
 * Resolve the SINGLE canonical background image
 * provided by the Stage 2 → 2.5 border seed.
 *
 * RULES
 * -----
 * - No intelligent decision making
 * - No background selection logic
 * - No fallback ordering systems
 * - One deterministic source only
 *
 * Stage 2.5 already decides canonical background.
 *
 * Stage 3 only reads it.
 *
 * =========================================================
 *
 * CHANGE LOG
 * ----------
 * 2026-06-19 18:25 UTC
 *
 * CHANGED BY: ChatGPT
 *
 * REASON
 * ------
 * Stage 3 resolver was reading obsolete field:
 *
 *   seed.canonicalBackground
 *
 * Actual Border Materialiser contract now emits:
 *
 *   seed.background.src
 *
 * This caused emergency fallback to trigger
 * incorrectly despite valid backdrop existing.
 *
 * CHANGES
 * -------
 * - Updated resolver to new seed contract
 * - Added verbose logging
 * - Added fallback visibility logging
 *
 * =========================================================
 */

const FALLBACK_BG =
  "/placeholder-poster.png";

/**
 * =========================================================
 * RESOLVE BACKGROUND
 * =========================================================
 */
export function resolveBackground(
  seed: any
): string {
  console.log(
    "[BACKGROUND RESOLVER][INPUT]",
    {
      movieId: seed?.movieId,
      hasSeed: !!seed,
      hasBackgroundObject:
        !!seed?.background,
      backgroundSrc:
        seed?.background?.src,
    }
  );

  /**
   * =========================================================
   * PRIMARY DETERMINISTIC SOURCE
   * =========================================================
   *
   * Stage 2.5 Materialiser guarantees:
   *
   * seed.background.src
   */
  const background =
    seed?.background?.src;

  /**
   * Valid canonical background exists
   */
  if (background) {
    console.log(
      "[BACKGROUND RESOLVER][RESOLVED]",
      {
        source:
          "seed.background.src",
        path: background,
      }
    );

    return background;
  }

  /**
   * Emergency fallback only
   *
   * This should never normally happen.
   */
  console.warn(
    "[BACKGROUND RESOLVER][FALLBACK USED]",
    {
      fallback: FALLBACK_BG,
      reason:
        "seed.background.src missing",
    }
  );

  return FALLBACK_BG;
}