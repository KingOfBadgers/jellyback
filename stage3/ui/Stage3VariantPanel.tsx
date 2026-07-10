"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";
import { resolveVariantEligibility } from "@/stage3/engine/variant/resolveVariantEligibility";
import { getTreatmentsForLayer } from "@/stage3/treatments/treatmentRegistry";
import { metadataRegistry } from "@/stage3/metadata/metadataRegistry";

/**
 * =========================================================
 * STAGE 3 — VARIANT + TREATMENT PANEL
 * =========================================================
 *
 * REVISED: 2026-06-24
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Updated for category-based treatment architecture.
 *
 * OLD:
 *
 *   layer → treatment
 *
 * NEW:
 *
 *   layer → category → treatment
 *
 * Example:
 *
 *   actors.edges = softEdges
 *   actors.depth = depthFloat
 *
 * FIXES
 * ---------------------------------------------------------
 * - Removed dead cycle treatment logic
 * - NONE now clears ALL categories
 * - Active highlighting corrected
 *
 * CHANGE: 2026-07-09
 * REASON:
 * Added canonical background treatment access.
 *
 * Background treatments are user-selected only.
 * The panel exposes registry options but does not
 * make composition decisions.
 *
 * =========================================================
 */


function VariantPanelCore({ seed }: any) {

  const selected = useCompositionStore(
    (s) => s.selected
  );

  const metadataBarStyle = useCompositionStore(
    (s) => s.metadataBarStyle
  );

  const setMetadataBarStyle =
    useCompositionStore(
      (s) => s.setMetadataBarStyle
    );

  const treatments = useCompositionStore(
    (s) => s.treatments
  );

  const selectVariant = useCompositionStore(
    (s) => s.selectVariant
  );

  const selectTreatment = useCompositionStore(
    (s) => s.selectTreatment
  );

  const selectedFrame = useCompositionStore(
    (s) => s.selected.frame
  );

  const selectFrame = useCompositionStore(
    (s) => s.selectFrame
  );


  const renderMetadataBarStyles = () => {

    return (
      <div
        style={{
          marginTop: 30,
          borderTop: "1px solid #333",
          paddingTop: 16,
        }}
      >

        <div
          style={{
            color: "#999",
            marginBottom: 16,
            fontSize: 11,
          }}
        >
          PACKAGING
        </div>


        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >

          {metadataRegistry.map((opt) => {

            const active =
              metadataBarStyle === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() =>
                  setMetadataBarStyle(
                    opt.id as any
                  )
                }
                style={{
                  padding: "6px 10px",
                  fontSize: 10,

                  background:
                    active
                      ? "#fff"
                      : "#222",

                  color:
                    active
                      ? "#000"
                      : "#fff",

                  border:
                    "1px solid #444",

                  cursor:
                    "pointer",
                }}
              >
                {opt.label}
              </button>
            );

          })}

        </div>

      </div>
    );
  };


  if (!seed) {

    console.log(
      "[STAGE3][PANEL] No seed provided"
    );

    return null;
  }


  const eligibility =
    resolveVariantEligibility(seed);


  console.log(
    "[STAGE3][PANEL ELIGIBILITY FULL OBJECT]",
    eligibility
  );


  /**
   * =====================================================
   * CLEAR ALL TREATMENTS FOR LAYER
   *
   * CHANGE: 2026-07-09
   * REASON:
   * Allow background treatment clearing.
   * =====================================================
   */

  function clearAllLayerTreatments(
    layer:
      | "actors"
      | "collage"
      | "logo"
      | "banner"
      | "background"
  ) {

    const layerTreatments =
      treatments[layer];


    Object.keys(
      layerTreatments || {}
    ).forEach((category) => {

      console.log(
        "[STAGE3][CLEAR TREATMENT]",
        {
          layer,
          category,
        }
      );


      selectTreatment(
        layer,
        category as any,
        null
      );

    });

  }



  /**
   * =====================================================
   * VARIANT RENDERER
   * =====================================================
   */

  const renderVariantGroup = (
    title: string,
    layer: keyof typeof eligibility
  ) => {

    const options =
      eligibility[layer];


    return (

      <div
        style={{
          marginBottom: 24,
          color: "white",
        }}
      >

        <div
          style={{
            marginBottom: 8,
            fontSize: 12,
            opacity: 0.8,
          }}
        >
          {title}
        </div>


        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >

          {options.map((opt) => {

            const active =
              selected[layer] === opt.id;


            return (

              <button
                key={opt.id}
                onClick={() => {

                  console.log(
                    "[STAGE3][SELECT VARIANT]",
                    {
                      layer,
                      id: opt.id,
                    }
                  );


                  selectVariant(
                    layer,
                    opt.id
                  );

                }}
                style={{
                  padding: "6px 10px",
                  fontSize: 10,

                  background:
                    active
                      ? "#fff"
                      : "#222",

                  color:
                    active
                      ? "#000"
                      : "#fff",

                  border:
                    "1px solid #444",

                  cursor:
                    "pointer",
                }}
              >
                {opt.displayName}
              </button>

            );

          })}


          <button
            onClick={() => {

              console.log(
                "[STAGE3][SELECT VARIANT] NONE",
                { layer }
              );


              selectVariant(
                layer,
                null
              );

            }}
            style={{
              padding: "6px 10px",
              fontSize: 10,

              background:
                selected[layer] === null
                  ? "#fff"
                  : "#222",

              color:
                selected[layer] === null
                  ? "#000"
                  : "#fff",

              border:
                "1px solid #444",

              cursor:
                "pointer",
            }}
          >
            NONE
          </button>

        </div>

      </div>

    );

  };

const renderFrameGroup = () => {

  return (

    <div
      style={{
        marginBottom:24,
        color:"white",
      }}
    >

      <div
        style={{
          marginBottom:8,
          fontSize:12,
          opacity:0.8,
        }}
      >
        FRAME
      </div>


      <div
        style={{
          display:"flex",
          gap:8,
          flexWrap:"wrap",
        }}
      >

        {eligibility.frames.map((frame) => {

  const active =
    selectedFrame === frame.id;

  return (

    <button
      key={frame.id}
      onClick={() => {
        console.log(
          "[STAGE3][SELECT FRAME]",
          { id: frame.id }
        );

        selectFrame(frame.id);
      }}

      style={{
        padding: "6px 10px",
        fontSize: 10,
        background: active ? "#fff" : "#222",
        color: active ? "#000" : "#fff",
        border: "1px solid #444",
        cursor: "pointer",
      }}
    >
      {frame.displayName}
    </button>

  );

})}


        <button
          onClick={()=>{

            console.log(
              "[STAGE3][CLEAR FRAME]"
            );

            selectFrame(null);

          }}

          style={{
            padding:"6px 10px",
            fontSize:10,

            background:
              selectedFrame === null
                ? "#fff"
                : "#222",

            color:
              selectedFrame === null
                ? "#000"
                : "#fff",

            border:
              "1px solid #444",

            cursor:"pointer",
          }}
        >
          NONE
        </button>


      </div>

    </div>

  );
};

  /**
   * =====================================================
   * TREATMENT RENDERER
   *
   * CHANGE: 2026-07-09
   * REASON:
   * Background treatments now use the same
   * registry-driven UI pipeline.
   * =====================================================
   */

  const renderTreatmentGroup = (
    title: string,
    layer:
      | "actors"
      | "collage"
      | "logo"
      | "banner"
      | "background"
  ) => {


    const options =
      getTreatmentsForLayer(
        layer
      );


    const noActiveTreatments =
      Object.values(
        treatments[layer] || {}
      ).every(
        (value) =>
          value === null
      );


    return (

      <div
        style={{
          marginBottom: 24,
          color: "white",
        }}
      >

        <div
          style={{
            marginBottom: 8,
            fontSize: 12,
            opacity: 0.8,
          }}
        >
          {title}
        </div>


        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >

          {options.map((opt) => {

            const active =
              treatments[layer]?.[opt.category] === opt.id;


            return (

              <button
                key={opt.id}
                onClick={() => {

                  console.log(
                    "[STAGE3][SELECT TREATMENT]",
                    {
                      layer,
                      category:
                        opt.category,
                      id:
                        opt.id,
                    }
                  );


                  selectTreatment(
                    layer,
                    opt.category,
                    opt.id
                  );

                }}
                style={{
                  padding: "6px 10px",
                  fontSize: 10,

                  background:
                    active
                      ? "#fff"
                      : "#222",

                  color:
                    active
                      ? "#000"
                      : "#fff",

                  border:
                    "1px solid #444",

                  cursor:
                    "pointer",
                }}
              >
                {opt.displayName}
              </button>

            );

          })}


          <button
            onClick={() => {

              console.log(
                "[STAGE3][CLEAR ALL TREATMENTS]",
                { layer }
              );


              clearAllLayerTreatments(
                layer
              );

            }}
            style={{
              padding: "6px 10px",
              fontSize: 10,

              background:
                noActiveTreatments
                  ? "#fff"
                  : "#222",

              color:
                noActiveTreatments
                  ? "#000"
                  : "#fff",

              border:
                "1px solid #444",

              cursor:
                "pointer",
            }}
          >
            NONE
          </button>

        </div>

      </div>

    );

  };



  return (

    <>

      <div
        style={{
          marginBottom: 30,
          borderBottom:
            "1px solid #333",
          paddingBottom: 16,
        }}
      >

        <div
          style={{
            color: "#999",
            marginBottom: 16,
            fontSize: 11,
          }}
        >
          VARIANTS
        </div>


        {renderVariantGroup(
          "ACTORS",
          "actors"
        )}

        {renderVariantGroup(
          "LOGO",
          "logo"
        )}

        {renderVariantGroup(
          "COLLAGE",
          "collage"
        )}

        {renderVariantGroup(
          "BANNER",
          "banner"
        )}

            </div>



      {/* ================= FRAMES ================= */}

      <div
        style={{
          marginBottom:30,
          borderBottom:
            "1px solid #333",
          paddingBottom:16,
        }}
      >

        <div
          style={{
            color:"#999",
            marginBottom:16,
            fontSize:11,
          }}
        >
          FRAMES
        </div>

        {renderFrameGroup()}
      </div>


      {/* ================= TREATMENTS ================= */}




      <div>

        <div
          style={{
            color: "#999",
            marginBottom: 16,
            fontSize: 11,
          }}
        >
          TREATMENTS
        </div>


        {renderTreatmentGroup(
          "BACKGROUND TREATMENT",
          "background"
        )}


        {renderTreatmentGroup(
          "ACTOR TREATMENT",
          "actors"
        )}


        {renderTreatmentGroup(
          "LOGO TREATMENT",
          "logo"
        )}


        {renderTreatmentGroup(
          "BANNER TREATMENT",
          "banner"
        )}


        {renderTreatmentGroup(
          "COLLAGE TREATMENT",
          "collage"
        )}

      </div>


      {renderMetadataBarStyles()}

    </>

  );

}



/**
 * =========================================================
 * WRAPPER
 * =========================================================
 */

export default function Stage3VariantPanel({
  seed,
}: any) {

  console.log(
    "[STAGE3][PANEL WRAPPER MOUNT]"
  );


  return (

    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,

        width: 320,

        padding: 12,

        background:
          "rgba(0,0,0,0.75)",

        border:
          "1px solid #333",

        zIndex: 9999,
      }}
    >

      <VariantPanelCore
        seed={seed}
      />

    </div>

  );

}