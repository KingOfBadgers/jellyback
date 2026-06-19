"use client";

import { POSTER_SLOTS, Slot } from "@/lib/poster/xxxslots";
import { PosterDraft } from "@/lib/poster/xxxposterTypes";

function resolveStyle(slot: Slot) {
  return {
    position: "absolute" as const,
    left: `${slot.x}%`,
    top: `${slot.y}%`,
    width: `${slot.w}%`,
    height: `${slot.h}%`,
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

export default function SlotRenderer({
  slot,
  children,
}: {
  slot: Slot;
  children: React.ReactNode;
}) {
  return <div style={resolveStyle(slot)}>{children}</div>;
}