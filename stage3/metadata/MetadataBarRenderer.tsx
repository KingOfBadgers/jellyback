"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — METADATA BAR RENDERER
 * =========================================================
 *
 * PURPOSE
 * ---
 * Renders a deterministic 1000×100 DVD-style metadata bar.
 *
 * CRITICAL RULES:
 * - NO flex-based layout for slot distribution
 * - NO responsive scaling logic inside this component
 * - NO metadata inference
 * - ONLY consumes precomputed MetadataRenderPlan
 *
 * The goal is pixel-stable rendering at export + preview scale.
 * =========================================================
 */

import React from "react";
import type { MetadataRenderPlan } from "@/stage3/metadata/buildMetadataRenderPlan";

type Props = {
  plan: MetadataRenderPlan;
};

export default function MetadataBarRenderer({ plan }: Props) {
  const traceId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36);

  console.log("[STAGE3][METADATA RENDER] START", {
    traceId,
    variant: plan.variant,
    slotCount: plan.slots.length,
  });

  /**
   * =========================================================
   * BASE STYLES (POLISHED STEEL BACKGROUND)
   * =========================================================
   */
  const baseStyle: React.CSSProperties = {
    width: 1000,
    height: 100,

    position: "relative",

    overflow: "hidden",

    /**
     * Polished steel base (NOT dark — required for MPAA transparency)
     */
    background:
      "linear-gradient(180deg, #bfc5cc 0%, #8f98a3 50%, #aeb6bf 100%)",

    borderTop: "1px solid rgba(255,255,255,0.25)",
    borderBottom: "1px solid rgba(0,0,0,0.35)",

    boxSizing: "border-box",
  };

  /**
   * =========================================================
   * SLOT RENDERING (ABSOLUTE POSITIONED)
   * =========================================================
   *
   * IMPORTANT:
   * We do NOT use flex.
   * We DO NOT distribute dynamically.
   * Each slot is laid out sequentially in fixed coordinates.
   */
  let cursorX = 20; // left padding baseline

  const slotElements = plan.slots.map((slot, index) => {
    const x = cursorX;
    const width = slot.width;

    cursorX += width + 10; // fixed spacing

    /**
     * -----------------------------------------------------
     * SLOT CONTENT RENDERING
     * -----------------------------------------------------
     */
    const content = (() => {
      switch (slot.type) {
        case "LOGO":
          return slot.src ? (
            <img
              src={slot.src}
              style={{
                height: 70,
                objectFit: "contain",
              }}
            />
          ) : null;

        case "RATING":
        case "RESOLUTION":
        case "RUNTIME":
          return (
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "black",
                letterSpacing: 1,
              }}
            >
              {slot.value}
            </div>
          );

        case "CC":
          return (
            <img
              src="/assets/meta/subtitles/cc.png"
              style={{ height: 28 }}
            />
          );

        case "BARCODE":
          return (
            <div
              style={{
                width: "100%",
                height: 60,
                backgroundImage:
                  "repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px)",
                opacity: 0.75,
              }}
            />
          );

        default:
          return null;
      }
    })();

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: x,
          top: 0,

          width,
          height: 100,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          overflow: "hidden",
        }}
      >
        {content}
      </div>
    );
  });

  /**
   * =========================================================
   * SYSTEM MARK (JB — ALWAYS FIXED POSITION)
   * =========================================================
   */
  const jbElement = (
    <div
      style={{
        position: "absolute",
        right: 10,
        bottom: 10,

        width: plan.systemAssets.jb.width,
        height: 30,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={plan.systemAssets.jb.src}
        style={{
          height: 24,
          objectFit: "contain",
        }}
      />
    </div>
  );

  /**
   * =========================================================
   * FINAL RENDER
   * =========================================================
   */
  return (
    <div style={baseStyle}>
      {slotElements}
      {jbElement}
    </div>
  );
}