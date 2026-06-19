"use client";

import React from "react";

import { resolveBackground } from "@/stage3/engine/backgroundResolver";

type Props = {
  seed: any;
};

export default function Stage3CanvasShell({ seed }: Props) {
  const background = resolveBackground(seed);

  return (
    <div
      style={{
        width: 1000,
        height: 1500,
        backgroundColor: "#000",
        position: "relative",
      }}
    >
      {/* ART ZONE (SPRINT 1 ONLY BACKGROUND) */}
      <div
        style={{
          width: "100%",
          height: "1350px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={background}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* METADATA BAR RESERVED BUT NOT ACTIVE IN SPRINT 1 */}
      <div
        style={{
          width: "100%",
          height: "150px",
          background: "#111",
        }}
      />
    </div>
  );
}