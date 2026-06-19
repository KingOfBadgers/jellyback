"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { exportPosterToPNG } from "@/lib/exportPosterToPNG";

import { materializeCompositionSeed } from "@/stage25/engine/materializeCompositionSeed";
import { useCompositionBorderStore } from "@/stage25/store/compositionBorderStore";

/**
 * =========================================================
 * STAGE 2 — BACKGROUND AUTHORING (BOUNDARY-LOCKED)
 * =========================================================
 *
 * RULES ENFORCED:
 * - Jellyfin data exists ONLY inside stage2 context object
 * - Stage 2.5 ONLY receives a frozen seed
 * - No Jellyfin object is referenced after handleSelect begins
 * =========================================================
 */

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  // =========================================================
  // STAGE 2 STATE (UI ONLY — JELLYFIN DATA LIVES HERE)
  // =========================================================
  const [stage2, setStage2] = useState<any>({
    movie: null,
    bgIndex: 0,
  });

  const panRef = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  /**
   * =========================================================
   * EXECUTION GUARD
   * Prevents double firing of border pipeline
   * =========================================================
   */
  const isProcessingRef = useRef(false);

  // =========================================================
  // STAGE 2.5 STORES
  // =========================================================
  
  const { setSeed } = useCompositionBorderStore();

  // =========================================================
  // EXPORT CONFIG
  // =========================================================
  const CAPTURE_WIDTH = 1000;
  const CAPTURE_HEIGHT = 1500;

  const DISPLAY_SCALE = 0.45;
  const EXPORT_SCALE = 1 / DISPLAY_SCALE;

  const VIEW_W = CAPTURE_WIDTH * DISPLAY_SCALE;
  const VIEW_H = CAPTURE_HEIGHT * DISPLAY_SCALE;

  // =========================================================
  // LOAD MOVIE (STAGE 2 ONLY)
  // =========================================================
  useEffect(() => {
    if (!id) return;

    async function loadMovie() {
      try {
        console.log("[STAGE2] Loading:", id);

        const res = await fetch("/api/jellyfin/movies");
        const movies = await res.json();

        const found = movies.find(
          (m: any) => String(m.id) === String(id)
        );

        console.log("[STAGE2] Movie loaded:", found?.title);

        setStage2((p: any) => ({
          ...p,
          movie: found || null,
        }));

        
      } catch (err) {
        console.error("[STAGE2] Failed loading movie:", err);
      }
    }

    loadMovie();
  }, [id]);

  // =========================================================
  // DERIVED UI STATE
  // =========================================================
  const movieData = stage2.movie;

  const background =
    movieData?.backdrops?.[stage2.bgIndex] ||
    movieData?.poster;

  // =========================================================
  // UI INTERACTION
  // =========================================================
  function startPan(e: any) {
    panRef.current = true;
    lastMouse.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  function onPan(e: any) {
    if (!panRef.current) return;

    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    lastMouse.current = {
      x: e.clientX,
      y: e.clientY,
    };

    setStage2((p: any) => ({
      ...p,
      x: (p.x || 0) + dx * EXPORT_SCALE,
      y: (p.y || 0) + dy * EXPORT_SCALE,
    }));
  }

  function stopPan() {
    panRef.current = false;
  }

  function onWheel(e: any) {
    e.preventDefault();

    const factor =
      e.deltaY > 0 ? 0.95 : 1.05;

    setStage2((p: any) => ({
      ...p,
      scale: Math.max(
        0.3,
        Math.min(
          4,
          (p.scale || 1) * factor
        )
      ),
    }));
  }

  // =========================================================
  // BORDER TRANSITION (STAGE 2 → 2.5)
  // =========================================================
  async function handleSelect() {
    /**
     * =========================================================
     * EXECUTION LOCK
     * Prevent duplicate pipeline execution
     * =========================================================
     */
    if (isProcessingRef.current) {
      console.warn(
        "[STAGE2] handleSelect blocked (already running)"
      );
      return;
    }

    isProcessingRef.current = true;

    if (!movieData || !background) {
      console.warn(
        "[STAGE2] Missing required data"
      );

      isProcessingRef.current = false;
      return;
    }

    try {
      // =========================================================
      // 1. EXPORT CROPPED IMAGE
      // =========================================================
      console.log("[BORDER] Exporting crop");

      const png =
        await exportPosterToPNG({
          elementId: "poster-crop",
          width: 1000,
          height: 1500,
        });

      // =========================================================
      // 2. SAVE PNG
      // =========================================================
      console.log("[BORDER] Saving PNG");

      const res = await fetch(
        "/api/poster/save",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            image: png,
            movieId: movieData.id,
          }),
        }
      );

      const data = await res.json();

      if (!data?.url) {
        console.error(
          "[BORDER] Save failed",
          data
        );
        return;
      }

      // =========================================================
      // 3. FETCH FULL MOVIE (CANONICAL SOURCE)
      // =========================================================
      console.log(
        "[BORDER] Fetching full movie"
      );

      const fullRes = await fetch(
        `/api/jellyfin/movie-full/${movieData.id}`
      );

      const fullMovie =
        await fullRes.json();

console.log(
  "[BORDER][FULL MOVIE RAW]",
  fullMovie
);

console.log(
  "[BORDER][FULL MOVIE MEDIA]",
  {
    MediaStreams: fullMovie?.MediaStreams,
    mediaStreams: fullMovie?.mediaStreams,
    MediaSources: fullMovie?.MediaSources,
    mediaSources: fullMovie?.mediaSources,
    media: fullMovie?.media,
  }
);

      if (!fullMovie?.id) {
        console.error(
          "[BORDER] Movie-full fetch failed"
        );
        return;
      }

      console.log(
        "[BORDER] Full movie received",
        {
          id: fullMovie.id,
          people:
            fullMovie.people?.length ??
            0,
        }
      );

      // =========================================================
      // 4. NORMALISE (PASS-THROUGH FOR NOW)
      // =========================================================
      console.log(
        "[BORDER] Normalising movie"
      );

      const normalizedMovie = {
        ...fullMovie,
        ratings: {
          mpaa:
            fullMovie.ratings?.mpaa ??
            null,
          bbfc:
            fullMovie.ratings?.bbfc ??
            null,
          raw:
            fullMovie.ratings?.raw ??
            null,
        },
      };

      // =========================================================
      // 5. FREEZE UI STATE (CRITICAL)
      // =========================================================
      console.log(
        "[BORDER] Freezing UI state"
      );

      const frozenMovie =
        structuredClone(movieData);

      // =========================================================
      // 6. BUILD BORDER SEED
      // =========================================================
      console.log(
        "[BORDER] Building seed"
      );

      const seed =
        await materializeCompositionSeed({
          movieId: movieData.id,
          backgroundUrl: data.url,
          rawJellyfinMovie: {
            ...frozenMovie,
            ...normalizedMovie,
          },
        });

      console.log(
        "[BORDER] Seed ready:",
        seed.movieId
      );

      // =========================================================
      // 7. FREEZE INTO STORE
      // =========================================================
      console.log(
        "[BORDER] Storing seed"
      );

      setSeed(seed);

      console.log(
        "[BORDER] Seed stored"
      );

      // =========================================================
      // 8. CLIENT NAVIGATION
      // IMPORTANT:
      // router.push preserves Zustand memory
      // window.location.href destroys it
      // =========================================================
      console.log(
        "[STAGE2] Entering Stage 2.5"
      );

      const destination =
        `/compose/${movieData.id}`;

      console.log(
        "[STAGE2] Navigating:",
        destination
      );

      router.push(destination);
    } catch (err) {
      console.error(
        "[STAGE2] Failed border transition:",
        err
      );
    } finally {
      /**
       * =========================================================
       * RELEASE LOCK
       * =========================================================
       */
      isProcessingRef.current = false;
    }
  }

  // =========================================================
  // LOADING STATE
  // =========================================================
  if (!movieData) {
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

        <div className="space-y-2">
          {(movieData?.backdrops ||
            []).map(
            (_: any, i: number) => (
              <button
                key={i}
                onClick={() =>
                  setStage2(
                    (p: any) => ({
                      ...p,
                      bgIndex: i,
                    })
                  )
                }
                className={`w-full text-xs px-3 py-2 rounded border ${
                  i ===
                  stage2.bgIndex
                    ? "bg-white text-black"
                    : "border-white/20"
                }`}
              >
                Backdrop {i + 1}
              </button>
            )
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
                position:
                  "absolute",
                left:
                  (stage2.x || 0) *
                  DISPLAY_SCALE,
                top:
                  (stage2.y || 0) *
                  DISPLAY_SCALE,
                transform: `scale(${
                  stage2.scale || 1
                })`,
                transformOrigin:
                  "top left",
                maxWidth: "none",
                userSelect: "none",
                pointerEvents:
                  "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}