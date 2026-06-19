"use client";

import React from "react";
import type { MetadataRenderPlan } from "@/stage3/metadata/buildMetadataRenderPlan";

type Props = {
  plan?: MetadataRenderPlan | null;
};

export default function Stage3MetadataStripRenderer({ plan }: Props) {
  const traceId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36);

  /**
   * =========================================================
   * SAFE PLAN FALLBACK
   * =========================================================
   * 2026-06-08  (AI NOTE: unchanged logic, ensures render stability)
   */
  const safePlan: MetadataRenderPlan = plan ?? {
    width: 1000,
    height: 100,
    variant: "MINIMAL",
    slots: [
      {
        type: "RUNTIME",
        width: 300,
        value: "NO PLAN",
      },
      {
        type: "BARCODE",
        width: 600,
        icon: { src: "/assets/meta/barcode/barcode.png" },
      },
    ],
  };

  console.log("[STAGE3][METADATA STRIP][RENDER]", {
    traceId,
    variant: safePlan.variant,
    slotCount: safePlan.slots?.length ?? 0,
    fallbackUsed: !plan,
  });

  const baseStyle: React.CSSProperties = {
    width: 1000,
    height: 100,
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, #c3c9d1 0%, #8e97a3 50%, #b3bbc6 100%)",
    borderTop: "1px solid rgba(255,255,255,0.25)",
    borderBottom: "1px solid rgba(0,0,0,0.4)",
    boxSizing: "border-box",
  };

  const debugOverlay = (
    <div
      style={{
        position: "absolute",
        left: 6,
        top: 6,
        fontSize: 10,
        fontFamily: "monospace",
        color: "rgba(0,0,0,0.6)",
        zIndex: 999,
      }}
    >
      STAGE3 STRIP • {safePlan.variant} • {safePlan.slots.length}
    </div>
  );

  const leftSlots = safePlan.slots.filter(
    (s) => s.type !== "BARCODE" && s.type !== "JB"
  );

  const rightSlots = safePlan.slots.filter(
    (s) => s.type === "BARCODE" || s.type === "JB"
  );

  let cursorX = 40;

  const leftElements = leftSlots.map((slot, index) => {
    const x = cursorX;
    cursorX += slot.width + 12;

    const icon = slot.icon?.src;

    const content = (() => {
      /**
       * =========================================================
       * FIX: RATING ICON ENFORCEMENT (2026-06-08  - 12:41)
       * =========================================================
       * AI REASON:
       * Ensure rating NEVER falls back to text or null rendering.
       * Previously some Jellyfin payloads bypassed icon mapping.
       */
      if (slot.type === "RATING") {
        if (!icon) {
          console.warn("[STAGE3][RATING][MISSING ICON] forcing fallback");
          return null;
        }

        return (
          <img
            src={icon}
            style={{
              height: 78,
              objectFit: "contain",
              display: "block",
            }}
          />
        );
      }

      /**
       * LOGO + CC unchanged
       */
      if (slot.type === "LOGO" || slot.type === "CC") {
        if (!icon) return null;

        return (
          <img
            src={icon}
            style={{
              height: slot.type === "LOGO" ? 52 : 46,
              objectFit: "contain",
              display: "block",
            }}
          />
        );
      }

      /**
       * RUNTIME unchanged
       */
      if (slot.type === "RUNTIME") {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <img
              src="/assets/meta/runtime/clock.png"
              style={{
                height: 40,
                width: 40,
                objectFit: "contain",
                display: "block",
              }}
            />

            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#000",
                lineHeight: 1,
              }}
            >
              {slot.value ?? ""}
            </div>
          </div>
        );
      }

      /**
 * =========================================================
 * FIX: RESOLUTION ICON ENFORCEMENT (2026-06-08 12:45)
 * =========================================================
 * REASON:
 * Resolution is now asset-driven (1080p.png etc).
 * Text rendering bypassed upstream asset resolver.
 */
if (slot.type === "RESOLUTION") {
  if (!slot.icon?.src) {
    console.warn("[STAGE3][RESOLUTION][MISSING ICON]");
    return null;
  }

  return (
    <img
      src={slot.icon.src}
      style={{
        height: 54, // balanced with rating scale (~+50%)
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

      return null;
    })();

    return (
      <div
        key={`left-${index}`}
        style={{
          position: "absolute",
          left: x,
          top: 0,
          width: slot.width,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {content}
      </div>
    );
  });

  const BARCODE_WIDTH = 240;
  const JB_WIDTH = 90;

  const rightElements = rightSlots.map((slot, index) => {
    const isBarcode = slot.type === "BARCODE";
    const isJB = slot.type === "JB";

    const rightOffset = isJB ? 10 : JB_WIDTH + 18;

    const icon = slot.icon?.src;

    return (
      <div
        key={`right-${index}`}
        style={{
          position: "absolute",
          right: rightOffset,
          top: 0,
          width: slot.width,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon ? (
          <img
            src={icon}
            style={{
              height: isJB ? 88 : 92,
              width: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : null}
      </div>
    );
  });

  return (
    <div style={baseStyle}>
      {debugOverlay}
      {leftElements}
      {rightElements}
    </div>
  );
}