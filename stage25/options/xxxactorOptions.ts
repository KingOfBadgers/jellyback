import { Seed } from "../seed/types";

/**
 * Stage 2.5
 * Actor Option Mapper
 *
 * FIX:
 * - Aligns with Border system naming (actors live in seed.assets.actors)
 * - Keeps backward compatibility
 */
export function mapActorOptions(seed: Seed) {
  console.log("[ActorOptions] Mapping started");

  /**
   * =========================================================
   * SOURCE RESOLUTION (BORDER-FIRST, LEGACY FALLBACK)
   * =========================================================
   */

  const cast =
    // NEW canonical BorderSeed location
    (seed as any)?.assets?.actors ??
    // legacy fallback (old broken path)
    (seed as any)?.metaAssets?.filter((a: any) => a.type === "cast") ??
    [];

  console.log("[ActorOptions] Cast extracted:", cast);

  if (!cast || cast.length === 0) {
    console.log("[ActorOptions] No cast found");
    return [];
  }

  /**
   * =========================================================
   * OPTION BUILDING (UNCHANGED LOGIC)
   * =========================================================
   */

  if (cast.length === 1) {
    return [
      {
        id: "single-portrait",
        label: "Single Portrait",
        assets: cast,
        previewStyle: "single",
      },
    ];
  }

  if (cast.length <= 4) {
    return [
      {
        id: "cast-strip",
        label: "Cast Strip",
        assets: cast,
        previewStyle: "strip",
      },
      {
        id: "stacked-portraits",
        label: "Stacked Portraits",
        assets: cast,
        previewStyle: "stack",
      },
    ];
  }

  return [
    {
      id: "ensemble-grid",
      label: "Ensemble Grid",
      assets: cast,
      previewStyle: "grid",
    },
    {
      id: "cinematic-strip",
      label: "Cinematic Strip",
      assets: cast,
      previewStyle: "cinematic-strip",
    },
  ];
}