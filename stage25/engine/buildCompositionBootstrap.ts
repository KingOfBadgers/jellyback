import { Stage2Output } from "@/stage2/types/background"
import { Composition } from "@/stage3/types/composition"

export function buildCompositionBootstrap(input: Stage2Output) {
  console.log("[BRIDGE] Building Stage 2 → Stage 2.5 payload:", input)

  // =========================
  // 1. NORMALISE BACKGROUND
  // =========================
  const background = {
    src: input.background.src,
    aspect: "2:3",
    locked: true,
    source: input.background.source
  }

  // =========================
  // 2. CREATE BASE COMPOSITION SHELL
  // =========================
  const baseComposition: Composition = {
    schemaVersion: 1,

    movieId: input.movieId,

    template: "dvdPremium", // default safe fallback

    background,

    framedAssets: [],

    metadataBar: {
      preset: "dvdStrip",
      barcode: null
    },

    style: {
      vignette: 0,
      softEdgeFade: 0,
      contrast: 0,
      brightness: 0
    }
  }

  // =========================
  // 3. INITIAL SLOT SEEDING (EMPTY STATE)
  // =========================
  const initialComposition = {
    ...baseComposition,

    // explicitly reserved for Stage 2.5 mutation
    framedAssets: [],
  }

  console.log("[BRIDGE] Bootstrap composition created:", initialComposition)

  return {
    schemaVersion: 1,
    movieId: input.movieId,
    background,
    initialComposition
  }
}