"use client";

import React from "react";
import { buildCompositionScene } from "@/stage3/compiler/buildCompositionScene";
import { useCompositionStore } from "@/stage3/store/compositionStore";

/**
 * =========================================================
 * SCENE RENDERER (DUMB LAYER)
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 * ONLY renders a precomputed scene graph.
 *
 * NO logic allowed here.
 *
 * DATE: 2026-06-20
 * =========================================================
 */

export default function SceneRenderer({ seed }: any) {
  const selected = useCompositionStore((s) => s.selected);

  if (!seed) return null;

  const scene = buildCompositionScene(seed, selected);
console.log(
  "[SCENE RENDERER][NODES]",
  JSON.stringify(scene, null, 2)
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

console.log("[SCENE RENDERER][NODE]", {
  id: node.id,
  layer: node.layer,
  src: node.src,
  visible: node.visible,
});
console.log("[STAGE3][SCENE RENDERER MOUNT]")
console.log("[PIPELINE] SceneRenderer ACTIVE");
        return (
          
          <img
            key={node.id}
            src={node.src}
            style={{
              position: node.style.position,
              top: node.style.top,
              left: node.style.left,
              bottom: node.style.bottom,
              width: node.style.width,
              height: node.style.height,
              transform: node.style.transform,
              opacity: node.style.opacity,
              zIndex: node.style.zIndex,
            }}
          />
        );
      })}
    </div>
  );
}