"use client";

import { create } from "zustand";

/**
 * =========================================================
 * COMPOSITION BORDER STORE (Stage 2 → Stage 2.5)
 * =========================================================
 *
 * This store is the ONLY bridge between:
 *
 *   Stage 2 (background selection + crop)
 *   Stage 2.5 (composition builder)
 *
 * RULES:
 * - MUST NOT contain UI logic
 * - MUST NOT fetch Jellyfin
 * - MUST NOT mutate after Stage 2.5 starts rendering
 * - MUST act as a frozen "seed container"
 *
 * Everything inside this store is the "JellyBack seed"
 * =========================================================
 */

export type BorderSeed = {
  movieId: string;

  // =========================
  // CORE METADATA (NORMALISED)
  // =========================
  title: string | null;
  originalTitle: string | null;
  overview: string | null;
  year: number | null;

  runtimeMinutes: number | null;

  ratings: {
    mpaa: string | null;
    bbfc: string | null;
  };

  media: {
    resolution: string | null;
    subtitles: boolean;
  };

  // =========================
  // ASSETS
  // =========================
  assets: {
    poster: string | null;
    backdrops: string[];

    logo: string | null;
    banner: string | null;
    clearart: string | null;

    actors: string[];
  };

  // =========================
  // META ICONS (MPAA, BBFC, etc)
  // =========================
  metaAssets: Array<{
    type: string;
    src: string;
  }>;

  // =========================
  // STATE FLAGS
  // =========================
  readiness: {
    hasBackground: boolean;
    hasPosterCrop: boolean;
    hasEnoughAssets: boolean;
  };

  // =========================
  // INTERNAL DEBUG
  // =========================
  _debug: {
    traceId: string;
    jellyfinRawId: string;
    ingestTimestamp: number;
  };
};

export type CompositionBorderState = {
  seed: BorderSeed | null;

  hydrated: boolean;

  setSeed: (seed: BorderSeed) => void;

  updateSeed: (partial: Partial<BorderSeed>) => void;

  clearSeed: () => void;

  markHydrated: () => void;
};

export const useCompositionBorderStore =
  create<CompositionBorderState>((set, get) => ({
    seed: null,
    hydrated: false,

    /**
     * =========================================================
     * SET FULL SEED (PRIMARY ENTRY POINT)
     * =========================================================
     */
    setSeed: (seed) => {
      const traceId =
        seed?._debug?.traceId ??
        crypto?.randomUUID?.() ??
        Math.random().toString(36);

      console.log("[BORDER STORE] setSeed START", {
        traceId,
        movieId: seed.movieId,
      });

      set({
        seed,
        hydrated: true,
      });

      console.log("[BORDER STORE] setSeed COMPLETE", {
        traceId,
        hasAssets: !!seed?.assets,
        metaAssetsCount: seed?.metaAssets?.length ?? 0,
      });
    },

    /**
     * =========================================================
     * PATCH SEED (SAFE UPDATES ONLY)
     * =========================================================
     */
    updateSeed: (partial) => {
      const current = get().seed;

      if (!current) {
        console.warn("[BORDER STORE] updateSeed ignored - no seed");
        return;
      }

      const traceId = current._debug.traceId;

      console.log("[BORDER STORE] updateSeed", {
        traceId,
        partialKeys: Object.keys(partial),
      });

      set({
        seed: {
          ...current,
          ...partial,
        },
      });

      console.log("[BORDER STORE] updateSeed COMPLETE", {
        traceId,
      });
    },

    /**
     * =========================================================
     * CLEAR (RESET PIPELINE)
     * =========================================================
     */
    clearSeed: () => {
      console.log("[BORDER STORE] clearSeed");

      set({
        seed: null,
        hydrated: false,
      });
    },

    /**
     * =========================================================
     * MARK READY FOR STAGE 2.5
     * =========================================================
     */
    markHydrated: () => {
      const seed = get().seed;

      console.log("[BORDER STORE] markHydrated", {
        movieId: seed?.movieId,
      });

      set({
        hydrated: true,
      });
    },
  }));