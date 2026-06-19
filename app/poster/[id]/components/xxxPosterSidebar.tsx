"use client";

export default function PosterSidebar({
  blocks,
  setBlocks,
  selectedBlockId,
  setSelectedBlockId,
  assets,
}: any) {
  function addText() {
    setBlocks([
      ...blocks,
      {
        id: crypto.randomUUID(),
        text: "New Text",
        x: 100,
        y: 100,
        fontSize: 28,
        color: "white",
      },
    ]);
  }

  return (
    <div className="w-64 border-r border-white/10 p-4 space-y-4">

      <button
        onClick={addText}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Add Text
      </button>

      <div className="text-xs text-white/50">
        Assets Available:
      </div>

      <div className="text-xs space-y-1 text-white/70">
        {assets?.logo && <div>Logo</div>}
        {assets?.banner && <div>Banner</div>}
        {assets?.clearart && <div>Clearart</div>}
      </div>

    </div>
  );
}