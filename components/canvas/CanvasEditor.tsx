"use client";

import { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Image,
  Rect,
  Group,
} from "react-konva";
import useImage from "use-image";

export default function CanvasEditor({
  movie,
}: {
  movie: any;
}) {
  // =========================
  // REF
  // =========================
  const stageRef = useRef<any>(null);

  // =========================
  // BACKDROP
  // =========================
  const [bgIndex, setBgIndex] = useState(0);

  const background =
    movie.backdrops?.[bgIndex] ||
    movie.poster;

  const [img] = useImage(background || "");

  console.log("BACKGROUND URL:", background);
  console.log("POSTER:", movie.poster);
  console.log("BACKDROPS:", movie.backdrops);
  console.log("BANNER:", movie.banner);
  console.log("LOGO:", movie.logo);
  // =========================
  // VIEW SCALE
  // =========================
  const [editorScale, setEditorScale] =
    useState(1);

  useEffect(() => {
    const update = () => {
      setEditorScale(
        Math.min(
          (window.innerWidth - 260) / 2200,
          (window.innerHeight - 80) / 1600
        )
      );
    };

    update();

    window.addEventListener(
      "resize",
      update
    );

    return () =>
      window.removeEventListener(
        "resize",
        update
      );
  }, []);

  // =========================
  // IMAGE STATE
  // =========================
  const [image, setImage] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  // =========================
  // FRAME
  // =========================
  const [frame, setFrame] = useState({
    x: 800,
    y: 300,
    width: 600,
    height: 900,
  });

  // =========================
  // FIT IMAGE
  // =========================
  function getFit() {
    if (!img) {
      return {
        width: 2600,
        height: 1460,
      };
    }

    const ratio =
      img.width / img.height;

    const width = 2600;
    const height = width / ratio;

    return { width, height };
  }

  const fitted = getFit();

  // =========================
  // INIT POSITION
  // =========================
  useEffect(() => {
    if (!img) return;

    setImage({
      x: (2200 - fitted.width) / 2,
      y: (1600 - fitted.height) / 2,
      scale: 1,
    });
  }, [bgIndex, img]);

  // =========================
  // ZOOM BACKDROP
  // =========================
  const onWheel = (e: any) => {
    e.evt.preventDefault();

    const zoom =
      e.evt.deltaY > 0
        ? 0.95
        : 1.05;

    setImage((prev) => ({
      ...prev,
      scale: Math.max(
        0.3,
        Math.min(5, prev.scale * zoom)
      ),
    }));
  };

  // =========================
  // BUILD DRAFT
  // =========================
  function buildDraft(movie: any) {
    return {
      movie: {
        ...movie,
      },

      editor: {
        image,
        frame,
        backgroundIndex: bgIndex,
      },

      assets: {
        poster:
          movie.poster || null,

        backdrops:
          movie.backdrops || [],

        banner:
          movie.banner || null,

        logo:
          movie.logo || null,
      },

      availability: {
        hasPoster:
          !!movie.poster,

        hasBackdrops:
          (movie.backdrops || [])
            .length > 0,

        hasBanner:
          !!movie.banner,

        hasLogo:
          !!movie.logo,
      },

      createdAt:
        Date.now(),
    };
  }

  // =========================
  // SELECT POSTER
  // =========================
  const handleSelect = () => {
    const draft =
      buildDraft(movie);

    sessionStorage.setItem(
      "poster_draft",
      JSON.stringify(draft)
    );

    window.location.href =
      `/poster/${movie.id}`;
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-56 border-r border-gray-700 p-4 overflow-y-auto">

        <h2 className="text-sm font-bold mb-4">
          Backgrounds
        </h2>

        <div className="space-y-2">
          {movie.backdrops?.map(
            (_: any, i: number) => (
              <button
                key={i}
                onClick={() =>
                  setBgIndex(i)
                }
                className={`w-full text-xs px-3 py-2 border rounded ${
                  i === bgIndex
                    ? "bg-white text-black"
                    : "border-gray-600"
                }`}
              >
                Backdrop {i + 1}
              </button>
            )
          )}
        </div>

        <button
          onClick={handleSelect}
          className="w-full mt-6 px-3 py-2 bg-blue-600 text-white text-xs rounded"
        >
          Select Poster
        </button>
      </div>

      {/* EDITOR */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">

        <div
          style={{
            transform: `scale(${editorScale})`,
            transformOrigin:
              "center",
          }}
        >
          <Stage
            ref={stageRef}
            width={2200}
            height={1600}
            onWheel={onWheel}
          >
            <Layer>

              {/* BACKDROP */}
              {img && (
                <Group
                  x={image.x}
                  y={image.y}
                  draggable
                  onDragMove={(
                    e
                  ) => {
                    setImage(
                      (
                        prev
                      ) => ({
                        ...prev,
                        x: e.target.x(),
                        y: e.target.y(),
                      })
                    );
                  }}
                >
                  <Image
                    image={img}
                    width={
                      fitted.width *
                      image.scale
                    }
                    height={
                      fitted.height *
                      image.scale
                    }
                  />

                  <Rect
                    width={
                      fitted.width *
                      image.scale
                    }
                    height={
                      fitted.height *
                      image.scale
                    }
                    stroke="red"
                    strokeWidth={3}
                  />
                </Group>
              )}

              {/* FRAME */}
              <Rect
                x={frame.x}
                y={frame.y}
                width={frame.width}
                height={frame.height}
                stroke="white"
                strokeWidth={3}
                dash={[10, 8]}
                draggable
                onDragMove={(e) => {
                  setFrame(
                    (
                      prev
                    ) => ({
                      ...prev,
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                  );
                }}
              />

            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}