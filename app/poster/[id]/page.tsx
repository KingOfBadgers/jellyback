"use client";

import { useEffect, useState } from "react";
import PosterCanvas from "./components/PosterCanvas";
import PosterSidebar from "./components/PosterSidebar";
import PosterToolbar from "./components/PosterToolbar";
import { useParams } from "next/navigation";

export default function PosterPage() {
  const params = useParams();
  const id = params?.id as string;

  const [draft, setDraft] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [selectedBlockId, setSelectedBlockId] =
    useState<string | null>(null);

  // =========================
  // LOAD STAGE 2 DRAFT
  // =========================
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = sessionStorage.getItem("poster_draft");

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setDraft(parsed);
    } catch (e) {
      console.error("Invalid poster_draft", e);
    }
  }, []);

  if (!draft) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#050505] text-white">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#050505] text-white overflow-hidden">

      {/* TOOLBAR */}
      <PosterToolbar movie={draft.movie} />

      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <PosterSidebar
          movie={draft.movie}
          blocks={blocks}
          setBlocks={setBlocks}
          selectedBlockId={selectedBlockId}
          setSelectedBlockId={setSelectedBlockId}
          assets={draft.assets}
        />

        {/* CANVAS AREA */}
        <div className="flex-1 flex items-center justify-center">
          <PosterCanvas
            draft={draft}
            blocks={blocks}
            setBlocks={setBlocks}
            selectedBlockId={selectedBlockId}
            setSelectedBlockId={setSelectedBlockId}
          />
        </div>

      </div>
    </div>
  );
}