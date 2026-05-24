"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PosterCanvas from "./components/PosterCanvas";

export default function PosterPage() {
  const params = useParams();
  const id = params?.id as string;

  const [movie, setMovie] =
    useState<any>(null);

  const [draft, setDraft] =
    useState<any>(null);

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

        setMovie(
          found || null
        );
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
  // LOAD DRAFT
  // =========================
  useEffect(() => {
    try {
      const saved =
        sessionStorage.getItem(
          "poster_draft"
        );

      if (!saved) return;

      setDraft(
        JSON.parse(saved)
      );
    } catch (err) {
      console.error(
        "Failed loading draft",
        err
      );
    }
  }, []);

  // =========================
  // LOADING
  // =========================
  if (!movie || !draft) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading editor...
      </div>
    );
  }

  const finalDraft = {
    ...draft,
    movie,
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 shrink-0 border-r border-white/10 bg-[#0b0b0b] flex flex-col">
        <div className="p-5 border-b border-white/10">
          <h1 className="text-lg font-semibold">
            Poster Editor
          </h1>

          <div className="text-sm text-white/60 mt-1">
            {movie.title}
          </div>

          {movie.year && (
            <div className="text-xs text-white/40 mt-1">
              {movie.year}
            </div>
          )}
        </div>

        <div className="p-4 space-y-3 text-sm">
          <button className="w-full border border-white/10 rounded-lg p-3 text-left hover:bg-white/5">
            Add Logo
          </button>

          <button className="w-full border border-white/10 rounded-lg p-3 text-left hover:bg-white/5">
            Add Banner
          </button>

          <button className="w-full border border-white/10 rounded-lg p-3 text-left hover:bg-white/5">
            Add ClearArt
          </button>

          <button className="w-full border border-white/10 rounded-lg p-3 text-left hover:bg-white/5">
            Add Title Block
          </button>

          <button className="w-full border border-white/10 rounded-lg p-3 text-left hover:bg-white/5">
            Add Cast
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOOLBAR */}
        <header className="h-16 shrink-0 border-b border-white/10 bg-[#090909] flex items-center justify-between px-6">
          <div>
            <div className="text-sm font-medium">
              Stage 3 Editor
            </div>

            <div className="text-xs text-white/40">
              1000 × 1500 poster
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded bg-white/10 hover:bg-white/15 text-sm">
              Save Draft
            </button>

            <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-sm">
              Export Poster
            </button>
          </div>
        </header>

        {/* CANVAS AREA */}
        <section className="flex-1 overflow-hidden bg-[#050505] flex items-center justify-center px-8">
          {/* SHIFT LEFT + FIT SCREEN */}
          <div
            className="relative shrink-0 -translate-x-10"
            style={{
              width:
                "min(48vh, 420px)",
              aspectRatio:
                "2 / 3",
            }}
          >
            <PosterCanvas
              draft={
                finalDraft
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
}