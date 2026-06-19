"use client";

import { useMemo } from "react";
import { buildSlots } from "../engine/slotEngine";

export default function Stage3Renderer({
  background,
  assets,
  metadata,
  template,
}: any) {
  const slots = useMemo(
    () => buildSlots(assets, template),
    [assets, template]
  );

  function getAsset(slot: any) {
    const candidates = assets.filter((a: any) =>
      slot.accepts.includes(a.kind)
    );

    if (!candidates.length) return null;

    return candidates.sort(
      (a: any, b: any) => b.quality - a.quality
    )[0];
  }

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">

      {/* DEBUG */}
      <div className="absolute top-2 left-2 z-50 text-white">
        STAGE 3 LOADED
      </div>

      {/* BACKGROUND LAYER (LOCKED) */}
      <div className="absolute inset-0 z-0">
        <img
          src={background}
          className="w-full h-full object-cover"
          onError={() =>
            console.log("BACKGROUND FAILED TO LOAD", background)
          }
          onLoad={() =>
            console.log("BACKGROUND LOADED", background)
          }
        />
      </div>

      {/* OVERLAY LAYER */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {slots.map((slot: any) => {
          const asset = getAsset(slot);

          if (!asset) return null;

          return (
            <img
              key={slot.id}
              src={asset.src}
              style={{
                position: "absolute",
                left: `${slot.layout.x}%`,
                top: `${slot.layout.y}%`,
                width: `${slot.layout.width}%`,
                height: `${slot.layout.height}%`,
                transform: "translate(-50%, -50%)",
                objectFit: "contain",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}