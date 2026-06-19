"use client";

import React, { useEffect, useRef } from "react";
import { applyBlueprint } from "./applyBlueprint";
import { resolveVariantBlueprints } from "@/stage3/variants/resolveVariantBlueprint";
import { useCompositionStore } from "@/stage3/store/compositionStore";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — LAYERED RENDER SHELL
 * =========================================================
 *
 * PURPOSE
 * -------
 * Connects:
 *   store selection → variant resolver → DOM application
 *
 * RULES
 * -----
 * - NO layout decisions
 * - NO computation of variants
 * - ONLY binding resolved blueprints to DOM nodes
 * =========================================================
 */

export default function Stage3RenderLayers() {
  const seed = useCompositionStore((s) => s.seed);
  const selected = useCompositionStore((s) => s.selected);

  const actorRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const blueprints = resolveVariantBlueprints(selected);

  /**
   * Apply actor blueprint
   */
  useEffect(() => {
    applyBlueprint(actorRef.current, blueprints.actors);
  }, [blueprints.actors]);

  /**
   * Apply collage blueprint
   */
  useEffect(() => {
    applyBlueprint(collageRef.current, blueprints.collage);
  }, [blueprints.collage]);

  /**
   * Apply logo blueprint
   */
  useEffect(() => {
    applyBlueprint(logoRef.current, blueprints.logo);
  }, [blueprints.logo]);

  if (!seed) return null;

  return (
    <>
      {/* ACTOR LAYER */}
      <div
        ref={actorRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />

      {/* COLLAGE LAYER */}
      <div
        ref={collageRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />

      {/* LOGO LAYER */}
      <div
        ref={logoRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
}