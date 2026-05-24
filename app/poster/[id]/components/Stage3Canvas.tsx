"use client";

import { useRef, useState } from "react";

type Element = {
  id: string;
  type: "logo" | "banner" | "clearart";
  x: number;
  y: number;
  scale: number;
  src: string;
};

export default function Stage3Canvas({
  img,
  movie,
}: {
  img: string;
  movie: any;
}) {
  const draggingId = useRef<string | null>(null);

  const [elements, setElements] = useState<Element[]>([]);

  // =========================
  // ADD ELEMENT
  // =========================
  function addElement(
    type: "logo" | "banner" | "clearart"
  ) {
    const src = movie?.[type];

    if (!src) return;

    setElements((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        src,
        x: 50,
        y: 20,
        scale: 1,
      },
    ]);
  }

  // =========================
  // DRAGGING
  // =========================
  function onPointerMove(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    if (!draggingId.current) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    setElements((prev) =>
      prev.map((el) =>
        el.id === draggingId.current
          ? { ...el, x, y }
          : el
      )
    );
  }

  function onPointerUp() {
    draggingId.current = null;
  }

  return (
    <>
      {/* LEFT SIDEBAR */}
      <div className="w-64 border-r border-white/10 bg-[#050505] p-4 flex flex-col gap-2">
        <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
          Assets
        </div>

        {movie?.logo && (
          <button
            onClick={() => addElement("logo")}
            className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition px-4 py-3 text-left text-sm text-white"
          >
            Logo
          </button>
        )}

        {movie?.banner && (
          <button
            onClick={() => addElement("banner")}
            className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition px-4 py-3 text-left text-sm text-white"
          >
            Banner
          </button>
        )}

        {movie?.clearart && (
          <button
            onClick={() => addElement("clearart")}
            className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition px-4 py-3 text-left text-sm text-white"
          >
            Clearart
          </button>
        )}
      </div>

      {/* POSTER STAGE */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div
          className="relative aspect-[2/3] h-[95vh]"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {/* BASE IMAGE */}
          <img
            src={img}
            className="absolute inset-0 w-full h-full object-contain"
            draggable={false}
          />

          {/* ELEMENTS */}
          {elements.map((el) => (
            <div
              key={el.id}
              onPointerDown={() => {
                draggingId.current = el.id;
              }}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                transform:
                  "translate(-50%, -50%)",
              }}
            >
              <img
                src={el.src}
                draggable={false}
                style={{
                  width: 180,
                  height: "auto",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}