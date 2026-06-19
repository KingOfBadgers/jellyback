import { PosterDraft } from "./xxxposterTypes";

export function buildPosterDraft(movie: any): PosterDraft {
  return {
    id: movie.id,

    background: {
      baseImage: movie.backdrop || "",
      collageLayers: movie.collageLayers || [],
    },

    metadata: {
      mpaa: movie.mpaa,
      bbfc: movie.bbfc,
      runtime: movie.runtime,
      resolution: movie.resolution,
      subtitles: movie.subtitles,
    },

    assets: {
      logos: movie.logos || [],
      banners: movie.banners || [],
      cleararts: movie.cleararts || [],
    },

    barcode: {
      tmdbUrl: movie.tmdbUrl,
      imdbUrl: movie.imdbUrl,
    },

    layoutHints: {
      style: "dvd-classic",
    },
  };
}