"use client";

export default function SteelbookBar({
  footer,
}: any) {
  return (
    <div
      style={{
        width: 1000,
        height: 100,

        background:
          "linear-gradient(to right, #666, #999, #666)",

        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",

        color: "black",
        fontWeight: 700,

        borderTop:
          "2px solid rgba(255,255,255,.4)",
      }}
    >
      <div>{footer.rating}</div>

      <div>{footer.runtime} MIN</div>

      <div>{footer.resolution}</div>

      <div>JELLYBACK</div>
    </div>
  );
}