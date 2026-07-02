"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — METADATA BAR RENDERER
 * =========================================================
 *
 * DATE: 2026-07-01
 *
 * PURPOSE
 * ---------------------------------------------------------
 * Lifted directly from ComposePage.
 *
 * This is a PURE DUMB RENDER LAYER.
 *
 * RULES
 * ---------------------------------------------------------
 * - NO intelligence
 * - NO fetching
 * - NO store access
 * - NO metadata derivation
 * - Receives already resolved footer object
 *
 * CHANGE: 2026-07-01 | 14:40 UTC
 * ---------------------------------------------------------
 * LIFT + SHIFT EXTRACTION
 *
 * REASON:
 * ---------------------------------------------------------
 * Begin extraction from compose page without changing
 * architecture or behaviour.
 *
 * ZERO functionality changes.
 * =========================================================
 */

export default function MetadataBarRenderer({
  footer,
}: any) {
  if (!footer) return null;

  console.log("[METADATA BAR]", footer);

  /**
   * =====================================================
   * SCALE CONSTANT
   * =====================================================
   *
   * Existing production value preserved.
   */

  const SCALE = 2.3;

  return (
    <div
      style={{
        width: 1000,
        height: 150,

        display: "grid",
        gridTemplateColumns:
          "1.2fr 1.4fr 1fr 1fr 2fr 0.8fr 1.6fr",

        alignItems: "stretch",

        background: "#f2f2f2",

        borderTop:
          "1px solid rgba(0,0,0,0.15)",

        boxSizing: "border-box",

        padding: "0 12px",
      }}
    >
      {/* =========================
          RATING
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {footer.rating && (
          <img
            src={`/assets/meta/${
              footer.rating.includes("r18") ||
              [
                "18",
                "15",
                "12",
                "12a",
                "pg",
                "u",
              ].includes(
                footer.rating
              )
                ? `bbfc/${footer.rating}`
                : `mpaa/${footer.rating}`
            }.png`}
            style={{
              height: 72,
              objectFit: "contain",
            }}
          />
        )}
      </div>

      {/* =========================
          RUNTIME
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          gap: 10,

          color: "#111",

          fontWeight: 500,
        }}
      >
        <img
          src="/assets/meta/runtime/clock.png"
          style={{
            height: 28 * SCALE,
          }}
        />

        <span
          style={{
            fontSize: 20,
            lineHeight: "1",
            color: "#111",
          }}
        >
          {footer.runtime
            ? `${footer.runtime} min`
            : null}
        </span>
      </div>

      {/* =========================
          CC
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/assets/meta/subtitles/cc.png"
          style={{
            height: 42 * SCALE,
          }}
        />
      </div>

      {/* =========================
          RESOLUTION
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {footer.resolution && (
          <img
            src={`/assets/meta/resolution/${footer.resolution}.png`}
            style={{
              height: 42 * SCALE,
            }}
          />
        )}
      </div>

      {/* =========================
          QI CODE
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          gap: 10,
        }}
      >
        {footer.qi?.tmdbUrl ? (
          <img
            src="/assets/meta/qi/tmdb.png"
            style={{
              height: 48 * SCALE,
            }}
          />
        ) : footer.qi?.imdbUrl ? (
          <img
            src="/assets/meta/qi/imdb.png"
            style={{
              height: 48 * SCALE,
            }}
          />
        ) : (
          <img
            src="/assets/meta/barcode/barcode.png"
            style={{
              height: 48 * SCALE,
            }}
          />
        )}
      </div>

      {/* =========================
          JB ICON
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/assets/meta/jb/jb.png"
          style={{
            height: 44 * SCALE,
          }}
        />
      </div>

      {/* =========================
          LOGO
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          overflow: "hidden",
        }}
      >
        {footer.logo && (
          <img
            src={footer.logo}
            style={{
              maxHeight: 90,
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    </div>
  );
}