"use client";

export default function CriterionBar({
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

      background: "#f7f3eb",

      color: "#222",

      display: "flex",
      alignItems: "center",

      boxSizing: "border-box",

      borderTop: "1px solid #d5d0c7",

      padding: "0 18px",
    }}
  >

    {/* METADATA AREA */}

    <div
      style={{
        flex: 1,

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        paddingRight: 20,
      }}
    >

      {/* Certification */}

      <div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: 4,
            color: "#8b857b",
            marginBottom: 8,
          }}
        >
          CERTIFICATION
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: 2,
          }}
        >
          {ratingText}
        </div>
      </div>


      {/* Divider */}

      <div
        style={{
          width: 1,
          height: 70,
          background: "#d5d0c7",
        }}
      />


      {/* Runtime */}

      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 4,
            color: "#8b857b",
            marginBottom: 8,
          }}
        >
          RUNNING TIME
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: 2,
          }}
        >
          {runtimeText}
        </div>
      </div>


      {/* Divider */}

      <div
        style={{
          width: 1,
          height: 70,
          background: "#d5d0c7",
        }}
      />


      {/* Presentation */}

      <div
        style={{
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 4,
            color: "#8b857b",
            marginBottom: 8,
          }}
        >
          PRESENTATION
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: 2,
          }}
        >
          {resolutionText}
        </div>
      </div>

    </div>


    {/* QR CODE RIGHT */}

    {footer.qr && (
      <div
        style={{
          width: 120,
          height: 120,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          flexShrink: 0,
        }}
        dangerouslySetInnerHTML={{
          __html: footer.qr.svg,
        }}
      />
    )}

  </div>
);
}