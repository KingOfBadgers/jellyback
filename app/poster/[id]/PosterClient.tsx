"use client";

import { useEffect, useState } from "react";
import Stage3Renderer from "@/stage3/ui/Stage3Renderer";
import { buildPosterPack } from "@/stage2/posterPackBuilder";
import { validatePosterPack } from "@/stage2/posterPackValidator";

export default function PosterClient({
  id,
}: {
  id: string;
}) {
  const [pack, setPack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);

      const res = await fetch("/api/jellyfin/movies");
      const movies = await res.json();

      const movie = movies.find(
        (m: any) => String(m.id) === String(id)
      );

      if (!movie) {
        console.warn("Movie not found:", id);
        setLoading(false);
        return;
      }

      const rawPack = buildPosterPack(movie);

      console.log("RAW PACK BEFORE VALIDATION:", rawPack);

      const safePack = validatePosterPack(rawPack);

      if (!safePack) {
        console.warn("Pack invalid for movie:", movie);
        setLoading(false);
        return;
      }

      /**
       * ✅ SINGLE SOURCE OF TRUTH: PosterClient ONLY
       */
      const resolvedBackground =
        movie?.generatedBackground?.src ||
        safePack?.background?.src ||
        movie?.backdrops?.[0] ||
        movie?.poster ||
        null;

      const finalPack = {
        ...safePack,
        background: {
          src: resolvedBackground,
        },
      };

      if (!cancelled) {
        setPack(finalPack);
        setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="text-white p-10">Loading poster pack...</div>;
  }

  if (!pack) {
    return <div className="text-white p-10">Failed to generate poster pack</div>;
  }

  console.log("POSTER CLIENT FINAL PACK:", pack);
  console.log("POSTER CLIENT BACKGROUND:", pack.background?.src);
  console.log("FINAL BACKGROUND SENT TO STAGE3:", pack.background.src);

  return (
    <Stage3Renderer
      background={pack.background.src}
      assets={pack.assets}
      metadata={pack.metadata}
      template={pack.template}
    />
  );
}