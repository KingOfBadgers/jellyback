"use client";

export default function DVDStrip({
  footer,
}: any) {
  console.log("[FOOTER]", footer);

  const hasCC = footer.cc;

  const columns = hasCC
    ? "110px 130px 90px 120px 120px 80px 1fr"
    : "110px 130px 120px 120px 80px 1fr";

  return (
    <div
      style={{
        width: 1000,
        height: 150,

        display: "grid",
        gridTemplateColumns: columns,

        alignItems: "center",

        background: "#f4f4f4",
        borderTop: "1px solid rgba(0,0,0,0.15)",

        boxSizing: "border-box",

        padding: "0 18px",

        columnGap: 12,
      }}
    >
      {/* =========================
          RATING
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {footer.rating && (
          <img
            src={`/assets/meta/${
              footer.rating.includes("r18") ||
              ["18", "15", "12", "12a", "pg", "u"].includes(
                footer.rating
              )
                ? `bbfc/${footer.rating}`
                : `mpaa/${footer.rating}`
            }.png`}
            style={{
              height: 108,
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <img
          src="/assets/meta/runtime/clock.png"
          style={{
            height: 38,
            opacity: 0.8,
          }}
        />

        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#222",
            lineHeight: 1,
          }}
        >
          {footer.runtime}
        </div>

        <div
          style={{
            fontSize: 12,
            letterSpacing: 2,
            color: "#666",
          }}
        >
          MINUTES
        </div>
      </div>

      {/* =========================
          CC
      ========================= */}

      {hasCC && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/meta/subtitles/cc.png"
            style={{
              height: 74,
            }}
          />
        </div>
      )}

      {/* =========================
          RESOLUTION
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {footer.resolution && (
          <img
            src={`/assets/meta/resolution/${footer.resolution}.png`}
            style={{
              height: 74,
            }}
          />
        )}
      </div>

      {/* =========================
          QR / BARCODE
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {footer.qi?.tmdbUrl ? (
          <img
            src="/assets/meta/qi/tmdb.png"
            style={{
              height: 74,
            }}
          />
        ) : footer.qi?.imdbUrl ? (
          <img
            src="/assets/meta/qi/imdb.png"
            style={{
              height: 74,
            }}
          />
        ) : (
          <img
            src="/assets/meta/barcode/barcode.png"
            style={{
              height: 74,
            }}
          />
        )}
      </div>

      {/* =========================
          JB
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/assets/meta/jb/jb.png"
          style={{
            height: 70,
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

          minWidth: 0,
        }}
      >
        {footer.logo && (
          <img
            src={footer.logo}
            style={{
              width: "100%",
              maxWidth: "100%",

              maxHeight: 112,

              objectFit: "contain",
            }}
          />
        )}
      </div>
    </div>
  );
}