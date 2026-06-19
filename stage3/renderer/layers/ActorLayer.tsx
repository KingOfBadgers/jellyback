"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3
 * ACTOR LAYER
 * =========================================================
 *
 * PURPOSE
 * -------
 * Renders actor imagery into a slot-based layout.
 *
 * DESIGN RULES
 * ------------
 * - ActorLayer does NOT define geometry
 * - ActorLayer does NOT build layouts
 * - ActorLayer only renders assets into slots
 *
 * ARCHITECTURE
 * ------------
 *
 * SELECT LAYOUT
 *      ↓
 * BUILD LAYOUT
 *      ↓
 * RENDER ACTORS
 *
 * =========================================================
 * CHANGE LOG
 * =========================================================
 *
 * 2026-06-10 18:15 BST
 * CONTACT_SHEET support added
 *
 * 2026-06-18 18:30 BST
 * PATCH: NONE VARIANT SAFETY GUARD
 *
 * Reason:
 * - Variant system now includes "None" option
 * - Prevents accidental layout resolution from undefined/null variant state
 * - Ensures fallback remains deterministic without changing layout logic
 *
 * Impact:
 * - No layout changes
 * - No rendering changes
 * - Only guards invalid variant state safely
 *
 * Author:
 * ChatGPT
 */

import { buildFiveStrip } from "@/stage3/layouts/buildFiveStrip";
import { buildHeroTriptych } from "@/stage3/layouts/buildHeroTriptych";
import { buildContactSheet } from "@/stage3/layouts/buildContactSheet";

import { useCompositionStore } from "@/stage3/store/compositionStore";

import type {
  ActorVariant,
  ActorLayoutId,
} from "@/stage3/variants/types";

import type {
  CompositionLayout,
} from "@/stage3/layouts/types";

/**
 * =========================================================
 * LAYOUT SELECTOR
 * =========================================================
 */
function buildActorLayout(
  layoutId: ActorLayoutId
): CompositionLayout {
  console.log(
    "[STAGE3][ACTOR_LAYER] SELECT LAYOUT",
    {
      layoutId,
    }
  );

  switch (layoutId) {
    case "CONTACT_SHEET":
      return buildContactSheet();

    case "HERO_TRIPTYCH":
      return buildHeroTriptych();

    case "FIVE_STRIP":
    default:
      return buildFiveStrip();
  }
}

export default function ActorLayer({
  seed,
}: any) {
  const actors =
    seed?.assets?.actors || [];

  console.log(
    "[STAGE3][ACTOR_LAYER] START",
    {
      actorCount: actors.length,
    }
  );

  if (!actors.length) {
    console.log(
      "[STAGE3][ACTOR_LAYER] NO ACTORS"
    );

    return null;
  }

  /**
   * =========================================================
   * VARIANT SELECTION
   * =========================================================
   */
  const actorVariants =
    useCompositionStore(
      (s) => s.actorVariants
    );

  const activeActorIndex =
    useCompositionStore(
      (s) => s.active.actors
    );

  const selectedVariant: ActorVariant | undefined =
    actorVariants?.[activeActorIndex];

  console.log(
    "[STAGE3][ACTOR_LAYER] VARIANT",
    {
      activeActorIndex,
      available: actorVariants?.length ?? 0,
      variant: selectedVariant?.id,
      layoutId: selectedVariant?.layoutId,
    }
  );

  /**
   * =========================================================
   * 🔴 PATCH: NONE VARIANT SAFETY GUARD (2026-06-18 BST)
   * =========================================================
   *
   * Reason:
   * - "None" option exists in variant matrix
   * - It represents intentional absence
   * - It must NOT break layout resolution
   *
   * Behaviour:
   * - If layoutId is missing/null/invalid, fallback to FIVE_STRIP
   * - No removal of existing logic
   */
  const layoutId: ActorLayoutId =
    (selectedVariant?.layoutId as ActorLayoutId) ?? "FIVE_STRIP";

  /**
   * =========================================================
   * BUILD LAYOUT
   * =========================================================
   */
  const layout = buildActorLayout(layoutId);

  /**
   * =========================================================
   * LIMIT ACTORS TO AVAILABLE SLOTS
   * =========================================================
   */
  const visibleActors =
    actors.slice(0, layout.slots.length);

  console.log(
    "[STAGE3][ACTOR_LAYER][LAYOUT APPLIED]",
    {
      layoutId: layout.id,
      slotCount: layout.slots.length,
      renderedActors: visibleActors.length,
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {visibleActors.map((actor: any, index: number) => {
        const slot = layout.slots[index];

        if (!slot) {
          console.warn(
            "[STAGE3][ACTOR_LAYER] MISSING SLOT",
            { index }
          );
          return null;
        }

        if (!actor?.image) {
          console.warn(
            "[STAGE3][ACTOR_LAYER] ACTOR MISSING IMAGE",
            {
              index,
              actorId: actor?.id,
            }
          );
          return null;
        }

        console.log(
          "[STAGE3][ACTOR_LAYER] RENDER ACTOR",
          {
            actorId: actor.id,
            slotId: slot.id,
          }
        );

        return (
          <img
            key={actor.id || index}
            src={actor.image}
            alt={actor.name || ""}
            style={{
              position: "absolute",
              left: slot.x,
              top: slot.y,
              width: slot.width,
              height: slot.height,
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              opacity: 0.95,
              filter: "contrast(1.1) saturate(1.05)",
              zIndex: 5,
            }}
          />
        );
      })}
    </div>
  );
}