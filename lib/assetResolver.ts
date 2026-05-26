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

  console.log("[ASSET RESOLVER INPUT]", {
    traceId,
    input,
  });

  const mpaa = normaliseMPAA(input.mpaa);
  const bbfc = normaliseBBFC(input.bbfc);
  const resolution = normaliseResolution(input.resolution);
  const subtitles = Boolean(input.subtitles);

  console.log("[ASSET RESOLVER NORMALISED]", {
    traceId,
    mpaa,
    bbfc,
    resolution,
    subtitles,
  });

  const assets: { type: string; src: string }[] = [];

  // =========================
  // MPAA
  // =========================

  if (mpaa) {
    assets.push({
      type: "mpaa",
      src: `/assets/meta/mpaa/${mpaa}.png`,
    });
  }

  // =========================
  // BBFC
  // =========================

  if (bbfc) {
    assets.push({
      type: "bbfc",
      src: `/assets/meta/bbfc/${bbfc}.png`,
    });
  }

  // =========================
  // RESOLUTION
  // =========================

  if (resolution) {
    assets.push({
      type: "resolution",
      src: `/assets/meta/resolution/${resolution}.png`,
    });
  }

  // =========================
  // SUBTITLES
  // =========================

  if (subtitles) {
    assets.push({
      type: "subtitles",
      src: `/assets/meta/subtitles/cc.png`,
    });
  }

  console.log("[ASSET RESOLVER OUTPUT]", {
    traceId,
    assets,
  });

  return assets;
}

/**
 * =========================
 * NORMALISERS (UNCHANGED)
 * =========================
 */

function normaliseMPAA(value?: string | null) {
  if (!value) return null;

  const v = value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");

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

  return null;
}