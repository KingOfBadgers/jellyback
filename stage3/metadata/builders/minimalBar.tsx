"use client";

export default function MinimalBar({
  footer,
}: any) {
  const ratingText = footer.rating
    ? footer.rating.toUpperCase()
    : "NOT RATED";

  const runtimeText = footer.runtime
    ? `${footer.runtime} MIN`
    : "UNKNOWN";

  const resolutionText = footer.resolution
    ? footer.resolution.toUpperCase()
    : "STANDARD";

  return (
    <div
      style={{
        width: 1000,
        height: 150,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        background: "#0d0d0d",

        borderTop: "1px solid rgba(255,255,255,0.12)",

        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 940,
          height: 102,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          padding: "0 50px",

          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 12,

          background:
            "linear-gradient(180deg,#1a1a1a 0%,#121212 100%)",

          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* =========================
    RATING
========================= */}

<div
  style={{
    width: ratingText === "NOT RATED" ? 230 : 170,
    textAlign: "center",
    flexShrink: 0,
  }}
>
  <div
    style={{
      fontSize: 12,
      letterSpacing: 3,
      color: "#777",
      marginBottom: 10,
    }}
  >
    RATING
  </div>

  <div
    style={{
      fontSize: ratingText === "NOT RATED" ? 26 : 30,
      fontWeight: 700,
      color: "#ffffff",
      letterSpacing: ratingText === "NOT RATED" ? 1 : 2,
      whiteSpace: "nowrap",
    }}
  >
    {ratingText}
  </div>
</div>

        {/* =========================
            RUNTIME
        ========================= */}

        <div
          style={{
            width: 220,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 3,
              color: "#777",
              marginBottom: 10,
            }}
          >
            RUNTIME
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: 1,
            }}
          >
            {runtimeText}
          </div>
        </div>

        {/* Divider */}

        <div
          style={{
            width: 1,
            height: 56,
            background: "rgba(255,255,255,0.10)",
          }}
        />

        {/* =========================
            FORMAT
        ========================= */}

        <div
          style={{
            width: 190,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 3,
              color: "#777",
              marginBottom: 10,
            }}
          >
            FORMAT
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: 2,
            }}
          >
            {resolutionText}
          </div>
        </div>
      </div>
    </div>
  );
}