"use client";

export default function MinimalBar({
  footer,
}: any) {
  return (
    <div
      style={{
        width: 1000,
        height: 70,

        position: "absolute",
        bottom: 0,
        left: 0,

        background: "#0f0f0f",

        color: "#f2f2f2",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        gap: 34,

        fontFamily: "system-ui, sans-serif",
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: 3,

        borderTop: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {footer.rating && (
        <>
          <span>{footer.rating.toUpperCase()}</span>
          <span style={{ opacity: 0.35 }}>•</span>
        </>
      )}

      {footer.runtime && (
        <>
          <span>{footer.runtime} MIN</span>
          <span style={{ opacity: 0.35 }}>•</span>
        </>
      )}

      {footer.resolution && (
        <span>{footer.resolution.toUpperCase()}</span>
      )}
    </div>
  );
}