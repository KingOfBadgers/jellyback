"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PosterCanvas from "../../poster/[id]/components/PosterCanvas";

export default function MoviePage() {
  const params = useParams();
  const id = params?.id as string;

  const [movie, setMovie] = useState<any>(null);
  const [bgIndex, setBgIndex] = useState(0);
  const [stage, setStage] = useState<"select" | "edit">("select");

  const [blocks, setBlocks] = useState<any[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/jellyfin/movies");
      const movies = await res.json();

      const found = movies.find((m: any) => m.id === id);
      setMovie(found);
    }

    if (id) load();
  }, [id]);

  if (!movie) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const background =
    movie.backdrops?.[bgIndex] || movie.poster;

  const draft = {
    movie,
    assets: {
      poster: movie.poster,
      backdrops: movie.backdrops || [],
      banner: movie.banner,
      logo: movie.logo,
    },
    availability: {
      hasPoster: !!movie.poster,
      hasBackdrops:
        (movie.backdrops || []).length > 0,
      hasBanner: !!movie.banner,
      hasLogo: !!movie.logo,
    },
  };

  if (stage === "select") {
    return (
      <div className="h-screen w-screen bg-black text-white flex">
        <div className="w-64 border-r border-white/10 p-4">
          <h2 className="text-sm mb-4">
            Select Background
          </h2>

          <div className="space-y-2">
            {movie.backdrops?.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setBgIndex(i)}
                className={`w-full text-xs p-2 border ${
                  i === bgIndex
                    ? "bg-white text-black"
                    : "border-white/20"
                }`}
              >
                Backdrop {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStage("edit")}
            className="mt-6 w-full bg-blue-600 text-xs p-2"
          >
            Continue to Editor
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img
            src={background}
            className="max-h-[80%] object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-[#050505] text-white overflow-hidden">
      <div className="flex-1 flex items-center justify-center">
        <div className="scale-[0.82] origin-center">
          <PosterCanvas
            draft={draft}
            blocks={blocks}
            setBlocks={setBlocks}
            selectedBlockId={selectedBlockId}
            setSelectedBlockId={setSelectedBlockId}
          />
        </div>
      </div>
    </div>
  );
}