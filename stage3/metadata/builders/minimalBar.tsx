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

        background: "#111",

        color: "white",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 60,

        fontSize: 18,
        letterSpacing: 2,
      }}
    >
      <div>{footer.rating?.toUpperCase()}</div>

      <div>{footer.runtime} MIN</div>

      <div>{footer.resolution?.toUpperCase()}</div>
    </div>
  );
}