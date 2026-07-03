"use client";

/**
 * =========================================================
 * STEEL BAR RENDERER
 * =========================================================
 *
 * Premium Blu-ray style metadata strip
 * Dark steel finish
 * Minimal icon dependency
 * =========================================================
 */

export default function SteelBarRenderer({
  metadata,
}: any) {
  if (!metadata) return null;

  return (
    <div
      style={{
        width: 1000,
        height: 150,

        background:
          "linear-gradient(to bottom, #4b4b4b, #1e1e1e)",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        padding: "0 40px",

        boxSizing: "border-box",

        borderTop:
          "2px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* =========================
          LEFT — LOGO
      ========================= */}

      <div
        style={{
          width: 320,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {metadata.logo && (
          <img
            src={metadata.logo}
            style={{
              maxHeight: 90,
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </div>

      {/* =========================
          CENTER — TEXT META
      ========================= */}

      <div
  style={{
    display: "flex",
    gap: 22,
    alignItems: "center",
  }}
>
  {/* rating */}

  {metadata.rating && (
    <img
      src={`/assets/meta/${
        metadata.rating.includes("r18") ||
        ["18","15","12","12a","pg","u"].includes(metadata.rating)
          ? `bbfc/${metadata.rating}`
          : `mpaa/${metadata.rating}`
      }.png`}
      style={{
        height: 52,
        objectFit: "contain",
      }}
    />
  )}

  {/* runtime */}

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "white",
      fontSize: 18,
    }}
  >
    <img
      src="/assets/meta/runtime/clock.png"
      style={{
        height: 34,
      }}
    />

    <span>
      {metadata.runtime} MIN
    </span>
  </div>

  {/* cc */}

  {metadata.cc && (
    <img
      src="/assets/meta/subtitles/cc.png"
      style={{
        height: 42,
      }}
    />
  )}

  {/* resolution */}

  {metadata.resolution && (
    <img
      src={`/assets/meta/resolution/${metadata.resolution}.png`}
      style={{
        height: 42,
      }}
    />
  )}
</div>

      {/* =========================
          RIGHT — QR/BARCODE
      ========================= */}

      <div
        style={{
          width: 120,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {metadata.qi?.tmdbUrl ? (
          <img
            src="/assets/meta/qi/tmdb.png"
            style={{
              height: 72,
            }}
          />
        ) : metadata.qi?.imdbUrl ? (
          <img
            src="/assets/meta/qi/imdb.png"
            style={{
              height: 72,
            }}
          />
        ) : (
          <img
            src="/assets/meta/barcode/barcode.png"
            style={{
              height: 72,
            }}
          />
        )}
      </div>
    </div>
  );
}