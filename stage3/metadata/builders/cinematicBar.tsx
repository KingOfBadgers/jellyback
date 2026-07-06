"use client";

export default function CinematicBar({
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

        background: "#050505",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        boxSizing: "border-box",

        borderTop: "1px solid rgba(255,255,255,.08)",
      }}
    >
      {/* Decorative line */}

      <div
        style={{
          width: 260,
          height: 1,
          background: "rgba(255,255,255,.18)",
          marginBottom: 22,
        }}
      />

      {/* Metadata */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,

          color: "#f4f4f4",

          fontSize: 28,
          fontWeight: 300,

          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        <span>{ratingText}</span>

        <span
          style={{
            color: "rgba(255,255,255,.35)",
            fontSize: 14,
          }}
        >
          •
        </span>

        <span>{runtimeText}</span>

        <span
          style={{
            color: "rgba(255,255,255,.35)",
            fontSize: 14,
          }}
        >
          •
        </span>

        <span>{resolutionText}</span>
      </div>

      {/* Bottom decorative line */}

      <div
        style={{
          width: 260,
          height: 1,
          background: "rgba(255,255,255,.18)",
          marginTop: 22,
        }}
      />
    </div>
  );
}