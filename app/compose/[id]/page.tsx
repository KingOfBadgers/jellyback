"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useCompositionBorderStore } from "@/stage25/store/compositionBorderStore";

import { useCompositionStore } from "@/stage3/store/compositionStore";

import Renderer from "@/stage3/renderer/Renderer";


/**
 * =========================================================
 * JELLYBACK STAGE 3
 * COMPOSE PAGE
 * =========================================================
 *
 * CHANGE LOG
 * =========================================================
 *
 * 2026-06-11 10:00 BST
 *
 * Reason:
 * Introduce CompositionToolbar.
 *
 * Impact:
 * - No rendering changes
 * - No metadata changes
 * - No layout changes
 * - Enables actor variant selection
 *
 * Author:
 * ChatGPT
 *
 * =========================================================
 */

export default function ComposePage() {
  const { id } = useParams();

  const borderSeed =
    useCompositionBorderStore(
      (s) => s.seed
    );

  const setSeed =
    useCompositionStore(
      (s) => s.setSeed
    );

  const seed =
    useCompositionStore(
      (s) => s.seed
    );

  useEffect(() => {
    if (!id) return;

    if (
      seed?.movieId === id
    )
      return;

    if (
      borderSeed?.movieId ===
      id
    ) {
      console.log(
        "[STAGE3] Hydrating seed"
      );

      setSeed(borderSeed);
    }
  }, [
    id,
    borderSeed,
    seed,
    setSeed,
  ]);

  if (!seed) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading composition...
      </div>
    );
  }

  return (
    <>
      <Renderer seed={seed} />

      <CompositionToolbar />
    </>
  );
}