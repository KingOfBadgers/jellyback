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

        position: "relative",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        boxSizing: "border-box",

        borderTop:
          "1px solid rgba(255,255,255,.08)",
      }}
    >

      {/* TOP DECORATIVE LINE */}

      <div
        style={{
          width: 260,
          height: 1,
          background:
            "rgba(255,255,255,.18)",
          marginBottom: 22,
        }}
      />


      {/* METADATA */}

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
            color:
              "rgba(255,255,255,.35)",
            fontSize: 14,
          }}
        >
          •
        </span>

        <span>{runtimeText}</span>

        <span
          style={{
            color:
              "rgba(255,255,255,.35)",
            fontSize: 14,
          }}
        >
          •
        </span>

        <span>{resolutionText}</span>
      </div>


      {/* BOTTOM DECORATIVE LINE */}

      <div
        style={{
          width: 260,
          height: 1,
          background:
            "rgba(255,255,255,.18)",
          marginTop: 22,
        }}
      />


      {/* QR CODE — RIGHT ANCHORED */}

      {footer.qr?.svg && (
        <div
          style={{
            position: "absolute",

            right: 18,

            top: 10,

            width: 130,
            height: 130,

            display: "flex",

            justifyContent: "center",
            alignItems: "center",

            background: "#ffffff",

            padding: 4,

            boxSizing: "border-box",
          }}

          dangerouslySetInnerHTML={{
            __html:
              footer.qr.svg,
          }}
        />
      )}

    </div>
  );
}