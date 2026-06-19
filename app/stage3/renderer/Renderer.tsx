import BackgroundLayer from "./layers/BackgroundLayer";
import ActorLayer from "./layers/ActorLayer";
import CollageLayer from "./layers/CollageLayer";

/**
 * =========================================================
 * FIX: UPDATED METADATA RENDERER PATH
 * =========================================================
 */
import Stage3MetadataStripRenderer from "@/stage3/metadata/Stage3MetadataStripRenderer";

import { buildMetadataRenderPlan } from "@/stage3/metadata/buildMetadataRenderPlan";

export default function Renderer({ seed }: any) {
  /**
   * =========================================================
   * METADATA PLAN (STAGE 3 DERIVED ONLY)
   * =========================================================
   */
  const metadataPlan = buildMetadataRenderPlan(seed);

  console.log("[STAGE3][RENDERER] Seed received:", {
    movieId: seed?.movieId,
    variant: metadataPlan.variant,
    slots: metadataPlan.slots.length,
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* =========================
          CANVAS (FIXED DIMENSIONS)
          ========================= */}
      <div
        style={{
          width: 1000,
          height: 1500,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transform: "scale(0.6)",
          transformOrigin: "center",
          overflow: "hidden",
        }}
      >
        {/* =========================
            ART ZONE
            ========================= */}
        <div
          style={{
            position: "relative",
            flex: 1,
            height: 1400,
          }}
        >
          <BackgroundLayer seed={seed} />
          <CollageLayer seed={seed} />
          <ActorLayer seed={seed} />
        </div>

        {/* =========================
            METADATA STRIP
            ========================= */}
        <div
          style={{
            height: 100,
            width: 1000,
            flexShrink: 0,
            position: "relative",
          }}
        >
          <Stage3MetadataStripRenderer plan={metadataPlan} />
        </div>
      </div>
    </div>
  );
}