"use client";

/**
 * =========================================================
 * STAGE 2 — BACKGROUND SIDEBAR
 * =========================================================
 *
 * RESPONSIBILITIES
 * ----------------
 * - Display Jellyfin backdrops
 * - Allow backdrop selection
 * - Import custom backgrounds
 * - Display imported image information
 * - Launch Stage 2.5
 *
 * DOES NOT
 * --------
 * - Export images
 * - Save posters
 * - Navigate stages
 * - Perform cropping
 *
 * Stage 2 remains the orchestration layer.
 * =========================================================
 */

import React, { useRef } from "react";

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

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /**
   * =====================================================
   * Select Jellyfin Backdrop
   * =====================================================
   */

  function selectBackdrop(index: number) {

    console.log(
      "[STAGE2][SIDEBAR] Backdrop selected",
      index
    );

    setStage2((p: any) => ({
      ...p,
      bgIndex: index,
      backgroundSource: "jellyfin",
    }));
  }

  /**
   * =====================================================
   * Import Image
   *
   * Shared by:
   * - Drag & Drop
   * - File Picker
   * =====================================================
   */

  function importImage(file: File) {

    if (!file.type.startsWith("image/")) {

      console.warn(
        "[STAGE2] Unsupported file"
      );

      return;
    }

    const url =
      URL.createObjectURL(file);

    const img = new Image();

    img.onload = () => {

      const ratio =
        img.width / img.height;

      const isTwoByThree =
        Math.abs(
          ratio - (2 / 3)
        ) < 0.02;

      console.log(
        "[STAGE2][CUSTOM]",
        {
          name: file.name,
          width: img.width,
          height: img.height,
          ratio,
          isTwoByThree,
        }
      );

      setStage2((p: any) => ({

        ...p,

        customBackground: {

          file,

          url,

          name: file.name,

          type: file.type,

          width: img.width,

          height: img.height,

          aspectRatio: ratio,

          isTwoByThree,

        },

        backgroundSource: "custom",

      }));

    };

    img.src = url;
  }

  /**
   * =====================================================
   * Drag & Drop
   * =====================================================
   */

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {

    e.preventDefault();

    const file =
      e.dataTransfer.files?.[0];

    if (!file) return;

    importImage(file);

  }

  /**
   * =====================================================
   * File Picker
   * =====================================================
   */

  function handleBrowse(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0];

    if (!file) return;

    importImage(file);

  }

  function openBrowser() {

    fileInputRef.current?.click();

  }

  /**
   * =====================================================
   * Remove Custom Image
   * =====================================================
   */

  function clearCustomImage() {

    setStage2((p: any) => ({

      ...p,

      customBackground: null,

      backgroundSource: "jellyfin",

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

      {/* Header */}

      <div style={{ paddingBottom: "1rem" }}>

        <h2 className="text-sm font-semibold">
          Backdrops ({movieData?.backdrops?.length || 0})
        </h2>

      </div>

      {/* Jellyfin Backdrops */}

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
                mb-2
                ${
                  i === stage2.bgIndex &&
                  stage2.backgroundSource === "jellyfin"
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

      {/* Bottom */}

      <div
        style={{
          paddingTop: "1rem",
        }}
      >

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleBrowse}
        />

        <div

          onClick={openBrowser}

          onDragOver={(e) =>
            e.preventDefault()
          }

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
            hover:border-white/50
          "

        >

          {!stage2.customBackground ? (

            <>

              Drop image here

              <br />

              <span className="text-white/40">

                or click to browse

              </span>

            </>

          ) : (

            <>

              <div className="text-green-400">

                ✓ Custom Image

              </div>

              <div className="mt-2">

                {stage2.customBackground.name}

              </div>

              <div className="mt-1 text-white/40">

                {stage2.customBackground.width} × {stage2.customBackground.height}

              </div>

              <div className="mt-1 text-white/40">

                {stage2.customBackground.isTwoByThree
                  ? "Perfect 2:3"
                  : "Crop Required"}

              </div>

              <button

                className="mt-3 underline"

                onClick={(e) => {

                  e.stopPropagation();

                  clearCustomImage();

                }}

              >

                Clear Image

              </button>

            </>

          )}

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