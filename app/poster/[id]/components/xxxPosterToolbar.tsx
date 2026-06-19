"use client";

export default function PosterToolbar({ movie }: any) {
  function exportPoster() {
    alert("Export coming next stage");
  }

  return (
    <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
      <div className="text-sm">
        {movie?.title}
      </div>

      <button
        onClick={exportPoster}
        className="bg-white text-black px-3 py-1 rounded text-xs"
      >
        Export 1000×1500
      </button>
    </div>
  );
}