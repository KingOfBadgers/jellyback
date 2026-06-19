/**
 * =========================================================
 * METADATA ASSET RESOLVER
 * =========================================================
 *
 * HUMAN:
 * Converts normalised metadata into UI-safe icon assets.
 * This file should NEVER decide metadata truth — only map it.
 *
 * AI:
 * Pure mapping layer:
 * - deterministic input → output transformation
 * - no inference
 * - no business logic
 * =========================================================
 */

type MetaInput = {
  mpaa?: string | null;
  bbfc?: string | null;
  resolution?: string | null;
  subtitles?: boolean;
};

export function resolveMetadataAssets(input: MetaInput) {
  const traceId =
    crypto?.randomUUID?.() ??
    Math.random().toString(36);

  // =========================================================
  // INPUT TRACE (ENHANCED DEBUG)
  // =========================================================
  console.log("[ASSET RESOLVER INPUT]", {
    traceId,
    input,
    keys: input ? Object.keys(input) : [],
    snapshot: {
      mpaa: input?.mpaa,
      bbfc: input?.bbfc,
      resolution: input?.resolution,
      subtitles: input?.subtitles,
    },
  });

  if (!input) {
    console.warn("[ASSET RESOLVER] Missing input", {
      traceId,
    });
    return [];
  }

  // =========================================================
  // EMPTY STATE DETECTION (DIAGNOSTIC ONLY)
  // =========================================================
  const isEmpty =
    !input.mpaa &&
    !input.bbfc &&
    !input.resolution &&
    !input.subtitles;

  if (isEmpty) {
    console.warn("[ASSET RESOLVER] EMPTY METADATA SIGNAL", {
      traceId,
      reason: "All metadata fields are null/undefined",
      hint: "Upstream normaliser likely dropped values",
      inputKeys: Object.keys(input),
    });
  }

  const mpaa = normaliseMPAA(input.mpaa);
  const bbfc = normaliseBBFC(input.bbfc);
  const resolution = normaliseResolution(input.resolution);
  const subtitles = Boolean(input.subtitles);

  // =========================================================
  // NORMALISED OUTPUT TRACE
  // =========================================================
  console.log("[ASSET RESOLVER NORMALISED]", {
    traceId,
    mpaa,
    bbfc,
    resolution,
    subtitles,
  });

  const assets: {
    type: string;
    src: string;
  }[] = [];

  // =========================================================
  // MPAA
  // =========================================================
  if (mpaa) {
    const asset = {
      type: "mpaa",
      src: `/assets/meta/mpaa/${mpaa}.png`,
    };

    console.log("[ASSET RESOLVER][MPAA]", asset);
    assets.push(asset);
  }

  // =========================================================
  // BBFC
  // =========================================================
  if (bbfc) {
    const asset = {
      type: "bbfc",
      src: `/assets/meta/bbfc/${bbfc}.png`,
    };

    console.log("[ASSET RESOLVER][BBFC]", asset);
    assets.push(asset);
  }

  // =========================================================
  // RESOLUTION
  // =========================================================
  if (resolution) {
    const asset = {
      type: "resolution",
      src: `/assets/meta/resolution/${resolution}.png`,
    };

    console.log("[ASSET RESOLVER][RESOLUTION]", asset);
    assets.push(asset);
  }

  // =========================================================
  // SUBTITLES
  // =========================================================
  if (subtitles) {
    const asset = {
      type: "subtitles",
      src: `/assets/meta/subtitles/cc.png`,
    };

    console.log("[ASSET RESOLVER][SUBTITLES]", asset);
    assets.push(asset);
  }

  // =========================================================
  // OUTPUT TRACE
  // =========================================================
  console.log("[ASSET RESOLVER OUTPUT]", {
    traceId,
    assets,
    count: assets.length,
  });

  // =========================================================
  // FINAL SAFETY CHECK
  // =========================================================
  if (assets.length === 0) {
    console.warn("[ASSET RESOLVER] NO ASSETS GENERATED", {
      traceId,
      reason: "All mappings returned null",
    });
  }

  return assets;
}

/**
 * =========================
 * NORMALISERS (UNCHANGED)
 * =========================
 */

function normaliseMPAA(value?: string | null) {
  if (!value) return null;

  const v = value.toLowerCase().replace(/\s+/g, "").replace(/-/g, "");

  if (v === "g") return "g";
  if (v === "pg") return "pg";
  if (v === "pg13") return "pg13";
  if (v === "r") return "r";
  if (v === "nc17") return "nc17";

  return null;
}

function normaliseBBFC(value?: string | null) {
  if (!value) return null;

  const v = value.toLowerCase().replace(/\s+/g, "");

  if (v === "r18") return "r18";
  if (v === "18") return "18";
  if (v === "15") return "15";
  if (v === "12a") return "12a";
  if (v === "12") return "12";
  if (v === "pg") return "pg";
  if (v === "u") return "u";

  return null;
}

function normaliseResolution(value?: string | null) {
  if (!value) return null;

  const v = value.toLowerCase();

  if (v.includes("4k") || v.includes("2160")) return "4k";
  if (v.includes("1080")) return "1080p";
  if (v.includes("720")) return "720p";
  if (v.includes("sd") || v.includes("480") || v.includes("576")) return "sd";

  return null;
}