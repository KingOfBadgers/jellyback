"use client";

export default function SteelbookBar({
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

        boxSizing: "border-box",

        background:
          "linear-gradient(180deg,#3a3a3a 0%,#2c2c2c 25%,#242424 50%,#2d2d2d 75%,#3b3b3b 100%)",

        borderTop: "1px solid rgba(255,255,255,.18)",

        boxShadow:
          "inset 0 1px rgba(255,255,255,.10), inset 0 -1px rgba(0,0,0,.45)",
      }}
    >
      <div
        style={{
          width: 940,
          height: 96,

          display: "grid",
          gridTemplateColumns: "1fr auto 1fr auto 1fr",

          alignItems: "center",

          border: "1px solid rgba(255,255,255,.10)",

          background:
            "rgba(255,255,255,.03)",

          backdropFilter: "blur(2px)",
        }}
      >
        <div
          style={{
            textAlign: "center",

            color: "#f2f2f2",

            fontSize: 28,
            letterSpacing: 3,
            fontWeight: 600,
          }}
        >
          {ratingText}
        </div>

        <div
          style={{
            width: 1,
            height: 48,
            background: "rgba(255,255,255,.18)",
          }}
        />

        <div
          style={{
            textAlign: "center",

            color: "#f2f2f2",

            fontSize: 28,
            letterSpacing: 3,
            fontWeight: 600,
          }}
        >
          {runtimeText}
        </div>

        <div
          style={{
            width: 1,
            height: 48,
            background: "rgba(255,255,255,.18)",
          }}
        />

        <div
          style={{
            textAlign: "center",

            color: "#f2f2f2",

            fontSize: 28,
            letterSpacing: 3,
            fontWeight: 600,
          }}
        >
          {resolutionText}
        </div>
      </div>
    </div>
  );
}