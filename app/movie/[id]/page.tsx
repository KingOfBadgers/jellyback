"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function MoviePage() {
  const params = useParams();
  const id = params?.id as string;

  // =========================
  // STATE
  // =========================
  const [movie, setMovie] = useState<any>(null);
  const [bgIndex, setBgIndex] = useState(0);

  const [imageState, setImageState] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  const panRef = useRef(false);

  const lastMouse = useRef({
    x: 0,
    y: 0,
  });

  // =========================
  // LOGICAL EXPORT SIZE
  // (DO NOT CHANGE)
  // =========================
  const CAPTURE_WIDTH = 1000;
  const CAPTURE_HEIGHT = 1500;

  // =========================
  // VISUAL SCALE
  // makes selector sane on screen
  // =========================
  const DISPLAY_SCALE = 0.45;

  const VIEW_W =
    CAPTURE_WIDTH *
    DISPLAY_SCALE;

  const VIEW_H =
    CAPTURE_HEIGHT *
    DISPLAY_SCALE;

  // =========================
  // LOAD MOVIE
  // =========================
  useEffect(() => {
    if (!id) return;

    async function loadMovie() {
      try {
        const res =
          await fetch(
            "/api/jellyfin/movies"
          );

        const movies =
          await res.json();

        const found =
          movies.find(
            (m: any) =>
              String(m.id) ===
              String(id)
          );

        setMovie(found || null);
      } catch (err) {
        console.error(
          "Failed loading movie",
          err
        );
      }
    }

    loadMovie();
  }, [id]);

  // =========================
  // BACKGROUND
  // =========================
  const background =
    movie?.backdrops?.[
      bgIndex
    ] || movie?.poster;

  // =========================
  // PAN
  // =========================
  function startPan(e: any) {
    panRef.current = true;

    lastMouse.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  function onPan(e: any) {
    if (!panRef.current)
      return;

    const dx =
      e.clientX -
      lastMouse.current.x;

    const dy =
      e.clientY -
      lastMouse.current.y;

    lastMouse.current = {
      x: e.clientX,
      y: e.clientY,
    };

    // divide by display scale
    // so drag feels correct
    setImageState((prev) => ({
      ...prev,
      x:
        prev.x +
        dx /
          DISPLAY_SCALE,
      y:
        prev.y +
        dy /
          DISPLAY_SCALE,
    }));
  }

  function stopPan() {
    panRef.current =
      false;
  }

  // =========================
  // ZOOM
  // =========================
  function onWheel(
    e: any
  ) {
    e.preventDefault();

    const factor =
      e.deltaY > 0
        ? 0.95
        : 1.05;

    setImageState(
      (prev) => ({
        ...prev,
        scale:
          Math.max(
            0.3,
            Math.min(
              4,
              prev.scale *
                factor
            )
          ),
      })
    );
  }

  // =========================
  // SAVE DRAFT
  // =========================
  async function handleSelect() {
    if (
      !movie ||
      !background
    )
      return;

    const draft = {
      movie,
      background,

      image: {
        x:
          imageState.x,
        y:
          imageState.y,
        scale:
          imageState.scale,
      },

      frame: {
        width:
          CAPTURE_WIDTH,
        height:
          CAPTURE_HEIGHT,
      },

      createdAt:
        Date.now(),
    };

    sessionStorage.setItem(
      "poster_draft",
      JSON.stringify(
        draft
      )
    );

    await new Promise(
      (r) =>
        setTimeout(
          r,
          50
        )
    );

    window.location.href =
      `/poster/${movie.id}`;
  }

  // =========================
  // LOADING
  // =========================
  if (!movie) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading movie...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/10 p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-4">
          Backdrops
        </h2>

        {(movie
          ?.backdrops ||
          []
        ).length ===
        0 ? (
          <div className="text-xs text-white/50 mb-4">
            No backdrops
            found
            <br />
            using poster
            fallback
          </div>
        ) : (
          <div className="space-y-2">
            {movie.backdrops.map(
              (
                _: any,
                i: number
              ) => (
                <button
                  key={i}
                  onClick={() =>
                    setBgIndex(
                      i
                    )
                  }
                  className={`w-full text-xs px-3 py-2 rounded border ${
                    i ===
                    bgIndex
                      ? "bg-white text-black border-white"
                      : "border-white/20"
                  }`}
                >
                  Backdrop{" "}
                  {i + 1}
                </button>
              )
            )}
          </div>
        )}

        <button
          onClick={
            handleSelect
          }
          className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white text-sm py-3 rounded"
        >
          Select Background
        </button>
      </div>

      {/* WORKSPACE */}
      <div className="flex-1 flex items-center justify-center overflow-hidden bg-[#080808]">

        {/* CROP WINDOW */}
        <div
          className="relative border-2 border-white/80 overflow-hidden bg-black"
          style={{
            width: VIEW_W,
            height: VIEW_H,
            cursor: "grab",
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
          {/* BACKGROUND */}
          {background && (
            <img
              src={
                background
              }
              draggable={
                false
              }
              alt=""
              style={{
                position:
                  "absolute",

                left:
                  imageState.x *
                  DISPLAY_SCALE,

                top:
                  imageState.y *
                  DISPLAY_SCALE,

                transform: `scale(${
                  imageState.scale *
                  DISPLAY_SCALE
                })`,

                transformOrigin:
                  "top left",

                maxWidth:
                  "none",

                pointerEvents:
                  "none",

                userSelect:
                  "none",
              }}
            />
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* LABEL */}
          <div className="absolute top-2 left-2 text-[10px] text-white/60 pointer-events-none">
            1000 × 1500 poster crop
          </div>
        </div>
      </div>
    </div>
  );
}