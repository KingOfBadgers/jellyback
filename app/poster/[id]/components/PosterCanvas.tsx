"use client";

import { useEffect, useState } from "react";

export default function PosterCanvas({ draft }: any) {
  const W = 1000;
  const H = 1500;

  const background = draft?.background;

  const image = draft?.image || {
    x: 0,
    y: 0,
    zoom: 1,
  };

  const [img, setImg] = useState<any>(null);

  useEffect(() => {
    if (!background) return;

    const i = new Image();
    i.src = background;

    i.onload = () => setImg(i);
  }, [background]);

  if (!img) {
    return (
      <div className="w-full h-full bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // =========================
  // SINGLE SOURCE OF TRUTH SCALE
  // =========================
  const scale = Math.max(W / img.width, H / img.height);

  const renderW = img.width * scale;
  const renderH = img.height * scale;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">

      {/* FIXED STAGE */}
      <div
        style={{
          width: W,
          height: H,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
        }}
      >

        {/* IMAGE LAYER (ONLY ONE SYSTEM) */}
        <img
          src={background}
          draggable={false}
          style={{
            position: "absolute",

            width: renderW,
            height: renderH,

            left: image.x,
            top: image.y,

            // 🔥 IMPORTANT:
            // ONLY zoom here — no background-size, no extra transforms
            transform: `scale(${image.zoom})`,
            transformOrigin: "center",

            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        {/* FRAME */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "2px solid rgba(255,255,255,0.4)",
          }}
        />
      </div>
    </div>
  );
}