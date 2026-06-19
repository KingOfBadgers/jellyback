"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3
 * BACKGROUND LAYER (REWRITTEN — ARCHITECTURE ALIGNMENT)
 * =========================================================
 *
 * DATE: 2026-06-18 BST
 *
 * PURPOSE
 * -------
 * Render canonical background asset with
 * variant-based presentation treatment.
 *
 * ARCHITECTURE PARITY
 * --------------------
 * Matches ActorLayer + CollageLayer pattern:
 *
 * SELECT VARIANT
 *      ↓
 * RESOLVE STYLE
 *      ↓
 * RENDER ASSET
 *
 * RULES
 * -----
 * - NO geometry
 * - NO layout building
 * - NO asset mutation
 * - ONLY presentation transforms
 *
 * CRITICAL FIXES
 * --------------
 * - unified "backdrop" naming contract
 * - safe index guard
 * - fallback variant guaranteed
 * - hydration-safe rendering
 */

import { useCompositionStore } from "@/stage3/store/compositionStore";

import type { BackdropVariant } from "@/stage3/variants/types";

/**
 * =========================================================
 * STYLE RESOLVER (PURE FUNCTION)
 * =========================================================
 */
function resolveBackdropStyle(variantId: string) {
  console.log("[STAGE3][BACKDROP_LAYER] RESOLVE_STYLE", {
    variantId,
  });

  switch (variantId) {
    case "backdrop-clean":
      return {
        transform: "scale(1)",
        filter: "none",
        opacity: 1,
      };

    case "backdrop-dark-cinema":
      return {
        transform: "scale(1)",
        filter: "brightness(0.55) contrast(1.1)",
        opacity: 1,
      };

    case "backdrop-zoom-depth":
      return {
        transform: "scale(1.08)",
        filter: "contrast(1.15) saturate(1.05)",
        opacity: 1,
      };

    case "backdrop-soft-blur":
      return {
        transform: "scale(1.05)",
        filter: "blur(2px) brightness(0.9)",
        opacity: 1,
      };

    default:
      console.warn("[STAGE3][BACKDROP_LAYER] UNKNOWN VARIANT", {
        variantId,
      });

      return {
        transform: "scale(1)",
        filter: "none",
        opacity: 1,
      };
  }
}

/**
 * =========================================================
 * SAFE INDEX GUARD
 * =========================================================
 */
function safeIndex(value: any): number {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  console.warn("[STAGE3][BACKDROP_LAYER] INVALID INDEX FALLBACK", value);
  return 0;
}

/**
 * =========================================================
 * COMPONENT
 * =========================================================
 */
export default function BackgroundLayer({ seed }: any) {
  const src = seed?.background?.src;

  /**
   * =========================================================
   * STORE ACCESS (PARITY WITH ACTOR/COLLAGE)
   * =========================================================
   */
  const backdropVariants = useCompositionStore((s) => s.backdropVariants);

  const activeBackdropIndex = useCompositionStore((s) => s.active.backdrop);

  const selectedVariant: BackdropVariant | undefined =
    backdropVariants[safeIndex(activeBackdropIndex)];

  console.log("[STAGE3][BACKDROP_LAYER] START", {
    activeBackdropIndex,
    available: backdropVariants.length,
    variant: selectedVariant?.id,
  });

  /**
   * =========================================================
   * NO BACKGROUND HANDLING
   * =========================================================
   */
  if (!src) {
    console.warn("[STAGE3][BACKDROP_LAYER] NO SOURCE");

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 12,
        }}
      >
        No background
      </div>
    );
  }

  /**
   * =========================================================
   * FALLBACK VARIANT SAFETY
   * =========================================================
   */
  const variantId = selectedVariant?.id ?? "backdrop-clean";

  const style = resolveBackdropStyle(variantId);

  console.log("[STAGE3][BACKDROP_LAYER] APPLY_VARIANT", {
    variantId,
    src,
  });

  /**
   * =========================================================
   * RENDER
   * =========================================================
   */
  return (
    <img
      src={src}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",

        transform: style.transform,
        filter: style.filter,
        opacity: style.opacity,

        zIndex: 0,
      }}
    />
  );
}