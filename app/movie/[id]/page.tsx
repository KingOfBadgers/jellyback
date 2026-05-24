"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { exportPosterToPNG } from "@/lib/exportPosterToPNG";

export default function MoviePage() {
  const params = useParams();
  const id = params?.id as string;

  const [movie, setMovie] = useState<any>(null);
  const [bgIndex, setBgIndex] = useState(0);

  const [imageState, setImageState] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  const panRef = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const CAPTURE_WIDTH = 1000;
  const CAPTURE_HEIGHT = 1500;

  const DISPLAY_SCALE = 0.45;
  const EXPORT_SCALE = 1 / DISPLAY_SCALE;

  const VIEW_W = CAPTURE_WIDTH * DISPLAY_SCALE;
  const VIEW_H = CAPTURE_HEIGHT * DISPLAY_SCALE;

  // =========================
  // LOAD MOVIE
  // =========================
  useEffect(() => {
    if (!id) return;

    async function loadMovie() {
      const res = await fetch("/api/jellyfin/movies");
      const movies = await res.json();

      const found = movies.find(
        (m: any) => String(m.id) === String(id)
      );

      setMovie(found || null);
    }

    loadMovie();
  }, [id]);

  const background =
    movie?.backdrops?.[bgIndex] || movie?.poster;

  // =========================
  // PAN
  // =========================
  function startPan(e: any) {
    panRef.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }

  function onPan(e: any) {
    if (!panRef.current) return;

    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    lastMouse.current = { x: e.clientX, y: e.clientY };

    // FIXED: correct space conversion
    setImageState((prev) => ({
      ...prev,
      x: prev.x + dx * EXPORT_SCALE,
      y: prev.y + dy * EXPORT_SCALE,
    }));
  }

  function stopPan() {
    panRef.current = false;
  }

  // =========================
  // ZOOM
  // =========================
  function onWheel(e: any) {
    e.preventDefault();

    const factor = e.deltaY > 0 ? 0.95 : 1.05;

    setImageState((prev) => ({
      ...prev,
      scale: Math.max(0.3, Math.min(4, prev.scale * factor)),
    }));
  }

  // =========================
  // EXPORT PNG
  // =========================
  async function handleSelect() {
  if (!movie || !background) return;

  try {
    const png = await exportPosterToPNG({
      elementId: "poster-crop",
      width: 1000,
      height: 1500,
    });

    const res = await fetch("/api/poster/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: png }),
    });

    const data = await res.json();

    if (!data?.url) {
      console.error("No URL returned from save API", data);
      return;
    }

    window.location.href = `/poster/${movie.id}?img=${encodeURIComponent(
      data.url
    )}`;
  } catch (err) {
    console.error("Export failed:", err);
  }
}

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
        <h2 className="text-sm font-semibold mb-4">Backdrops</h2>

        <div className="space-y-2">
          {(movie?.backdrops || []).length === 0 ? (
            <div className="text-xs text-white/50">
              No backdrops found (using poster fallback)
            </div>
          ) : (
            movie.backdrops.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setBgIndex(i)}
                className={`w-full text-xs px-3 py-2 rounded border ${
                  i === bgIndex
                    ? "bg-white text-black"
                    : "border-white/20"
                }`}
              >
                Backdrop {i + 1}
              </button>
            ))
          )}
        </div>

        <button
          onClick={handleSelect}
          className="w-full mt-6 bg-blue-600 text-white text-sm py-3 rounded"
        >
          Select Background
        </button>
      </div>

      {/* WORKSPACE */}
      <div className="flex-1 flex items-center justify-center bg-[#080808]">

        <div
          id="poster-crop"
          className="relative border border-white/60 overflow-hidden bg-black"
          style={{
            width: VIEW_W,
            height: VIEW_H,
            cursor: "grab",
          }}
          onMouseDown={startPan}
          onMouseMove={onPan}
          onMouseUp={stopPan}
          onMouseLeave={stopPan}
          onWheel={onWheel}
        >
          {background && (
            <img
              src={background}
              draggable={false}
              style={{
                position: "absolute",

                left: imageState.x * DISPLAY_SCALE,
                top: imageState.y * DISPLAY_SCALE,

                // FIXED: remove scale contamination
                transform: `scale(${imageState.scale})`,

                transformOrigin: "top left",
                maxWidth: "none",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          )}

          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          <div className="absolute top-2 left-2 text-[10px] text-white/60">
            1000 × 1500 crop
          </div>
        </div>
      </div>
    </div>
  );
}