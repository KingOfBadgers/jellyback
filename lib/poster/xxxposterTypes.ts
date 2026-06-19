import { SlotType } from "./xxxslots";

export type PosterDraft = {
  id: string;

  background: {
    baseImage: string;
    collageLayers: string[];
  };

  metadata: {
    mpaa?: string;
    bbfc?: string;
    runtime?: string;
    resolution?: string;
    subtitles?: boolean;
  };

  assets: {
    logos: string[];
    banners: string[];
    cleararts: string[];
  };

  barcode: {
    svg?: string;
    tmdbUrl?: string;
    imdbUrl?: string;
  };

  layout: {
    slotMap: Record<
      SlotType,
      {
        assetIds: string[];
        variant?: string;
      }
    >;
  };
};