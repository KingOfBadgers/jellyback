"use client";


import { buildCompositionScene } from "@/stage3/compiler/buildCompositionScene";
import { useCompositionStore } from "@/stage3/store/compositionStore";



export default function SceneRenderer({ seed }: any) {




  /**
   * =====================================================
   * STORE STATE
   * =====================================================
   */

  const selected = useCompositionStore(
    (s) => s.selected
  );

  console.log("[STORE SELECTED]", selected);


  /**
   * =====================================================
   * USER CONTROLLED TREATMENTS
   * =====================================================
   */

  const treatments = useCompositionStore(
    (s) => s.treatments
  );


  if (!seed) {
    console.log("[SCENE RENDERER] No seed supplied");
    return null;
  }


  /**
   * =====================================================
   * BUILD SCENE
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

  /**
   * =====================================================
   * MAIN COMPOSITION RENDER ONLY
   * =====================================================
   *
   * IMPORTANT:
   * - SceneRenderer does NOT know about footer
   * - SceneRenderer does NOT attempt to locate footer nodes
   * - SceneRenderer ONLY renders composition nodes
   */

return (
  <div
    style={{
      width:1000,
      height:1350,
      position:"relative",
      overflow:"hidden",
      background:"black",
    }}
  >
      {scene.nodes.map((node) => {
        if (!node.visible) return null;

        console.log("[SCENE RENDERER][NODE]", {
          id: node.id,
          layer: node.layer,
          treatments: node.treatments ?? [],
          shape: node.presentation?.shape ?? null,
        });
console.log(node.style);
        return (
          <div
  key={node.id}
  className="stage3-node"
  data-layer={node.layer}
  data-shape={node.presentation?.shape ?? ""}
  data-frame={node.presentation?.frame ?? ""}
  data-edge={node.presentation?.edge ?? ""}
  data-shadow={node.presentation?.shadow ?? ""}
  data-rotation={node.presentation?.rotation ?? ""}
  data-texture={node.presentation?.texture ?? ""}
  data-stack={node.presentation?.stack ?? ""}
  data-treatments={(node.treatments ?? []).join(" ")}
  style={{
    position: node.style.position,
    top: node.style.top,
    left: node.style.left,
    right: node.style.right,
    bottom: node.style.bottom,
    width: node.style.width,
    height: node.style.height,
    transform: node.style.transform,
    transformOrigin: node.style.transformOrigin,
    zIndex: node.style.zIndex,
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
              }}
            />

            <div className="stage3-treatment-overlay" />
          </div>
        );
      })}
    </div>
 
  );
};