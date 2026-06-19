"use client";

import { useCompositionStore } from "@/stage3/store/compositionStore";

import { buildEdgeStack } from "@/stage3/layouts/collage/buildEdgeStack";
import { buildFilmStrip } from "@/stage3/layouts/collage/buildFilmStrip";
import { buildPolaroidStack } from "@/stage3/layouts/collage/buildPolaroidStack";
import { buildPolaroidSingle } from "@/stage3/layouts/collage/buildPolaroidSingle";
import { buildPolaroidPile } from "@/stage3/layouts/collage/buildPolaroidPile";

import type { CompositionLayout } from "@/stage3/layouts/types";

/**
 * =========================================================
 * COLLAGE LAYER (HARDENED SAFE GUARD PATCH)
 * =========================================================
 *
 * FIX DATE: 2026-06-18
 * FIX TIME: BST
 *
 * ISSUE:
 * - variant undefined during hydration caused silent layout failure
 *
 * FIX:
 * - added defensive variant guard
 * - guaranteed fallback layout selection
 * - added failure logging visibility
 */

function buildCollageLayout(layoutId: string): CompositionLayout {
  console.log("[STAGE3][COLLAGE_LAYER] SELECT LAYOUT", {
    layoutId,
  });

  switch (layoutId) {
    case "FILM_STRIP":
      return buildFilmStrip();

    case "POLAROID_STACK":
      return buildPolaroidStack();

    case "EDGE_STACK":
      return buildEdgeStack();

    case "POLAROID_SINGLE":
      return buildPolaroidSingle();

    case "POLAROID_PILE":
    default:
      return buildPolaroidPile();
  }
}

export default function CollageLayer({ seed }: any) {
  const activeIndex = useCompositionStore((s) => s.active.collage);

  const collageVariants = useCompositionStore((s) => s.collageVariants);

  const backdrops = seed?.assets?.backdrops || [];

  console.log("[STAGE3][COLLAGE_LAYER] START", {
    backdropCount: backdrops.length,
    activeIndex,
    variantCount: collageVariants.length,
  });

  if (!backdrops.length) {
    console.log("[STAGE3][COLLAGE_LAYER] NO BACKDROPS");
    return null;
  }

  /**
   * =========================================================
   * 🔴 FIX: VARIANT SAFETY GUARD (CRITICAL)
   * =========================================================
   */
  const variant =
    collageVariants && collageVariants.length > 0
      ? collageVariants[activeIndex] ?? collageVariants[0]
      : undefined;

  if (!variant) {
    console.warn("[STAGE3][COLLAGE_LAYER] MISSING VARIANT - FALLBACK EDGE_STACK", {
      activeIndex,
      collageVariantsLength: collageVariants?.length ?? 0,
    });
  }

  /**
   * =========================================================
   * BUILD LAYOUT (SAFE FALLBACK)
   * =========================================================
   */
  const layout = buildCollageLayout(variant?.layoutId ?? "EDGE_STACK");

  const visibleBackdrops = backdrops.slice(0, layout.slots.length);

  console.log("[STAGE3][COLLAGE_LAYER] LAYOUT APPLIED", {
    layoutId: layout.id,
    variant: variant?.id,
    slots: layout.slots.length,
    rendered: visibleBackdrops.length,
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {visibleBackdrops.map((img: any, index: number) => {
        const slot = layout.slots[index];

        if (!slot) {
          console.warn("[COLLAGE DEBUG] MISSING SLOT", { index });
          return null;
        }

        const src =
          typeof img === "string" ? img : img?.image || img?.img;

        if (!src) {
          console.warn("[COLLAGE DEBUG] NO VALID SRC", { index, raw: img });
          return null;
        }

        return (
          <img
            key={img?.id || index}
            src={src}
            alt=""
            style={{
              position: "absolute",
              left: `${slot.x}px`,
              top: `${slot.y}px`,
              width: `${slot.width}px`,
              height: `${slot.height}px`,
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              opacity: 0.95,
              zIndex: 9999,
              backgroundColor: "red",
            }}
          />
        );
      })}
    </div>
  );
}