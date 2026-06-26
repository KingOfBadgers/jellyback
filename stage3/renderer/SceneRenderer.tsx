"use client";

import React from "react";
import { buildCompositionScene } from "@/stage3/compiler/buildCompositionScene";
import { useCompositionStore } from "@/stage3/store/compositionStore";

/**
 * =========================================================
 * SCENE RENDERER (DUMB LAYER)
 * =========================================================
 * DATE: 2026-06-22
 *
 * CHANGE: 2026-06-23 | 08:05
 * ---------------------------------------------------------
 * Updated renderer for user-controlled treatment architecture
 *
 * REASON:
 * ---------------------------------------------------------
 * JELLYBACK LAW 1
 *
 * Stage 3 must NEVER build intelligence.
 *
 * Previous renderer used old compiler signature:
 *
 * buildCompositionScene(seed, selected)
 *
 * Compiler now requires explicit treatment state:
 *
 * buildCompositionScene(seed, selected, treatments)
 *
 * Renderer remains dumb transport layer only.
 *
 * NO rendering intelligence added.
 * NO automatic treatment inference permitted.
 * =========================================================
 */

export default function SceneRenderer({ seed }: any) {
  /**
   * =====================================================
   * STORE STATE
   * =====================================================
   */

  const selected = useCompositionStore(
    (s) => s.selected
  );

  /**
   * =====================================================
   * NEW — USER CONTROLLED TREATMENTS
   * =====================================================
   *
   * DATE: 2026-06-23
   *
   * Treatments now come explicitly from store.
   * Renderer does NOT decide treatment logic.
   * =====================================================
   */

  const treatments = useCompositionStore(
    (s) => s.treatments
  );

  if (!seed) {
    console.log(
      "[SCENE RENDERER] No seed supplied"
    );
    return null;
  }

  /**
   * =====================================================
   * BUILD SCENE
   * =====================================================
   *
   * Updated compiler signature.
   * =====================================================
   */

  const scene = buildCompositionScene(
    seed,
    selected,
    treatments
  );

  console.log(
    "[SCENE RENDERER][SCENE]",
    JSON.stringify(scene, null, 2)
  );

  console.log(
    "[SCENE RENDERER][ACTIVE TREATMENTS]",
    treatments
  );

  return (
    <div
      style={{
        width: 1000,
        height: 1400,
        position: "relative",
        overflow: "hidden",
        background: "black",
      }}
    >
      {scene.nodes.map((node) => {
        if (!node.visible) return null;

        console.log(
          "[SCENE RENDERER][NODE]",
          {
            id: node.id,
            layer: node.layer,

            /**
             * Treatment trace logging
             */

            treatments:
              node.treatments ?? [],
          }
        );

        return (
          <div
            key={node.id}
            className="stage3-node"

            /**
             * Layer semantic identifier
             */

            data-layer={node.layer}

            /**
             * Treatment semantic identifier
             *
             * CSS engine can target these.
             */

            data-treatments={(
              node.treatments ?? []
            ).join(" ")}

            style={{
              position:
                node.style.position,

              top: node.style.top,
              left: node.style.left,
              right: node.style.right,
              bottom: node.style.bottom,

              width: node.style.width,
              height: node.style.height,

              transform:
                node.style.transform,

              zIndex:
                node.style.zIndex,
            }}
          >
            <img
              src={node.src}
              className="stage3-image"
              style={{
                width: "100%",
                height: "100%",

                objectFit: "cover",

                opacity: 1,

                /**
                 * Renderer never applies treatment.
                 * Treatment engine owns this.
                 */

                
              }}
            />

            {/**
             * Treatment overlay layer
             *
             * CSS engine may attach blend/effects here.
             */}

            <div className="stage3-treatment-overlay" />
          </div>
        );
      })}
    </div>
  );
}