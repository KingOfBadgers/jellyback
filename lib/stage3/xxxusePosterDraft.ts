"use client";

import { useState } from "react";
import { PosterDraft } from "@/lib/poster/xxxposterTypes";

export function usePosterDraft(initial: PosterDraft) {
  const [draft, setDraft] = useState<PosterDraft>(initial);

  function setLogo(index: number) {
    setDraft((prev) => ({
      ...prev,
      assets: {
        ...prev.assets,
        logos: prev.assets.logos,
      },
    }));
  }

  function setBanner(url: string) {
    setDraft((prev) => ({
      ...prev,
      assets: {
        ...prev.assets,
        banners: [url],
      },
    }));
  }

  function setMetadataPreset(preset: Partial<PosterDraft["metadata"]>) {
    setDraft((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        ...preset,
      },
    }));
  }

  function setBarcode(svg: string) {
    setDraft((prev) => ({
      ...prev,
      barcode: {
        ...prev.barcode,
        svg,
      },
    }));
  }

  return {
    draft,
    setLogo,
    setBanner,
    setMetadataPreset,
    setBarcode,
  };
}