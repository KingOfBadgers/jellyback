"use client";

import React from "react";

import { resolveMetadataBar } from "@/stage3/metadata/resolveMetadataBar";
import { generateMetadataBarVariants } from "@/stage3/metadata/generateMetadataBarVariants";
import MetadataBarRenderer from "@/stage3/metadata/MetadataBarRenderer";

/**
 * =========================================================
 * JellyBack Stage 3 — Metadata Layer Adapter
 * =========================================================
 * HUMAN:
 * This file is the ONLY integration point between:
 * - Stage 3 Renderer
 * - Metadata Variant System
 *
 * AI:
 * Adapter layer (no UI logic, only orchestration).
 * =========================================================
 */

type Props = {
  seed: any;
};

const log = (msg: string, data?: any) =>
  console.log(`[METADATA LAYER] ${msg}`, data ?? {});

export default function MetadataLayer({ seed }: Props) {
  if (!seed) return null;

  log("RENDER_START", { movieId: seed?.movieId });

  // =========================================================
  // STEP 1 — resolve raw metadata
  // =========================================================
  const resolved = resolveMetadataBar(seed);

  log("RESOLVED", resolved);

  // =========================================================
  // STEP 2 — generate valid variants
  // =========================================================
  const variants = generateMetadataBarVariants(resolved, seed);

  log("VARIANTS", variants);

  // =========================================================
  // STEP 3 — select variant (TEMP: first valid)
  // =========================================================
  const selected = variants[0];

  log("SELECTED", selected);

  // =========================================================
  // STEP 4 — render
  // =========================================================
  return <MetadataBarRenderer variant={selected} />;
}