"use client";

import { create } from "zustand";
import { variantRegistry } from "@/stage3/variants/variantRegistry";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSITION STORE (HARDENED)
 * =========================================================
 *
 * CHANGE (2026-06-21)
 * ---------------------------------------------------------
 * Added EARLY NORMALISATION STEP inside setSeed
 *
 * PURPOSE:
 * - Ensure deterministic initial variant selection
 * - Prevent null propagation into blueprint/renderer
 * - Guarantee "NONE" is always valid fallback state
 *
 * RULES:
 * - NO UI logic
 * - NO rendering logic
 * - NO layout logic
 * - ONLY state + validation enforcement
 * =========================================================
 */

export type VariantSelection = string | null;

export type MetadataBarStyle =
  | "dvdStrip"
  | "steelBar"
  | "minimal";

export type VariantLayer = "actors" | "collage" | "logo";

export type CompositionStore = {
  seed: any | null;

  selected: {
    actors: VariantSelection;
    collage: VariantSelection;
    logo: VariantSelection;
  };

  metadataBarStyle: MetadataBarStyle;

  setSeed: (seed: any) => void;

  selectVariant: (
    layer: keyof CompositionStore["selected"],
    variantId: VariantSelection
  ) => void;

  cycleVariant: (
    layer: keyof CompositionStore["selected"],
    options: string[]
  ) => void;

  setMetadataBarStyle: (style: MetadataBarStyle) => void;

  reset: () => void;
};

/**
 * =========================================================
 * TRACE HELPERS
 * =========================================================
 */

function traceState(label: string, state: any) {
  console.log(`[STAGE3 STORE TRACE][${label}]`, {
    seed: state?.seed?.movieId,
    selected: state?.selected,
    metadataBarStyle: state?.metadataBarStyle,
  });
}

/**
 * =========================================================
 * VALIDATION LAYER
 * =========================================================
 */

function isValidVariant(layer: VariantLayer, variant: VariantSelection) {
  if (variant === null) return true;

  const def = variantRegistry[variant as keyof typeof variantRegistry];
  if (!def) return false;

  return def.layer === layer;
}

/**
 * =========================================================
 * STORE
 * =========================================================
 */

export const useCompositionStore = create<CompositionStore>(
  (set, get) => ({
    seed: null,

    selected: {
      actors: null,
      collage: null,
      logo: null,
    },

    metadataBarStyle: "dvdStrip",

    /**
     * =====================================================
     * SEED HYDRATION (HARDENED + EARLY NORMALISATION)
     * =====================================================
     */
    setSeed: (seed) => {
      console.log("[STAGE3 STORE][setSeed]", {
        movieId: seed?.movieId,
        logoExists: Boolean(seed?.assets?.logo),
        actorCount: seed?.assets?.actors?.length,
        backdropCount: seed?.assets?.backdrops?.length,
      });

      const state = get();

      /**
       * =====================================================
       * EARLY NORMALISATION STEP (CRITICAL FIX)
       * =====================================================
       *
       * This ensures:
       * - there is ALWAYS a deterministic actor variant
       * - even when no user selection exists yet
       * - even before UI interaction begins
       * =====================================================
       */

      const actorCount = seed?.assets?.actors?.length ?? 0;

      const defaultActorsVariant =
        actorCount >= 5
          ? "ACTOR_5_ROW"
          : actorCount >= 3
          ? "ACTOR_3_CENTER_FOCUS"
          : actorCount >= 1
          ? "ACTOR_1_CENTER"
          : "NONE";

      const nextSelected = {
        actors: isValidVariant("actors", state.selected.actors)
          ? state.selected.actors
          : defaultActorsVariant,

        collage: isValidVariant("collage", state.selected.collage)
          ? state.selected.collage
          : null,

        logo: isValidVariant("logo", state.selected.logo)
          ? state.selected.logo
          : null,
      };

      const nextState = {
        seed,
        selected: nextSelected,
      };

      traceState("BEFORE_SET", state);

      set(nextState);

      traceState("AFTER_SET", get());
    },

    /**
     * =====================================================
     * VARIANT SELECTION
     * =====================================================
     */
    selectVariant: (layer, variantId) => {
      const before = get();

      console.log("[STAGE3 STORE][selectVariant]", {
        layer,
        from: before.selected[layer],
        to: variantId,
      });

      if (!isValidVariant(layer as VariantLayer, variantId)) {
        console.warn("[STAGE3 STORE][INVALID VARIANT BLOCKED]", {
          layer,
          variantId,
        });
        return;
      }

      set({
        selected: {
          ...before.selected,
          [layer]: variantId,
        },
      });

      console.log("[STAGE3 STORE][selectVariant][APPLIED]", {
        layer,
        selected: get().selected,
      });
    },

    /**
     * =====================================================
     * VARIANT CYCLING
     * =====================================================
     */
    cycleVariant: (layer, options) => {
      const state = get();
      const current = state.selected[layer];

      const index = options.findIndex((v) => v === current);

      const next =
        options.length === 0
          ? null
          : options[(index + 1) % options.length];

      console.log("[STAGE3 STORE][cycleVariant]", {
        layer,
        current,
        next,
        options,
      });

      if (!isValidVariant(layer as VariantLayer, next)) {
        console.warn("[STAGE3 STORE][CYCLE BLOCKED INVALID VARIANT]", {
          layer,
          next,
        });
        return;
      }

      set({
        selected: {
          ...state.selected,
          [layer]: next,
        },
      });

      console.log("[STAGE3 STORE][cycleVariant][APPLIED]", {
        layer,
        selected: get().selected,
      });
    },

    /**
     * =====================================================
     * METADATA BAR STYLE
     * =====================================================
     */
    setMetadataBarStyle: (style) => {
      console.log("[STAGE3 STORE][metadataBarStyle]", {
        from: get().metadataBarStyle,
        to: style,
      });

      set({
        metadataBarStyle: style,
      });
    },

    /**
     * =====================================================
     * RESET
     * =====================================================
     */
    reset: () => {
      console.log("[STAGE3 STORE][reset]");

      set({
        seed: null,
        selected: {
          actors: null,
          collage: null,
          logo: null,
        },
        metadataBarStyle: "dvdStrip",
      });
    },
  })
);

export default useCompositionStore;