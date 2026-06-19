"use client";

import React from "react";
import type { MetadataRenderPlan } from "@/stage3/metadata/buildMetadataRenderPlan";

type Props = {
  plan?: MetadataRenderPlan | null;
};

export default function Stage3MetadataStripRenderer({ plan }: Props) {
  const safePlan: MetadataRenderPlan = plan ?? {
    width: 1000,
    height: 150,
    variant: "MINIMAL",
    slots: [
      {
        type: "RUNTIME",
        width: 200,
        value: "NO PLAN",
      },
      {
        type: "BARCODE",
        width: 400,
        icon: {
          src: "/assets/meta/barcode/barcode.png",
        },
      },
    ],
  };

  let cursorX = 30;

  const slots = safePlan.slots.map((slot, index) => {
    const x = cursorX;
    cursorX += slot.width + 10;

    const content = (() => {
      switch (slot.type) {
        case "LOGO":
        case "RATING":
        case "CC":
        case "BARCODE":
        case "JB":
          return slot.icon?.src ? (
            <img
              src={slot.icon.src}
              style={{
                height: slot.type === "BARCODE" ? 70 : 45,
                objectFit: "contain",
              }}
            />
          ) : null;

        case "RUNTIME":
        case "RESOLUTION":
          return (
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#000",
              }}
            >
              {slot.value ?? ""}
            </div>
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
          width: slot.width,
          height: 150,

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

  return (
    <div
      style={{
        width: 1000,
        height: 150,
        position: "relative",
        overflow: "hidden",

        background:
          "linear-gradient(180deg, #c3c9d1 0%, #8e97a3 50%, #b3bbc6 100%)",
      }}
    >
      {slots}
    </div>
  );
}