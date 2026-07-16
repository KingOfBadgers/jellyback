"use client";

export default function iconbar({
  footer,
}: any) {
  console.log("[FOOTER]", footer);

const columns =
  "180px 150px 150px 150px 150px 150px";

function formatRuntime(minutes?: number) {
  if (!minutes) return "";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${mins}m`;
}

  return (
    <div
      style={{
        width: 1000,
        height: 150,

        display: "grid",
        gridTemplateColumns: columns,

        alignItems: "center",

        background: "#8C6A3B",
borderTop: "1px solid #5A3E20",
borderBottom: "1px solid #B08D57",

        boxSizing: "border-box",

        padding: "0 18px",

        columnGap: 10,
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
      src={
        footer.rating === "not-rated"
          ? "/assets/meta/mpaa/nr.png"
          : `/assets/meta/${
              footer.rating.includes("r18") ||
              ["18", "15", "12", "12a", "pg", "u"].includes(
                footer.rating
              )
                ? `bbfc/${footer.rating}`
                : `mpaa/${footer.rating}`
            }.png`
      }
      style={{
        height:
          footer.rating === "not-rated"
            ? 74      // or whatever size matches your new icon
            : 108,    // existing certification size

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
            height: 50,
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
          {formatRuntime(footer.runtime)}
        </div>

        <div
          style={{
            fontSize: 14,
            letterSpacing: 2,
            color: "#222",
          }}
        >
          Run Time
        </div>
      </div>

      {/* =========================
          CC
      ========================= */}

      <div
  style={{
    display: "flex",
    justifyContent: "center",
  }}
>
  <img
    src={
      footer.cc
        ? "/assets/meta/subtitles/cc.png"
        : "/assets/meta/subtitles/nocc.png"
    }
    style={{
      height: 140,
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
        }}
      >
        {footer.resolution && (
          <img
            src={`/assets/meta/resolution/${footer.resolution}.png`}
            style={{
              height: 140,
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
    alignItems: "center",
  }}
>
{footer.qr?.svg ? (
  <div
  style={{
    width: 140,
    height: 140,
  }}
  dangerouslySetInnerHTML={{
    __html: footer.qr.svg.replace(
      "<svg",
      '<svg width="140" height="140"'
    ),
  }}
/>
) : (
  <img
    src="/assets/meta/barcode/barcode.png"
    style={{
      height: 140,
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
            height: 140,
          }}
        />
      </div>

      
      </div>
    
  );
}