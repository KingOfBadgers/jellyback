"use client";

import { buildFooter } from "./buildFooter";
import { resolveMetadataBuilder } from "./resolveMetadataBuilder";

export default function MetadataBarRenderer({
  seed,
  style,
}: any) {
  const footer =
    buildFooter(seed);

  const Builder =
    resolveMetadataBuilder(style);

  return (
    <Builder footer={footer} />
  );
}