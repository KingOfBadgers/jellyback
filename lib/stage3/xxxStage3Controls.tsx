"use client";

import { PosterDraft } from "@/lib/poster/xxxposterTypes";

export default function Stage3Controls({
  draft,
  setBanner,
  setMetadataPreset,
}: {
  draft: PosterDraft;
  setBanner: (url: string) => void;
  setMetadataPreset: (p: any) => void;
}) {
  return (
    <div className="w-72 border-r border-white/10 p-4 text-sm text-white space-y-6">

      {/* BACKGROUND INFO */}
      <div>
        <div className="text-xs text-white/40 mb-2">BACKGROUND</div>
        <img src={draft.background.baseImage} className="w-full rounded" />
      </div>

      {/* LOGO STATUS */}
      <div>
        <div className="text-xs text-white/40 mb-2">LOGO</div>
        <div className="border border-white/10 p-2">
          {draft.assets.logos.length > 0
            ? "Logo assigned"
            : "No logo selected"}
        </div>
      </div>

      {/* BANNER OPTIONS */}
      <div>
        <div className="text-xs text-white/40 mb-2">BANNER OPTIONS</div>

        <button
          onClick={() => setBanner(draft.assets.banners[0])}
          className="w-full border border-white/10 p-2 mb-2"
        >
          Use Default Banner
        </button>

        <button
          onClick={() => setBanner(draft.assets.banners[1] || "")}
          className="w-full border border-white/10 p-2"
        >
          Try Alternate Banner
        </button>
      </div>

      {/* METADATA PRESETS */}
      <div>
        <div className="text-xs text-white/40 mb-2">METADATA STYLE</div>

        <button
          onClick={() =>
            setMetadataPreset({
              mpaa: draft.metadata.mpaa,
              bbfc: draft.metadata.bbfc,
              runtime: draft.metadata.runtime,
              resolution: draft.metadata.resolution,
              subtitles: false,
            })
          }
          className="w-full border border-white/10 p-2 mb-2"
        >
          DVD Classic
        </button>

        <button
          onClick={() =>
            setMetadataPreset({
              mpaa: draft.metadata.mpaa,
              bbfc: draft.metadata.bbfc,
              runtime: draft.metadata.runtime,
              resolution: draft.metadata.resolution,
              subtitles: true,
            })
          }
          className="w-full border border-white/10 p-2"
        >
          Modern Strip
        </button>
      </div>

    </div>
  );
}