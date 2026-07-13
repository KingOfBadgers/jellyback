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
  backgroundSource: "jellyfin",
}));
  }


  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {

    e.preventDefault();

    const file =
      e.dataTransfer.files?.[0];

    if (!file) return;


    if (!file.type.startsWith("image/")) {

      console.warn(
        "[STAGE2][SIDEBAR] Invalid file dropped"
      );

      return;
    }


    const url =
      URL.createObjectURL(file);


    console.log(
      "[STAGE2][SIDEBAR] Custom background loaded",
      {
        name: file.name,
        type: file.type,
        size: file.size,
      }
    );


    setStage2((p: any) => ({
  ...p,

  customBackground: {
    url,
    file,
    name: file.name,
  },

  backgroundSource: "custom",
}));
  }


  return (
  <div
    style={{
      width: "16rem",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRight: "1px solid rgba(255,255,255,0.1)",
      padding: "1rem",
    }}
  >

    {/* HEADER */}
    <div
      style={{
        flexShrink: 0,
        paddingBottom: "1rem",
      }}
    >
      <h2 className="text-sm font-semibold">
        Backdrops ({movieData?.backdrops?.length || 0})
      </h2>
    </div>


    {/* SCROLLING BACKDROPS */}
    <div
      style={{
        flex: 1,
        overflowY: "auto",
      }}
    >
      {(movieData?.backdrops || []).map(
        (_: any, i: number) => (
          <button
            key={i}
            onClick={() => selectBackdrop(i)}
            className={`
              w-full
              text-xs
              px-3
              py-2
              rounded
              border
              mb-2
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


    {/* BOTTOM CONTROLS */}
    <div
      style={{
        flexShrink: 0,
        paddingTop: "1rem",
      }}
    >

      <div
  onDragOver={(e) => {
    e.preventDefault();
  }}
  onDragEnter={(e) => {
    e.preventDefault();
  }}
  onDrop={handleDrop}
  className="
    border
    border-dashed
    border-white/20
    rounded
    p-4
    text-center
    text-xs
    text-white/60
    cursor-pointer
    transition-colors
    hover:border-white/50
  "
>
  Drop image here
</div>


      <button
        onClick={onSelect}
        className="
          w-full
          mt-4
          bg-blue-600
          text-white
          py-3
          rounded
          text-sm
        "
      >
        Select Background
      </button>

    </div>


  </div>
);
}
