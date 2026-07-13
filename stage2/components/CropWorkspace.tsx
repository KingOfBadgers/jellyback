"use client";

/**
 * =========================================================
 * STAGE 2 — CROP WORKSPACE
 * =========================================================
 *
 * RESPONSIBILITIES
 * ----------------
 * - Render the editor workspace
 * - Display extended background preview
 * - Render the canonical poster-crop area
 * - Handle visual positioning
 *
 * DOES NOT
 * --------
 * - Export images
 * - Save images
 * - Create seeds
 * - Navigate stages
 * - Load Jellyfin data
 *
 * The poster-crop element remains the export boundary.
 * =========================================================
 */

import React from "react";



interface CropWorkspaceProps {
  background: string;

  stage2: any;

  setStage2: React.Dispatch<
    React.SetStateAction<any>
  >;

  startPan: (e: any) => void;
  onPan: (e: any) => void;
  stopPan: () => void;
  onWheel: (e: any) => void;

  DISPLAY_SCALE: number;
  VIEW_W: number;
  VIEW_H: number;
}


export default function CropWorkspace({
  background,
  stage2,
  startPan,
  onPan,
  stopPan,
  onWheel,
  DISPLAY_SCALE,
  VIEW_W,
  VIEW_H,
}: CropWorkspaceProps) {


  console.log(
    "[STAGE2][WORKSPACE] Render",
    {
      hasBackground: !!background,
      scale: stage2?.scale || 1,
    }
  );


  return (
    <div
      className="
        flex-1
        flex
        items-center
        justify-center
        bg-[#080808]
        overflow-hidden
      "
    >

      {/* =====================================================
          EXTENDED EDITING AREA

          Allows the user to see the artwork surrounding
          the final 2:3 crop window.

          This is editor-only.
          ===================================================== */}

      <div
        className="relative"
        style={{
          width: VIEW_W + 240,
          height: VIEW_H + 240,
        }}
      >


        {/* ===================================================
            BACKGROUND PREVIEW

            Not exported.
            Exists only to improve authoring experience.
        =================================================== */}

        {background && (

          <img
            src={background}
            draggable={false}

            style={{
              position: "absolute",

              left:
                120 +
                (stage2.x || 0) *
                DISPLAY_SCALE,

              top:
                120 +
                (stage2.y || 0) *
                DISPLAY_SCALE,

              transform:
                `scale(${stage2.scale || 1})`,

              transformOrigin:
                "top left",

              maxWidth:
                "none",

              opacity:
                1.00,
border: "5px solid red",
            
                zIndex: 1,

              userSelect:
                "none",

              pointerEvents:
                "none",
            }}
          />

        )}



        {/* ===================================================
            CANONICAL EXPORT SURFACE

            IMPORTANT:
            The ID poster-crop must remain unchanged.

            exportPosterToPNG depends on this boundary.
        =================================================== */}

        <div
          style={{
            position:
              "absolute",

            left:
              120,

            top:
              120,
          }}
        >


          <div
            id="poster-crop"

            className="
              relative
              border
              border-white/60
              overflow-hidden
              bg-black
            "

            style={{
              width:
                VIEW_W,

              height:
                VIEW_H,

              cursor:
                "grab",
            }}

            onMouseDown={
              startPan
            }

            onMouseMove={
              onPan
            }

            onMouseUp={
              stopPan
            }

            onMouseLeave={
              stopPan
            }

            onWheel={
              onWheel
            }
          >

            {background && (

              <img
                src={background}

                draggable={false}

                style={{
                  position:
                    "absolute",

                  left:
                    (stage2.x || 0) *
                    DISPLAY_SCALE,

                  top:
                    (stage2.y || 0) *
                    DISPLAY_SCALE,

                  transform:
                    `scale(${stage2.scale || 1})`,

                  transformOrigin:
                    "top left",

                  maxWidth:
                    "none",

                  userSelect:
                    "none",

                  pointerEvents:
                    "none",
                }}
              />

            )}

          </div>

        </div>


      </div>

    </div>
  );
}