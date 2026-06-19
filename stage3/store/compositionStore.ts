"use client";

import { create } from "zustand";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSITION STORE (TRACE ENHANCED)
 * =========================================================
 *
 * CHANGE (2026-06-19)
 * --------------------
 * Added structured logging + trace snapshots to diagnose:
 * - variant selection issues
 * - invisible "NONE" states
 * - UI mismatch between contract + render
 *
 * NO BEHAVIOUR CHANGE
 * ONLY OBSERVABILITY ENHANCEMENT
 * =========================================================
 */

export type VariantSelection = string | null;

export type MetadataBarStyle =
  | "dvdStrip"
  | "steelBar"
  | "minimal";

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

function traceState(label: string, state: any) {
  console.log(`[STAGE3 STORE TRACE][${label}]`, {
    seed: state?.seed?.movieId,
    selected: state?.selected,
    metadataBarStyle: state?.metadataBarStyle,
  });
}

export const useCompositionStore = create<CompositionStore>(
  (set, get) => ({
    /**
     * -----------------------------------------------------
     * STATE
     * -----------------------------------------------------
     */
    seed: null,

    selected: {
      actors: null,
      collage: null,
      logo: null,
    },

    metadataBarStyle: "dvdStrip",

    /**
     * -----------------------------------------------------
     * SEED HYDRATION
     * -----------------------------------------------------
     */
    setSeed: (seed) => {
      console.log("[STAGE3 STORE][setSeed]", {
        movieId: seed?.movieId,
        logoExists: Boolean(seed?.assets?.logo),
        actorCount: seed?.assets?.actors?.length,
        backdropCount: seed?.assets?.backdrops?.length,
      });

      const nextState = {
        seed,
        selected: {
          actors: null,
          collage: null,
          logo: null,
        },
      };

      traceState("BEFORE_SET", get());

      set(nextState);

      traceState("AFTER_SET", {
        ...get(),
      });
    },

    /**
     * -----------------------------------------------------
     * VARIANT SELECTION
     * -----------------------------------------------------
     */
    selectVariant: (layer, variantId) => {
      const before = get();

      console.log("[STAGE3 STORE][selectVariant]", {
        layer,
        from: before.selected[layer],
        to: variantId,
      });

      set({
        selected: {
          ...before.selected,
          [layer]: variantId,
        },
      });

      const after = get();

      console.log("[STAGE3 STORE][selectVariant][APPLIED]", {
        layer,
        selected: after.selected,
      });
    },

    /**
     * -----------------------------------------------------
     * VARIANT CYCLING
     * -----------------------------------------------------
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
     * -----------------------------------------------------
     * METADATA BAR STYLE
     * -----------------------------------------------------
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
     * -----------------------------------------------------
     * RESET
     * -----------------------------------------------------
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