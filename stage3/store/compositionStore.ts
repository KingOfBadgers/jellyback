"use client";

import { create } from "zustand";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSITION STORE (REFACTORED)
 * =========================================================
 *
 * PURPOSE
 * --------
 * Holds ONLY user-facing runtime selections for rendering.
 *
 * Stage 3 does NOT:
 * - compute variants
 * - index arrays
 * - derive layouts
 * - mutate seed data
 *
 * Stage 2.5 provides:
 * - fully resolved variant options per layer
 *
 * Stage 3 does:
 * - select from options OR select NONE
 *
 * =========================================================
 */

export type VariantSelection = string | null;

export type MetadataBarStyle =
  | "dvdStrip"
  | "steelBar"
  | "minimal";

export type CompositionStore = {
  /**
   * -----------------------------------------------------
   * HYDRATED SEED (READ ONLY CONTEXT)
   * -----------------------------------------------------
   */
  seed: any | null;

  /**
   * -----------------------------------------------------
   * USER SELECTIONS (NO INDEXING, NO STATE MACHINES)
   * -----------------------------------------------------
   */
  selected: {
    actors: VariantSelection;
    collage: VariantSelection;
    logo: VariantSelection;
  };

  /**
   * -----------------------------------------------------
   * METADATA BAR STYLE
   * -----------------------------------------------------
   */
  metadataBarStyle: MetadataBarStyle;

  /**
   * -----------------------------------------------------
   * ACTIONS
   * -----------------------------------------------------
   */
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
     * SEED
     * -----------------------------------------------------
     */
    setSeed: (seed) => {
      console.log("[STAGE3 STORE] setSeed:", seed?.movieId);

      set({
        seed,
        selected: {
          actors: null,
          collage: null,
          logo: null,
        },
      });
    },

    /**
     * -----------------------------------------------------
     * VARIANT SELECTION (DIRECT)
     * -----------------------------------------------------
     */
    selectVariant: (layer, variantId) => {
      console.log(
        "[STAGE3 STORE] selectVariant:",
        layer,
        variantId
      );

      set({
        selected: {
          ...get().selected,
          [layer]: variantId,
        },
      });
    },

    /**
     * -----------------------------------------------------
     * VARIANT CYCLING (UI CONVENIENCE ONLY)
     * -----------------------------------------------------
     */
    cycleVariant: (layer, options) => {
      const state = get();
      const current = state.selected[layer];

      const index = options.findIndex(
        (v) => v === current
      );

      const next =
        options.length === 0
          ? null
          : options[(index + 1) % options.length];

      console.log(
        "[STAGE3 STORE] cycleVariant:",
        layer,
        "->",
        next
      );

      set({
        selected: {
          ...state.selected,
          [layer]: next,
        },
      });
    },

    /**
     * -----------------------------------------------------
     * METADATA BAR STYLE
     * -----------------------------------------------------
     */
    setMetadataBarStyle: (style) => {
      console.log("[STAGE3 STORE] metadata style:", style);

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
      console.log("[STAGE3 STORE] reset");

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