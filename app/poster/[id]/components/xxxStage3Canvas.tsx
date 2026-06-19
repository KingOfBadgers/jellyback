"use client";

import { useEffect, useRef, useState } from "react";

import { resolveMetadataAssets } from "@/lib/assetResolver";
import { formatRuntime } from "@/lib/formatRuntime";
import { normaliseJellyfinMovie } from "@/lib/jellyfinMetadata";

type AssetElement = {
  id: string;
  type: "logo" | "banner" | "clearart";
  x: number;
  y: number;
  scale: number;
  z: number;
  opacity: number;
  depth: number;
  locked?: boolean;
  src: string;
  hidden?: boolean;
};

type MetadataBarElement = {
  id: string;
  type: "metadataBar";
  y: number;
  z: number;
  opacity: number;
  locked?: boolean;
  hidden?: boolean;

  showMpaa: boolean;
  showBbfc: boolean;
  showRuntime: boolean;
  showResolution: boolean;
  showSubtitles: boolean;
};

type Element = AssetElement | MetadataBarElement;

export default function Stage3Canvas({
  img,
  movie,
}: {
  img: string;
  movie: any;
}) {
  const draggingId = useRef<string | null>(null);
  const resizingId = useRef<string | null>(null);

  const resizeStartScale = useRef<number>(1);
  const resizeStartX = useRef<number>(0);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [elements, setElements] = useState<Element[]>([]);
  const [fullMovie, setFullMovie] = useState<any>(null);
  const hasFetchedRef = useRef(false);

  const selected = elements.find((e) => e.id === selectedId);

  const [debug, setDebug] = useState<any>({
    meta: null,
    assets: [],
    runtime: null,
  });

  function safeMetaKey(value?: string) {
    if (!value) return null;
    return value.toString().toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  useEffect(() => {
    if (!movie?.id) return;
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;

    fetch(`/api/jellyfin/items/${movie.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) return;
        setFullMovie(data);
      })
      .catch(() => {});
  }, [movie?.id]);

  useEffect(() => {
    if (!fullMovie) return;

    const meta = normaliseJellyfinMovie(fullMovie);

    const assets = resolveMetadataAssets({
      mpaa: meta?.mpaa,
      bbfc: meta?.bbfc,
      resolution: meta?.resolution,
      subtitles: meta?.subtitles,
    });

    const runtime = formatRuntime(meta?.runtime);

    setDebug({
      meta,
      assets,
      runtime,
    });
  }, [fullMovie]);

  function getTopZ(list: Element[]) {
    return list.reduce((m, e) => Math.max(m, e.z), 0);
  }

  function getDepthStyle(depth: number = 1) {
    const d = Math.max(0.5, Math.min(3, depth));

    return {
      filter: `
        drop-shadow(0px ${d * 4}px ${d * 10}px rgba(0,0,0,0.6))
        contrast(${1 + d * 0.08})
        saturate(${1 + d * 0.05})
      `,
    };
  }

  function addElement(type: "logo" | "banner" | "clearart") {
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
        z: getTopZ(prev) + 1,
        opacity: 1,
        depth: 1,
        locked: false,
      },
    ]);
  }

  function addMetadataBar() {
    setElements((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "metadataBar",
        y: 6,
        z: getTopZ(prev) + 1,
        opacity: 1,
        locked: false,
        hidden: false,

        showMpaa: true,
        showBbfc: true,
        showRuntime: true,
        showResolution: true,
        showSubtitles: false,
      },
    ]);
  }

  function updateAssetField(key: keyof AssetElement, value: any) {
    if (!selectedId) return;

    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedId && el.type !== "metadataBar"
          ? { ...el, [key]: value }
          : el
      )
    );
  }

  function toggleLock(id: string) {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, locked: !el.locked } : el
      )
    );
  }

  function deleteElement(id: string) {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, hidden: true } : el
      )
    );

    if (selectedId === id) setSelectedId(null);
  }

  // ✅ FIX: metadata bar is single-instance, no selection dependency
  function updateMetaFlag(key: keyof MetadataBarElement, value: boolean) {
    setElements((prev) =>
      prev.map((el) =>
        el.type === "metadataBar"
          ? { ...el, [key]: value }
          : el
      )
    );
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (resizingId.current) {
      setElements((prev) =>
        prev.map((el) => {
          if (el.id !== resizingId.current) return el;
          if (el.type === "metadataBar") return el;

          const delta =
            (e.clientX - resizeStartX.current) * 0.005;

          return {
            ...el,
            scale: Math.max(0.1, resizeStartScale.current + delta),
          };
        })
      );
      return;
    }

    if (draggingId.current) {
      setElements((prev) =>
        prev.map((el) => {
          if (el.id !== draggingId.current) return el;

          if (el.type === "metadataBar") return el;
          if (el.locked) return el;

          return { ...el, x, y };
        })
      );

      if (selectedId !== draggingId.current) {
        setSelectedId(draggingId.current);
      }
    }
  }

  function stopAll() {
    draggingId.current = null;
    resizingId.current = null;
  }

  function renderMetadata(el: MetadataBarElement) {
    if (el.hidden) return null;

    const meta = debug.meta;
    const runtime = debug.runtime;

    return (
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[85%] bg-black/90 border border-white/10 px-4 py-3 flex justify-between cursor-pointer"
        style={{
          bottom: `${el.y}%`,
          zIndex: el.z,
          opacity: el.opacity,
          ...getDepthStyle(1),
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          setSelectedId(el.id);
        }}
      >
        <div className="flex gap-3 items-center">
          {el.showMpaa && meta?.mpaa && (
            <img src={`/assets/meta/mpaa/${safeMetaKey(meta.mpaa)}.png`} className="h-7" />
          )}
          {el.showBbfc && meta?.bbfc && (
            <img src={`/assets/meta/bbfc/${safeMetaKey(meta.bbfc)}.png`} className="h-7" />
          )}
          {el.showResolution && meta?.resolution && (
            <img src={`/assets/meta/resolution/${safeMetaKey(meta.resolution)}.png`} className="h-7" />
          )}
          {el.showSubtitles && (
            <img src="/assets/meta/subtitles/cc.png" className="h-7" />
          )}
        </div>

        <div className="text-xs text-white/70">{runtime}</div>
      </div>
    );
  }

  function renderAsset(el: AssetElement) {
    if (el.hidden) return null;

    const isSelected = selectedId === el.id;

    return (
      <div
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          left: `${el.x}%`,
          top: `${el.y}%`,
          transform: `translate(-50%, -50%) scale(${el.scale})`,
          zIndex: el.z,
          opacity: el.opacity,
          ...getDepthStyle(el.depth),
          outline: isSelected ? "2px solid white" : "none",
        }}
        onPointerDown={() => {
          draggingId.current = el.id;
          setSelectedId(el.id);
        }}
      >
        <img src={el.src} className="w-[180px]" draggable={false} />

        {isSelected && (
          <div
            onPointerDown={(e) => {
              e.stopPropagation();
              resizingId.current = el.id;
              resizeStartScale.current = el.scale;
              resizeStartX.current = e.clientX;
            }}
            className="absolute w-3 h-3 bg-white"
            style={{ right: -6, bottom: -6 }}
          />
        )}
      </div>
    );
  }

  const assetTypes: AssetElement["type"][] = ["logo", "banner", "clearart"];

  const metadataBar = elements.find((e) => e.type === "metadataBar");

  return (
    <div className="w-full h-full flex bg-black text-white">

      <div className="w-64 border-r border-white/10 p-4">

        <div className="space-y-2">
          {assetTypes.map((type) => (
            <button
              key={type}
              onClick={() => addElement(type)}
              className="w-full text-left px-2 py-1 border border-white/10"
            >
              + {type.toUpperCase()}
            </button>
          ))}
        </div>

        <button onClick={addMetadataBar} className="mt-4">
          Add Metadata Bar
        </button>

        {metadataBar && (
          <div className="mt-6 space-y-2 text-xs">
            <div className="text-white/40">METADATA BAR</div>

            <label>
              <input
                type="checkbox"
                checked={metadataBar.showMpaa}
                onChange={(e) =>
                  updateMetaFlag("showMpaa", e.target.checked)
                }
              />
              MPAA
            </label>

            <label>
              <input
                type="checkbox"
                checked={metadataBar.showBbfc}
                onChange={(e) =>
                  updateMetaFlag("showBbfc", e.target.checked)
                }
              />
              BBFC
            </label>

            <label>
              <input
                type="checkbox"
                checked={metadataBar.showResolution}
                onChange={(e) =>
                  updateMetaFlag("showResolution", e.target.checked)
                }
              />
              Resolution
            </label>

            <label>
              <input
                type="checkbox"
                checked={metadataBar.showSubtitles}
                onChange={(e) =>
                  updateMetaFlag("showSubtitles", e.target.checked)
                }
              />
              Subtitles
            </label>
          </div>
        )}

        <div className="mt-6 space-y-3">
          {assetTypes.map((type) => {
            const el = [...elements]
              .reverse()
              .find((e): e is AssetElement => e.type === type && !e.hidden);

            if (!el) return null;

            const isSelected = selectedId === el.id;

            return (
              <div key={type} className="border border-white/10 p-2 text-xs">
                <div className="flex justify-between">
                  <button onClick={() => setSelectedId(el.id)}>
                    {type.toUpperCase()}
                  </button>

                  <button onClick={() => toggleLock(el.id)}>
                    {el.locked ? "Unlock" : "Lock"}
                  </button>

                  <button onClick={() => deleteElement(el.id)}>
                    Delete
                  </button>
                </div>

                {isSelected && (
                  <>
                    <div>Opacity</div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={el.opacity}
                      onChange={(e) =>
                        updateAssetField("opacity", Number(e.target.value))
                      }
                    />

                    <div>Depth</div>
                    <input
                      type="range"
                      min={0.5}
                      max={3}
                      step={0.1}
                      value={el.depth}
                      onChange={(e) =>
                        updateAssetField("depth", Number(e.target.value))
                      }
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="flex-1 flex items-center justify-center"
        onPointerMove={onPointerMove}
        onPointerUp={stopAll}
        onPointerLeave={stopAll}
      >
        <div className="relative aspect-[2/3] h-[95vh]">
          <img src={img} className="absolute w-full h-full object-contain" />

          {elements.map((el) =>
            el.type === "metadataBar"
              ? renderMetadata(el as MetadataBarElement)
              : renderAsset(el as AssetElement)
          )}
        </div>
      </div>
    </div>
  );
}