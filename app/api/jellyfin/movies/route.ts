import { getConfig } from "@/lib/config";

/**
 * =========================================================
 * STAGE 1 — MOVIE GRID API
 * =========================================================
 *
 * PURPOSE
 * -------
 * Fast, lightweight movie listing for:
 *
 * - Stage 1 grid
 * - Stage 2 navigation entry
 *
 * RULES
 * -----
 * This endpoint MUST remain minimal.
 *
 * Allowed:
 * - id
 * - title
 * - year
 * - poster
 * - backdrops
 *
 * NOT ALLOWED:
 * - People / cast
 * - logos
 * - banner
 * - clearart
 * - ratings enrichment
 * - metadata normalisation
 *
 * Full enrichment belongs to:
 * /api/jellyfin/movie-full/[id]
 * =========================================================
 */

export async function GET() {
  console.log("[JELLYFIN MOVIES] Request started");

  try {
    // =========================================================
    // LOAD CONFIG
    // =========================================================
    const config = await getConfig();

    console.log("[JELLYFIN MOVIES] Config loaded", {
      hasUrl: !!config?.jellyfinUrl,
      hasApiKey: !!config?.apiKey,
    });

    // =========================================================
    // LIGHTWEIGHT MOVIE QUERY
    // =========================================================
    const url =
      `${config.jellyfinUrl}/Items` +
      `?IncludeItemTypes=Movie` +
      `&Recursive=true` +
      `&Fields=ImageTags,BackdropImageTags,Name,ProductionYear` +
      `&Limit=2000`;

    console.log("[JELLYFIN MOVIES] Fetching movie list", {
      url,
    });

    const res = await fetch(url, {
      headers: {
        "X-Emby-Token": config.apiKey,
      },
    });

    if (!res.ok) {
      console.error("[JELLYFIN MOVIES] Jellyfin request failed", {
        status: res.status,
        statusText: res.statusText,
      });

      return Response.json([]);
    }

    const json = await res
      .json()
      .catch(() => ({ Items: [] }));

    const rawItems = json.Items || [];

    console.log("[JELLYFIN MOVIES] Raw items received", {
      count: rawItems.length,
    });

    /**
 * CHANGE: Introduced BoxRear filtering and alphabetical sorting
 * ---------------------------------------------------------
 * DATE: 2026-06-10
 * TIME: Current implementation
 *
 * REASON:
 * - Landing page must show only movies missing Back artwork
 * - Jellyfin exposes generated Back artwork via ImageTags.BoxRear
 * - Movies should be presented in predictable alphabetical order
 *
 * IMPACT:
 * - Removes movies that already have generated Back artwork
 * - Sorts remaining movies A→Z by Jellyfin Name
 * - No change to downstream mapping logic
 */

    const filteredItems = rawItems
  .filter((m: any) => {
    return !m?.ImageTags?.BoxRear;
  })
  .sort((a: any, b: any) =>
    (a.Name || "").localeCompare(
      b.Name || "",
      undefined,
      {
        sensitivity: "base",
        numeric: true,
      }
    )
  );

    console.log("[JELLYFIN MOVIES] BoxRear filtering applied", {
      total: rawItems.length,
      remaining: filteredItems.length,
      excluded: rawItems.length - filteredItems.length,
    });

    // =========================================================
    // MAP TO LIGHTWEIGHT STAGE-1 CONTRACT
    // =========================================================
    const movies = filteredItems.map((m: any) => {
      /**
       * =====================================================
       * BACKDROP EXTRACTION
       * =====================================================
       *
       * Robust fallback strategy:
       *
       * 1. BackdropImageTags
       * 2. ImageTags.Backdrop fallback
       */
      const backdropTags =
        m.BackdropImageTags?.length
          ? m.BackdropImageTags
          : m.ImageTags?.Backdrop
            ? [m.ImageTags.Backdrop]
            : [];

      const backdrops = backdropTags.map(
        (_: any, i: number) =>
          `${config.jellyfinUrl}/Items/${m.Id}/Images/Backdrop/${i}?api_key=${config.apiKey}`
      );

      return {
        // =====================================================
        // STAGE 1 CONTRACT ONLY
        // =====================================================
        id: m.Id,
        title: m.Name ?? null,
        year: m.ProductionYear ?? null,

        poster: m.ImageTags?.Primary
          ? `${config.jellyfinUrl}/Items/${m.Id}/Images/Primary?api_key=${config.apiKey}`
          : null,

        backdrops,
      };
    });

    console.log("[JELLYFIN MOVIES] Response built", {
      movieCount: movies.length,
      sampleMovie: movies[0]
        ? {
            id: movies[0].id,
            title: movies[0].title,
            backdropCount:
              movies[0].backdrops?.length ?? 0,
          }
        : null,
    });

    return Response.json(movies);
  } catch (err) {
    console.error("[JELLYFIN MOVIES] Fatal error", err);

    return Response.json([]);
  }
}