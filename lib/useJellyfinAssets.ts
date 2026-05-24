"use client";

import { useEffect, useState } from "react";

type Assets = {
  logo: string | null;
  banner: string | null;
  loading: boolean;
};

export function useJellyfinAssets(movie: any, config: any) {
  const [assets, setAssets] = useState<Assets>({
    logo: null,
    banner: null,
    loading: true,
  });

  useEffect(() => {
    if (!movie?.id || !config?.jellyfinUrl) return;

    let cancelled = false;

    const base = `${config.jellyfinUrl}/Items/${movie.id}/Images`;

    const logoUrl = `${base}/Logo?api_key=${config.apiKey}`;
    const bannerUrl = `${base}/Banner?api_key=${config.apiKey}`;

    const loadImage = (url: string) =>
      new Promise<string | null>((resolve) => {
        const img = new Image();

        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);

        img.src = url;
      });

    async function run() {
      const [logo, banner] = await Promise.all([
        loadImage(logoUrl),
        loadImage(bannerUrl),
      ]);

      if (cancelled) return;

      setAssets({
        logo,
        banner,
        loading: false,
      });
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [movie?.id, config?.jellyfinUrl, config?.apiKey]);

  return assets;
}