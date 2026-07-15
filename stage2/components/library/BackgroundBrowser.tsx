"use client";

/**
 * =========================================================
 * STAGE 2 — BACKGROUND LIBRARY BROWSER
 * =========================================================
 *
 * RESPONSIBILITIES
 * ----------------
 * - Load background library assets
 * - Display themed gallery
 * - Support mixed aspect ratios
 * - Preview full resolution images
 * - Return selected background
 *
 * DOES NOT
 * --------
 * - Modify Stage 2 state
 * - Know about Jellyfin
 * - Create composition seeds
 *
 * =========================================================
 */

import { useEffect, useMemo, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";


import type {
  BackgroundLibraryResponse,
  BackgroundLibraryAsset,
} from "../../../components/types";



type Props = {
  onSelect: (
    image: BackgroundLibraryAsset
  ) => void;
};



export default function BackgroundBrowser({
  onSelect,
}: Props) {


  const [library, setLibrary] =
    useState<BackgroundLibraryResponse>({
      themes: [],
      images: [],
      total: 0,
    });



  const [activeTheme, setActiveTheme] =
    useState<string | null>(null);



  const [selected, setSelected] =
    useState<BackgroundLibraryAsset | null>(
      null
    );



  const [lightboxIndex, setLightboxIndex] =
    useState(-1);



  /**
   * Load library
   */
  useEffect(() => {

    fetch("/api/background-library")
      .then(res => res.json())
      .then(data => {

        setLibrary(data);

        if (data.themes?.length) {

          setActiveTheme(
            data.themes[0].id
          );

        }

      })
      .catch(err => {

        console.error(
          "[BACKGROUND LIBRARY]",
          err
        );

      });

  }, []);




  const visibleImages =
    useMemo(() => {

      if (!activeTheme) {
        return library.images;
      }


      return library.images.filter(
        image =>
          image.theme === activeTheme
      );


    }, [
      library.images,
      activeTheme
    ]);




  /**
   * Gallery thumbnails
   */
  const photos = visibleImages.map(image => ({
  src: image.thumbnail,
  width: image.width,
  height: image.height,
    }));




  /**
   * Lightbox full images
   */
  const slides =
    visibleImages.map(image => ({

      src:
        image.src,

      width:
        image.width ?? 2,

      height:
        image.height ?? 3,

    }));

  console.log(photos);



  return (

    <div
      className="
        flex
        h-full
        w-full
        bg-[#080808]
        text-white
      "
    >


      {/* THEMES */}

      <aside
        className="
          w-56
          shrink-0
          border-r
          border-white/10
          p-4
        "
      >

        <h2
          className="
            mb-5
            text-lg
            font-semibold
          "
        >
          Background Library
        </h2>


        <div
          className="
            space-y-1
          "
        >

          {library.themes.map(theme => (

            <button
              key={theme.id}

              onClick={() =>
                setActiveTheme(theme.id)
              }

              className={`
                flex
                w-full
                justify-between
                rounded
                px-3
                py-2
                text-left

                ${
                  activeTheme === theme.id
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                }
              `}
            >

              <span>
                {theme.name}
              </span>

              <span
                className="
                  opacity-50
                "
              >
                {theme.count}
              </span>

            </button>

          ))}

        </div>


      </aside>





      {/* GALLERY */}

      <main
  className="
    flex-1
    min-h-0
    overflow-y-auto
    p-6
  "
  style={{
    height: "calc(100vh - 40px)",
  }}
>


        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={120}
          rowConstraints={{singleRowMaxHeight: 180}}
          onClick={({ index }) => {
            const image = visibleImages[index];
            setSelected(image);
            setLightboxIndex(index);
          }}
        />
         



        <div
          className="
            fixed
            bottom-8
            right-8
            flex
            items-center
            gap-4
          "
        >

          {selected && (

            <div
              className="
                rounded
                bg-black/70
                px-4
                py-2
                text-sm
                text-white
                backdrop-blur
              "
            >
              Selected:
              <span className="ml-2 font-semibold">
                {selected.title}
              </span>
            </div>

          )}


          <button

            disabled={!selected}

            onClick={() => {

              if (!selected) return;

              onSelect(selected);

              onClose();

            }}

            className="
              rounded
              bg-white
              px-5
              py-3
              text-black
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >

            Select Background

          </button>


        </div>



      </main>





      {/* PREVIEW */}

      <Lightbox

        index={lightboxIndex}
        slides={slides}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        render={{button: ("button"),
        }}

      />

    </div>

  );

}