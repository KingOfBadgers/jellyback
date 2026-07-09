"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — BACKGROUND NODE BUILDER
 * =========================================================
 *
 * CHANGE: 2026-07-09
 *
 * PURPOSE:
 * ---------------------------------------------------------
 * Background nodes now receive user-selected treatments
 * from the Stage 3 treatment pipeline.
 *
 * IMPORTANT:
 * ---------------------------------------------------------
 * This builder does not interpret treatments.
 *
 * It only transports semantic identifiers into the scene.
 *
 * CSS remains responsible for visual behaviour.
 *
 * =========================================================
 */


export function buildBackgroundNode(
  backdrop: string | null,
  treatments: string[] = []
) {

  if (!backdrop) return null;


  return {

    id: "background",

    layer: "background",

    src: backdrop,

    visible: true,


    style: {
      position: "absolute" as const,

      top: "0px",

      left: "0px",

      width: "1000px",

      height: "1350px",

      opacity: 1,

      zIndex: 0,
    },


    /**
     * CHANGE: 2026-07-09
     *
     * Transport user-selected background
     * treatment identifiers into the scene graph.
     *
     * Renderer remains unaware of meaning.
     */
    treatments,

  };

}