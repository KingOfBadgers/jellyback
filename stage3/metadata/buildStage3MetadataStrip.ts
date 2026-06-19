"use client";

import type {
  Stage3MetadataStrip,
  Stage3MetadataSlot,
} from "./Stage3MetadataStrip";
import type { BorderSeed } from "@/stage25/store/compositionBorderStore";

/**
 * =========================================================
 * METADATA STRIP BUILDER (STAGE 3 ENGINE LAYER)
 * =========================================================
 *
 * PURPOSE
 * ---
 * Converts a frozen BorderSeed into a deterministic
 * DVD-style metadata strip.
 *
 * NO rendering logic allowed here.
 * =========================================================
 */

function selectVariant(seed: BorderSeed): Stage3MetadataStrip["variant"] {
  const hasLogo = Boolean(seed.assets?.logo);
  const hasResolution = Boolean(seed.media?.resolution);
  const hasRuntime = Boolean(seed.runtimeMinutes);

  if (!hasLogo) return "LOGOLESS";
  if (hasResolution && hasRuntime) return "TECH";
  if (!hasRuntime) return "MINIMAL";

  return "FULL";
}

function buildSlots(seed: BorderSeed): Stage3MetadataSlot[] {
  const slots: Stage3MetadataSlot[] = [];

  const rating = seed.ratings?.mpaa ?? seed.ratings?.bbfc;
  const resolution = seed.media?.resolution;
  const runtime = seed.runtimeMinutes ? `${seed.runtimeMinutes}m` : null;

  if (seed.assets?.logo) {
    slots.push({
      type: "LOGO",
      width: 260,
      src: seed.assets.logo,
    });
  }

  if (rating) {
    slots.push({
      type: "RATING",
      width: 120,
      value: rating,
    });
  }

  if (resolution) {
    slots.push({
      type: "RESOLUTION",
      width: 140,
      value: resolution,
    });
  }

  if (seed.media?.subtitles) {
    slots.push({
      type: "CC",
      width: 80,
    });
  }

  if (runtime) {
    slots.push({
      type: "RUNTIME",
      width: 140,
      value: runtime,
    });
  }

  /**
   * Always present authenticity element
   */
  slots.push({
    type: "BARCODE",
    width: 360,
  });

  /**
   * System mark
   */
  slots.push({
    type: "JB",
    width: 100,
  });

  return slots;
}

export function buildStage3MetadataStrip(
  seed: BorderSeed
): Stage3MetadataStrip {
  const traceId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36);

  console.log("[STAGE3][METADATA STRIP BUILDER]", {
    traceId,
    movieId: seed.movieId,
  });

  return {
    width: 1500,
    height: 100,
    variant: selectVariant(seed),
    slots: buildSlots(seed),
    _debug: { traceId },
  };
}