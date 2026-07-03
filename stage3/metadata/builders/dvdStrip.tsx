"use client";

export default function DVDStrip({
  footer,
}: any) {

  console.log("[FOOTER]", footer);

  return (
    <div
      style={{
        width: 1000,
        height: 150,

        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",

        /**
         * CHANGE: 2026-07-01
         * REASON: DVD strip requires full-height column alignment
         */
        alignItems: "stretch",

        background: "#f2f2f2",
        borderTop: "1px solid rgba(0,0,0,0.15)",
        boxSizing: "border-box",
        padding: "0 12px",
      }}
    >
      {/* =========================
          RATING
      ========================= */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {footer.rating && (
          <img
            src={`/assets/meta/${
              footer.rating.includes("r18") ||
              ["18", "15", "12", "12a", "pg", "u"].includes(footer.rating)
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <img
          src="/assets/meta/runtime/clock.png"
          style={{ height: 28 }}
        />
        <span style={{ fontSize: 20 }}>
          {footer.runtime ? `${footer.runtime} min` : null}
        </span>
      </div>

      {/* =========================
          CC
      ========================= */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src="/assets/meta/subtitles/cc.png"
          style={{ height: 42 }}
        />
      </div>

      {/* =========================
          RESOLUTION
      ========================= */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {footer.resolution && (
          <img
            src={`/assets/meta/resolution/${footer.resolution}.png`}
            style={{ height: 42 }}
          />
        )}
      </div>

      {/* =========================
    QI CODE (DETERMINISTIC RESOLUTION)
========================= */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  }}
>
  {/* =====================================================
      CHANGE: 2026-07-01
      REASON: Deterministic priority-based QR resolution
  ===================================================== */}

  {footer.qi?.tmdbUrl ? (
    <img
      src="/assets/meta/qi/tmdb.png"
      style={{ height: 48 }}
    />
  ) : footer.qi?.imdbUrl ? (
    <img
      src="/assets/meta/qi/imdb.png"
      style={{ height: 48 }}
    />
  ) : (
    <img
      src="/assets/meta/barcode/barcode.png"
      style={{ height: 48 }}
    />
  )}
</div>

      {/* =========================
          JB ICON
      ========================= */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src="/assets/meta/jb/jb.png"
          style={{ height: 44 }}
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