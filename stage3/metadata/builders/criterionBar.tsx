"use client";

export default function CriterionBar({
  footer,
}: any) {
  return (
    <div
      style={{
        width: 1000,
        height: 80,

        background: "white",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        fontSize: 20,
        fontFamily: "Georgia, serif",

        letterSpacing: 1.5,
      }}
    >
      {footer.rating}
      &nbsp; • &nbsp;
      {footer.runtime} MIN
      &nbsp; • &nbsp;
      {footer.resolution}
    </div>
  );
}