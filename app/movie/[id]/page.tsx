"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useImage from "use-image";

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [movie, setMovie] = useState<any>(null);
  const [bgIndex, setBgIndex] = useState(0);

  // =========================
  // BACKDROP TRANSFORM
  // =========================
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  const [dragging, setDragging] =
    useState(false);

  const [lastMouse, setLastMouse] =
    useState({
      x: 0,
      y: 0,
    });

  // =========================
  // WORKSPACE
  // =========================
  const workspace = {
    width: 1200,
    height: 760,
  };

  // =========================
  // POSTER CAPTURE (2:3)
  // smaller + centered
  // =========================
  const frame = {
    width: 320,
    height: 480,
    x: 440,
    y: 140,
  };

  // =========================
  // LOAD MOVIE
  // =========================
  useEffect(() => {
    async function loadMovie() {
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
    }

    if (id) {
      loadMovie();
    }
  }, [id]);

  // =========================
  // BACKGROUND
  // =========================
  const background =
    movie?.backdrops?.[bgIndex] ||
    movie?.poster ||
    null;

  const [img] = useImage(
    background || ""
  );

  // =========================
  // INITIAL FIT
  // backdrop fits inside
  // workspace naturally
  // =========================
  useEffect(() => {
    if (!img) return;

    const maxWidth =
      workspace.width * 0.92;

    const maxHeight =
      workspace.height * 0.92;

    const widthScale =
      maxWidth / img.width;

    const heightScale =
      maxHeight / img.height;

    const initialScale =
      Math.min(
        widthScale,
        heightScale
      );

    const renderedWidth =
      img.width *
      initialScale;

    const renderedHeight =
      img.height *
      initialScale;

    setCrop({
      x:
        (workspace.width -
          renderedWidth) /
        2,

      y:
        (workspace.height -
          renderedHeight) /
        2,

      scale:
        initialScale,
    });
  }, [img, background]);

  // =========================
  // DRAG
  // =========================
  function onMouseDown(
    e: any
  ) {
    setDragging(true);

    setLastMouse({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function onMouseMove(
    e: any
  ) {
    if (!dragging) return;

    const dx =
      e.clientX -
      lastMouse.x;

    const dy =
      e.clientY -
      lastMouse.y;

    setLastMouse({
      x: e.clientX,
      y: e.clientY,
    });

    setCrop((prev) => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  }

  function stopDrag() {
    setDragging(false);
  }

  // =========================
  // ZOOM
  // =========================
  function onWheel(
    e: any
  ) {
    e.preventDefault();

    const zoom =
      e.deltaY > 0
        ? 0.95
        : 1.05;

    setCrop((prev) => ({
      ...prev,
      scale: Math.max(
        0.15,
        Math.min(
          5,
          prev.scale *
            zoom
        )
      ),
    }));
  }

  // =========================
  // SAVE
  // =========================
  function handleSelect() {
    if (
      !movie ||
      !background
    )
      return;

    sessionStorage.setItem(
      "poster_draft",
      JSON.stringify({
        movieId:
          movie.id,
        background,
        crop,
        frame,
      })
    );

    router.push(
      `/poster/${movie.id}`
    );
  }

  // =========================
  // LOADING
  // =========================
  if (!movie) {
    return (
      <div className="h-screen bg-[#050505] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="h-screen flex bg-[#050505] text-white overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-56 border-r border-white/10 p-4">
        <h2 className="text-sm mb-4">
          Backgrounds
        </h2>

        <div className="space-y-2">
          {movie.backdrops?.map(
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
                className={`w-full rounded-lg border px-3 py-2 text-xs ${
                  bgIndex ===
                  i
                    ? "bg-white text-black"
                    : "border-white/10 bg-white/5"
                }`}
              >
                Backdrop{" "}
                {i + 1}
              </button>
            )
          )}
        </div>

        <button
          onClick={
            handleSelect
          }
          className="mt-6 w-full rounded-lg bg-blue-600 px-3 py-2 text-xs"
        >
          Select Background
        </button>
      </div>

      {/* WORKSPACE */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          className="relative rounded-xl border border-white/10 bg-black overflow-hidden"
          style={{
            width:
              workspace.width,
            height:
              workspace.height,
          }}
          onMouseDown={
            onMouseDown
          }
          onMouseMove={
            onMouseMove
          }
          onMouseUp={
            stopDrag
          }
          onMouseLeave={
            stopDrag
          }
          onWheel={
            onWheel
          }
        >
          {/* BACKDROP */}
          {img && (
            <img
              src={
                background
              }
              draggable={
                false
              }
              style={{
                position:
                  "absolute",

                left:
                  crop.x,

                top:
                  crop.y,

                width:
                  img.width *
                  crop.scale,

                height:
                  img.height *
                  crop.scale,

                maxWidth:
                  "none",

                pointerEvents:
                  "none",

                userSelect:
                  "none",
              }}
            />
          )}

          {/* POSTER GUIDE */}
          <div
            className="absolute border-2 border-dashed border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.58)] pointer-events-none rounded-lg"
            style={{
              left:
                frame.x,
              top:
                frame.y,
              width:
                frame.width,
              height:
                frame.height,
            }}
          />
        </div>
      </div>
    </div>
  );
}