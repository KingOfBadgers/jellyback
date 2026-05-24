"use client";

import { useRef } from "react";

export default function PosterCanvas({
  draft,
  blocks,
  setBlocks,
  selectedBlockId,
  setSelectedBlockId,
}: any) {
  const poster = draft.posterBackground;
  const movie = draft.movie;

  const dragRef = useRef<any>(null);

  // =========================
  // BLOCK DRAG
  // =========================
  function startDrag(id: string) {
    dragRef.current = { id };
    setSelectedBlockId(id);
  }

  function onDrag(e: any) {
    if (!dragRef.current?.id) return;

    const id = dragRef.current.id;

    setBlocks((prev: any[]) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              x: b.x + e.movementX,
              y: b.y + e.movementY,
            }
          : b
      )
    );
  }

  function stopDrag() {
    dragRef.current = null;
  }

  const selectedBlock = blocks.find(
    (b) => b.id === selectedBlockId
  );

  return (
    <div className="relative">
      {/* CANVAS */}
      <div
        className="relative bg-black border border-white/10 rounded-xl overflow-hidden"
        style={{
          width: 1000,
          height: 1500,
        }}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {/* BACKGROUND */}
        {poster && (
          <img
            src={poster}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        )}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* BLOCKS */}
        {blocks.map((block) => {
          const selected = block.id === selectedBlockId;

          return (
            <div
              key={block.id}
              onMouseDown={() => startDrag(block.id)}
              onClick={() => setSelectedBlockId(block.id)}
              className={`absolute cursor-move px-3 py-1 rounded border ${
                selected
                  ? "border-blue-400 bg-blue-500/20"
                  : "border-white/10 bg-black/40"
              }`}
              style={{
                left: block.x,
                top: block.y,
                fontSize: block.fontSize || 16,
                color: block.color || "white",
              }}
            >
              {block.text}
            </div>
          );
        })}

        {/* SELECTION BOX */}
        {selectedBlock && (
          <div
            className="absolute border-2 border-blue-400 pointer-events-none"
            style={{
              left: selectedBlock.x,
              top: selectedBlock.y,
              width: selectedBlock.width || 120,
              height: selectedBlock.height || 40,
            }}
          />
        )}
      </div>
    </div>
  );
}