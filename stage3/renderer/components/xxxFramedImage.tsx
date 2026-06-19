"use client";

/**
 * =========================================================
 * FRAMED IMAGE RENDERER
 * =========================================================
 *
 * PURPOSE
 * -------
 * Renders image inside decorative frame.
 *
 * Supports:
 *
 * - Polaroid frames
 * - Film strip overlays
 * - Future magazine cutouts
 *
 * =========================================================
 */

export default function FramedImage({
  src,
  slot,
}: any) {
  const inset =
    slot.imageInset || {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

  return (
    <div
      style={{
        position: "absolute",
        left: slot.x,
        top: slot.y,
        width: slot.width,
        height: slot.height,
        transform: slot.rotation
          ? `rotate(${slot.rotation}deg)`
          : undefined,
        zIndex: slot.zIndex || 1,
      }}
    >
      {/* IMAGE */}
      <img
        src={src}
        alt=""
        style={{
          position: "absolute",

          left: inset.left,
          top: inset.top,

          width:
            slot.width -
            inset.left -
            inset.right,

          height:
            slot.height -
            inset.top -
            inset.bottom,

          objectFit: "cover",
        }}
      />

      {/* FRAME */}
      {slot.frameSrc && (
        <img
          src={slot.frameSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}