"use client";

import { useEffect, useRef, useState } from "react";
import useImage from "use-image";

export default function PosterCanvas({
  draft,
}: any) {
  // =========================
  // TRUE EXPORT SIZE
  // =========================
  const EXPORT_WIDTH = 1000;
  const EXPORT_HEIGHT = 1500;

  // =========================
  // DRAFT
  // =========================
  const background =
    draft?.background || null;

  const imageState =
    draft?.image || {
      x: 0,
      y: 0,
      scale: 1,
    };

  const [img] = useImage(
    background || ""
  );

  // =========================
  // CONTAINER SCALE
  // scales logical 1000x1500
  // into visible preview
  // =========================
  const containerRef =
    useRef<HTMLDivElement>(
      null
    );

  const [
    previewScale,
    setPreviewScale,
  ] = useState(1);

  useEffect(() => {
    function updateScale() {
      if (
        !containerRef.current
      )
        return;

      const rect =
        containerRef.current.getBoundingClientRect();

      setPreviewScale(
        rect.width /
          EXPORT_WIDTH
      );
    }

    updateScale();

    const observer =
      new ResizeObserver(
        updateScale
      );

    if (
      containerRef.current
    ) {
      observer.observe(
        containerRef.current
      );
    }

    return () =>
      observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg border border-white/20 bg-black"
    >
      {/* =========================
          BACKGROUND
          SCALED PREVIEW REPLAY
      ========================= */}
      {img && (
        <img
          src={background}
          alt=""
          draggable={false}
          style={{
            position:
              "absolute",

            left:
              imageState.x *
              previewScale,

            top:
              imageState.y *
              previewScale,

            transform: `scale(${
              imageState.scale *
              previewScale
            })`,

            transformOrigin:
              "top left",

            maxWidth:
              "none",

            pointerEvents:
              "none",

            userSelect:
              "none",
          }}
        />
      )}

      {/* SUBTLE OVERLAY */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* LABEL */}
      <div className="absolute top-2 left-2 text-[10px] text-white/60 z-20 pointer-events-none">
        1000 × 1500 poster
      </div>
    </div>
  );
}