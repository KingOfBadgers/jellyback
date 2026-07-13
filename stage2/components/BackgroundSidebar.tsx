"use client";

/**
 * =========================================================
 * STAGE 2 — BACKGROUND SIDEBAR
 * =========================================================
 *
 * RESPONSIBILITIES
 * ----------------
 * - Display available Jellyfin backdrops
 * - Allow backdrop selection
 * - Provide placeholder area for custom backgrounds
 * - Provide Stage 2 action button
 *
 * DOES NOT
 * --------
 * - Load Jellyfin data
 * - Export images
 * - Save posters
 * - Navigate stages
 * - Perform image manipulation
 *
 * Stage 2 page remains the orchestration layer.
 * =========================================================
 */

import React from "react";

interface BackgroundSidebarProps {
  movieData: any;
  stage2: any;
  setStage2: React.Dispatch<React.SetStateAction<any>>;
  onSelect: () => void;
}

export default function BackgroundSidebar({
  movieData,
  stage2,
  setStage2,
  onSelect,
}: BackgroundSidebarProps) {

  /**
   * =======================================================
   * BACKDROP SELECTION
   * =======================================================
   *
   * Only updates Stage 2 UI state.
   *
   * No export or pipeline activity occurs here.
   * =======================================================
   */
  function selectBackdrop(index: number) {

    console.log(
      "[STAGE2][SIDEBAR] Backdrop selected",
      {
        index,
        total:
          movieData?.backdrops?.length ?? 0,
      }
    );

    setStage2((p: any) => ({
      ...p,
      bgIndex: index,
    }));
  }


  return (
    <div
      className="
        w-72
        border-r
        border-white/10
        p-4
        flex
        flex-col
        h-full
        overflow-hidden
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          shrink-0
          mb-3
        "
      >
        <h2 className="text-sm font-semibold">
          Backdrops (
          {movieData?.backdrops?.length || 0}
          )
        </h2>
      </div>


      {/* =================================================
          BACKDROP LIST

          Scrolls independently.
          Designed to support large Jellyfin libraries.
      ================================================= */}

      <div
        className="
          h-[65%]
          overflow-y-auto
          space-y-2
          pr-1
        "
      >

        {(movieData?.backdrops || []).map(
          (_: any, i: number) => (

            <button
              key={i}
              onClick={() =>
                selectBackdrop(i)
              }
              className={`
                w-full
                text-xs
                px-3
                py-2
                rounded
                border
                ${
                  i === stage2.bgIndex
                    ? "bg-white text-black"
                    : "border-white/20"
                }
              `}
            >
              Backdrop {i + 1}
            </button>

          )
        )}

      </div>


      {/* =================================================
          CUSTOM BACKGROUND AREA

          Placeholder only.
          Upload functionality comes later.
      ================================================= */}

      <div
        className="
          h-[20%]
          shrink-0
          mt-4
          pt-4
          border-t
          border-white/10
        "
      >

        <h3 className="text-xs mb-2">
          Custom Background
        </h3>


        <div
          className="
            border
            border-dashed
            border-white/20
            rounded
            p-4
            text-center
            text-xs
            text-white/60
          "
        >
          Drop image here
        </div>

      </div>


      {/* =================================================
          ACTIONS
      ================================================= */}

      <div
        className="
          shrink-0
          mt-4
          pt-4
          border-t
          border-white/10
        "
      >

        <button
          onClick={() => {
            console.log(
              "[STAGE2][SIDEBAR] Select Background clicked"
            );

            onSelect();
          }}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-500
            text-white
            text-sm
            py-3
            rounded
          "
        >
          Select Background
        </button>

      </div>


    </div>
  );
}