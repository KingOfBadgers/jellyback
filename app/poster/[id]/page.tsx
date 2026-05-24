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

  useEffect(() => {
    if (!id) return;

    async function loadMovie() {
      try {
        const res = await fetch("/api/jellyfin/movies");
        const movies = await res.json();

        const found = movies.find(
          (m: any) => String(m.id) === String(id)
        );

        setMovie(found || null);
      } catch (err) {
        console.error("Failed loading movie:", err);
      }
    }

    loadMovie();
  }, [id]);

  if (!img) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        No poster found
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex">
      <Stage3Canvas
        img={img}
        movie={movie}
      />
    </div>
  );
}