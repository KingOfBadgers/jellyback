"use client";

import type { LayoutSlot } from "@/stage3/layouts/types";
import { Stage3RendererContract } from "./Stage3RendererContract";

/**
 * =========================================================
 * JELLYBACK STAGE 3
 * SHARED FRAME RENDERER — CONTRACT SAFE MODE (HARDENED)
 * =========================================================
 *
 * FIX DATE: 2026-06-18 BST
 *
 * ISSUE ADDRESSED:
 * - slots occasionally undefined during hydration
 * - renderer crash: slots.length throws TypeError
 *
 * STRATEGY:
 * - NEVER assume layout exists
 * - NEVER assume slots is an array
 * - NEVER allow render to crash
 *
 * RULE:
 * - Layout system remains source of truth
 * - Renderer is defensive boundary layer only
 */

console.log("[STAGE3][RENDERER][CONTRACT]", Stage3RendererContract.mode);

export default function SharedFrameRenderer(props: {
  slots?: LayoutSlot[];
  images: string[];
  frameSrc: string;
}) {
  const { slots, images, frameSrc } = props;

  const FRAME_WIDTH = 1000;
  const FRAME_HEIGHT = 188;

  /**
   * =========================================================
   * DEFENSIVE GUARD — HARD FAILURE PREVENTION
   * =========================================================
   *
   * We explicitly accept:
   * - undefined
   * - null
   * - non-array values
   *
   * We DO NOT crash.
   */
  if (!Array.isArray(slots)) {
    console.warn("[STAGE3][RENDERER][INVALID_SLOTS]", {
      reason: "slots missing or invalid",
      receivedType: typeof slots,
      isArray: Array.isArray(slots),
      slots,
    });

    return (
      <div
        style={{
          position: "absolute",
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          background: "rgba(0,0,0,0.65)",
          fontSize: 12,
          fontFamily: "sans-serif",
        }}
      >
        Layout not available
      </div>
    );
  }

  /**
   * =========================================================
   * SAFE SLOT COUNT (POST-GUARD)
   * =========================================================
   */
  const slotCount = slots.length;

  /**
   * =========================================================
   * SAFE NORMALISATION (NO TRANSFORM LOGIC HERE)
   * =========================================================
   *
   * IMPORTANT:
   * We DO NOT modify geometry in hardened mode.
   * Layout is treated as canonical truth.
   */
  const normalizedSlots = slots;

  console.log("[STAGE3][FILM_STRIP][RENDER]", {
    frame: `${FRAME_WIDTH}x${FRAME_HEIGHT}`,
    slotCount,
    imageCount: images?.length ?? 0,
    sample: normalizedSlots?.[0]
      ? {
          id: normalizedSlots[0].id,
          x: normalizedSlots[0].x,
          y: normalizedSlots[0].y,
          width: normalizedSlots[0].width,
          height: normalizedSlots[0].height,
        }
      : null,
  });

  return (
    <div
      style={{
        position: "absolute",
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
      }}
    >
      {/* =====================================================
          SLOT RENDERING (DEFENSIVE IMAGE MATCHING)
          ===================================================== */}
      {normalizedSlots.map((slot, index) => {
        const src = images?.[index];

        if (!src) {
          console.warn("[STAGE3][RENDERER][MISSING_IMAGE]", {
            index,
            slotId: slot?.id,
            imageCount: images?.length ?? 0,
          });
          return null;
        }

        return (
          <div
            key={slot.id ?? `slot-${index}`}
            style={{
              position: "absolute",
              left: slot.x,
              top: slot.y,
              width: slot.width,
              height: slot.height,
              overflow: "hidden",
            }}
          >
            <img
              src={src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        );
      })}

      {/* =====================================================
          FRAME OVERLAY (CANONICAL)
          ===================================================== */}
      <img
        src={frameSrc}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}