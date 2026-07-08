"use client";

/**
 * =========================================================
 * MINIMAL RENDERER
 * =========================================================
 *
 * Boutique collector edition style
 * Criterion inspired
 * Typography first
 * =========================================================
 */

export default function MinimalRenderer({
  metadata,
}: any) {
  if (!metadata) return null;

  return (
    <div
      style={{
        width: 1000,
        height: 150,

        background: "#f7f7f7",

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        borderTop:
          "1px solid rgba(0,0,0,0.15)",

        boxSizing: "border-box",

        gap: 18,
      }}
    >
      {/* LOGO */}

      <div>
        {metadata.logo && (
          <img
            src={metadata.logo}
            style={{
              maxHeight: 52,
              objectFit: "contain",
            }}
          />
        )}
      </div>

      {/* METADATA */}

      <div
        style={{
          display: "flex",
          gap: 18,

          fontSize: 18,
          color: "#222",

          letterSpacing: "0.08em",
          fontWeight: 400,
        }}
      >
        {metadata.rating && (
          <span>
            {metadata.rating.toUpperCase()}
          </span>
        )}

        {metadata.runtime && (
          <span>
            {metadata.runtime} MIN
          </span>
        )}

        {metadata.resolution && (
          <span>
            {metadata.resolution.toUpperCase()}
          </span>
        )}

        {metadata.cc && (
          <span>
            CC
          </span>
        )}
      </div>
    </div>
  );
}