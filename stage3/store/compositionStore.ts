"use client";

import { create } from "zustand";

console.log("[STORE INIT] compositionStore module loaded");

import { generateActorVariants } from "@/stage3/variants/generateActorVariants";
import { generateBackdropVariants } from "@/stage3/variants/generateBackgroundVariants.ts";
import { generateCollageVariants } from "@/stage3/variants/generateCollageVariants";

import type {
  ActorVariant,
  BackdropVariant,
  CollageVariant,
} from "@/stage3/variants/types";

/**
 * =========================================================
 * STAGE 3 — INDEX UNIFICATION PATCH (2026-06-18 BST)
 * =========================================================
 *
 * FIX:
 * - Single index domain per layer
 * - No legacy backdrop mirroring
 * - Matrix = UI truth
 */

/**
 * =========================================================
 * LAYER TYPE (UNIFIED)
 * =========================================================
 */
export type VariantLayer =
  | "collage"
  | "actors"
  | "background"
  | "logo"
  | "metadataBar";

/**
 * =========================================================
 * STORE TYPE
 * =========================================================
 */
export type CompositionStore = {
  seed: any | null;

  collageVariants: CollageVariant[];
  actorVariants: ActorVariant[];
  backdropVariants: BackdropVariant[];

  active: {
    collage: number;
    actors: number;
    background: number;
    logo: number;
    metadataBar: number;
  };

  setSeed: (seed: any) => void;
  setActiveIndex: (layer: VariantLayer, index: number) => void;
  nextVariant: (layer: VariantLayer) => void;
  previousVariant: (layer: VariantLayer) => void;
};

/**
 * =========================================================
 * SAFE TOTAL RESOLVER (SINGLE SOURCE OF TRUTH)
 * =========================================================
 */
function getTotal(state: any, layer: VariantLayer) {
  switch (layer) {
    case "collage":
      return state.collageVariants.length;

    case "actors":
      return state.actorVariants.length;

    case "background":
      return state.backdropVariants.length;

    default:
      return 0;
  }
}

/**
 * =========================================================
 * STORE
 * =========================================================
 */
export const useCompositionStore = create<CompositionStore>((set, get) => ({
  seed: null,

  collageVariants: [],
  actorVariants: [],
  backdropVariants: [],

  active: {
    collage: 0,
    actors: 0,
    background: 0,
    logo: 0,
    metadataBar: 0,
  },

  /**
   * =====================================================
   * SEED
   * =====================================================
   */
  setSeed: (seed) => {
    console.log("[STAGE3 STORE] setSeed:", seed?.movieId);

    set({
      seed,
      collageVariants: generateCollageVariants(seed),
      actorVariants: generateActorVariants(seed),
      backdropVariants: generateBackdropVariants(seed),
    });
  },

  /**
   * =====================================================
   * SET INDEX (UNIFIED CYCLING)
   * =====================================================
   */
  setActiveIndex: (layer, index) => {
    const state = get();

    const total = getTotal(state, layer);

    if (!total) {
      console.warn("[STAGE3 STORE] setActiveIndex ignored", {
        layer,
        index,
      });
      return;
    }

    const safeIndex = ((index % total) + total) % total;

    console.log("[STAGE3 STORE] setActiveIndex", {
      layer,
      index,
      safeIndex,
      total,
    });

    set({
      active: {
        ...state.active,
        [layer]: safeIndex,
      },
    });
  },

  /**
   * =====================================================
   * NEXT VARIANT (UNIFIED)
   * =====================================================
   */
  nextVariant: (layer) => {
    const state = get();
    const total = getTotal(state, layer);

    if (!total) return;

    const current = state.active[layer];
    const next = (current + 1) % total;

    set({
      active: {
        ...state.active,
        [layer]: next,
      },
    });
  },

  /**
   * =====================================================
   * PREVIOUS VARIANT (UNIFIED)
   * =====================================================
   */
  previousVariant: (layer) => {
    const state = get();
    const total = getTotal(state, layer);

    if (!total) return;

    const current = state.active[layer];
    const prev = (current - 1 + total) % total;

    set({
      active: {
        ...state.active,
        [layer]: prev,
      },
    });
  },
}));