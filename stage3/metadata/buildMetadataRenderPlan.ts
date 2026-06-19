/**
 * =========================================================
 * JELLYBACK STAGE 3 — METADATA RENDER PLAN (ICON-FIRST FIX)
 * =========================================================
 */

import type { BorderSeed } from "@/stage25/store/compositionBorderStore";

export type MetadataBarVariant =
  | "FULL"
  | "STANDARD"
  | "TECH"
  | "LOGOLESS"
  | "MINIMAL";

export type MetadataSlot =
  | "LOGO"
  | "RATING"
  | "RESOLUTION"
  | "CC"
  | "RUNTIME"
  | "BARCODE"
  | "JB";

export type MetadataRenderSlot = {
  type: MetadataSlot;
  width: number;

  value?: string | null;

  icon?: {
    src: string;
  } | null;
};

export type MetadataRenderPlan = {
  width: 1000;
  height: 150;

  variant: MetadataBarVariant;

  slots: MetadataRenderSlot[];
};

/**
 * ICON RESOLVERS
 */
function resolveMpaaIcon(mpaa: string | null) {
  if (!mpaa) return null;
  return `/assets/meta/mpaa/${mpaa}.png`;
}

function resolveBBFCIcon(bbfc: string | null) {
  if (!bbfc) return null;
  return `/assets/meta/bbfc/${bbfc}.png`;
}

/**
 * NEW: runtime icon resolver (SAFE)
 */
function resolveRuntimeIcon() {
  return `/assets/meta/runtime/timer.png`;
}

/**
 * VARIANT
 */
function selectVariant(seed: BorderSeed): MetadataBarVariant {
  const hasLogo = Boolean(seed.assets?.logo);
  const hasResolution = Boolean(seed.media?.resolution);
  const hasRuntime = Boolean(seed.runtimeMinutes);

  if (!hasLogo && !hasResolution) return "MINIMAL";
  if (!hasLogo) return "LOGOLESS";
  if (hasResolution && hasRuntime) return "TECH";

  return "FULL";
}

/**
 * SLOT BUILDER
 */
function buildSlots(seed: BorderSeed): MetadataRenderSlot[] {
  const slots: MetadataRenderSlot[] = [];

  const rating =
    seed.ratings?.mpaa ?? seed.ratings?.bbfc ?? null;

  const resolution = seed.media?.resolution ?? null;

  const runtime = seed.runtimeMinutes
    ? `${seed.runtimeMinutes}m`
    : null;

  const logo = seed.assets?.logo ?? null;

  // LOGO
  if (logo) {
    slots.push({
      type: "LOGO",
      width: 200,
      icon: { src: logo },
    });
  }

  // RATING (ICON ONLY)
  if (rating) {
    const icon =
      seed.ratings?.mpaa
        ? resolveMpaaIcon(seed.ratings.mpaa)
        : resolveBBFCIcon(seed.ratings.bbfc);

    if (icon) {
      slots.push({
        type: "RATING",
        width: 90,
        icon: { src: icon },
      });
    }
  }

  // RESOLUTION
if (resolution) {
  const icon = `/assets/meta/resolution/${resolution}.png`;

  console.log("[STAGE3][RESOLUTION SLOT BUILD]", {
    resolution,
    icon,
  });

  slots.push({
    type: "RESOLUTION",
    width: 110,

    /**
     * VALUE KEPT ONLY FOR DEBUG / FALLBACK
     * Renderer should NOT rely on this visually anymore
     */
    value: resolution,

    /**
     * CRITICAL FIX:
     * Ensure renderer ALWAYS receives icon.src
     */
    icon: {
      src: icon,
    },
  });
}

  // CC
  if (seed.media?.subtitles) {
    slots.push({
      type: "CC",
      width: 80,
      icon: { src: "/assets/meta/subtitles/cc.png" },
    });
  }

  /**
   * =========================================================
   * RUNTIME (UPDATED: ICON-FIRST + 2-LINE READY)
   * =========================================================
   *
   * AI RULE:
   * - never rely on text rendering in Stage 3 visual layer
   * - runtime becomes icon + value overlay
   */
  if (runtime) {
    slots.push({
      type: "RUNTIME",
      width: 140,

      // still kept for fallback/debug only
      value: runtime,

      icon: {
        src: resolveRuntimeIcon(),
      },
    });
  }

  // BARCODE
  slots.push({
    type: "BARCODE",
    width: 220,
    icon: {
      src: "/assets/meta/barcode/barcode.png",
    },
  });

  // JB
  slots.push({
    type: "JB",
    width: 90,
    icon: {
      src: "/assets/meta/jb/jb.png",
    },
  });

  return slots;
}

/**
 * MAIN
 */
export function buildMetadataRenderPlan(seed: BorderSeed): MetadataRenderPlan {
  const variant = selectVariant(seed);
  const slots = buildSlots(seed);

  return {
    width: 1000,
    height: 150,
    variant,
    slots,
  };
}