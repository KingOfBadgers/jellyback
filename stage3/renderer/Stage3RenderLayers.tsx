"use client";

import React, { useEffect, useRef } from "react";
import { applyBlueprint } from "./applyBlueprint";
import { resolveVariantBlueprints } from "@/stage3/variants/resolveVariantBlueprint";
import { useCompositionStore } from "@/stage3/store/compositionStore";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — LAYERED RENDER SHELL (FIXED BINDING)
 * =========================================================
 *
 * PURPOSE
 * -------
 * Now correctly reacts to USER SELECTIONS.
 *
 * FIX
 * ----
 * Previously:
 *   ❌ only seed-driven rendering
 *
 * Now:
 *   ✔ reacts to selected variants
 * =========================================================
 */

export default function Stage3RenderLayers() {
  const seed = useCompositionStore((s) => s.seed);
  const selected = useCompositionStore((s) => s.selected);

  const actorRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  /**
   * IMPORTANT:
   * Now blueprints are derived from USER STATE, not static seed
   */
  const blueprints = resolveVariantBlueprints(selected);

  useEffect(() => {
    applyBlueprint(actorRef.current, blueprints.actors);
  }, [blueprints.actors]);

  useEffect(() => {
    applyBlueprint(collageRef.current, blueprints.collage);
  }, [blueprints.collage]);

  useEffect(() => {
    applyBlueprint(logoRef.current, blueprints.logo);
  }, [blueprints.logo]);

  if (!seed) return null;

  return (
    <>
      <div
        ref={actorRef}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <div
        ref={collageRef}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <div
        ref={logoRef}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
    </>
  );
}