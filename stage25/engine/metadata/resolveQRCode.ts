/**
 * =========================================================
 * JELLYBACK QR CODE RESOLVER
 * =========================================================
 *
 * PURPOSE:
 * Convert canonical provider IDs into a QR SVG asset.
 *
 * RESPONSIBILITY:
 * - Choose external movie URL
 * - Generate SVG QR representation
 * - Return render-ready metadata asset
 *
 * DOES NOT:
 * - modify seed
 * - write files
 * - access Jellyfin
 * - contain Stage 3 rendering logic
 *
 * =========================================================
 */

import QRCode from "qrcode";

type ProviderIds = {
  tmdb?: string | null;
  imdb?: string | null;
};

export type ResolvedQRCode = {
  provider: "imdb" | "tmdb";
  id: string;
  url: string;
  svg: string;
} | null;


/**
 * =========================================================
 * RESOLVE QR CODE
 * =========================================================
 */
export async function resolveQRCode(
  providerIds?: ProviderIds | null
): Promise<ResolvedQRCode> {

  /**
   * =========================================================
   * CHANGE: 2026-07-08
   * REASON:
   * QR generation requires an external movie reference.
   *
   * If no provider IDs exist, no QR should be created.
   * =========================================================
   */
  if (!providerIds) {
    console.warn(
      "[QR RESOLVER] Missing provider IDs"
    );

    return null;
  }


  /**
   * =========================================================
   * PROVIDER PRIORITY
   *
   * IMDb preferred:
   * - universal movie identifier
   * - commonly recognised
   *
   * TMDB fallback:
   * - available in many Jellyfin libraries
   * =========================================================
   */

  let provider: "imdb" | "tmdb" | null = null;
  let id: string | null = null;
  let url: string | null = null;


  if (providerIds.imdb) {

    provider = "imdb";
    id = providerIds.imdb;

    url =
      `https://www.imdb.com/title/${providerIds.imdb}/`;

  } else if (providerIds.tmdb) {

    provider = "tmdb";
    id = providerIds.tmdb;

    url =
      `https://www.themoviedb.org/movie/${providerIds.tmdb}`;

  }


  /**
   * =========================================================
   * NO EXTERNAL REFERENCE
   * =========================================================
   */
  if (!provider || !id || !url) {

    console.warn(
      "[QR RESOLVER] No supported provider ID",
      {
        providerIds,
      }
    );

    return null;
  }


  /**
   * =========================================================
   * SVG GENERATION
   *
   * SVG chosen intentionally:
   * - scalable
   * - lightweight
   * - export friendly
   * - no filesystem storage
   * =========================================================
   */
  try {

    const svg =
      await QRCode.toString(
        url,
        {
          type: "svg",
          margin: 1,
          errorCorrectionLevel: "M",
        }
      );


    const result = {
      provider,
      id,
      url,
      svg,
    };


    console.log(
      "[QR RESOLVER OUTPUT]",
      {
        provider,
        id,
        url,
        svgLength: svg.length,
      }
    );


    return result;


  } catch (err) {

    console.error(
      "[QR RESOLVER] SVG generation failed",
      err
    );

    return null;
  }
}