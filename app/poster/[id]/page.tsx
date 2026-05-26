"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Stage3Canvas from "./components/Stage3Canvas";

export default function PosterStage3() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id as string;
  const img = searchParams.get("img");

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadMovie() {
      try {
        setLoading(true);

        const res = await fetch("/api/jellyfin/movies");
        const data = await res.json();

        console.log("[JELLYFIN RAW RESPONSE]", data);

        // NORMALISE RESPONSE SHAPE (ARRAY OR {Items})
        const movies = Array.isArray(data)
          ? data
          : data?.Items || [];

        console.log("[NORMALISED MOVIE LIST]", movies);

        const found = movies.find((m: any) => {
          const mid = String(m.Id ?? m.id ?? "");
          return mid === String(id);
        });

        console.log("[FOUND MOVIE]", found);

        setMovie(found || null);
      } catch (err) {
        console.error("Failed loading movie:", err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  // =========================
  // SAFETY GUARDS
  // =========================

  if (!img) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        No poster found
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading movie...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Movie not found
      </div>
    );
  }

  // =========================
  // RENDER STAGE 3 ONLY WHEN SAFE
  // =========================

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex">
      <Stage3Canvas img={img} movie={movie} />
    </div>
  );
}