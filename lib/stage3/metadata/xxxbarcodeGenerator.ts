import { Barcode } from "../engine/compositionTypes";

export function generateBarcode(url: string): Barcode {
  const type = url.includes("imdb") ? "imdb" : "tmdb";

  return {
    type,
    value: url,
  };
}