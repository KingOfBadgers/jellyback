"use client";

import { buildFooter } from "./buildFooter";
import { resolveMetadataBuilder } from "./resolveMetadataBuilder";

export default function MetadataBarRenderer({
  seed,
  style,
}: any) {
  const footer = buildFooter(seed);

  console.log("[METADATA BAR]", {
    style,
    footer,
  });

  const Builder =
    resolveMetadataBuilder(style);

  return <Builder footer={footer} />;
}