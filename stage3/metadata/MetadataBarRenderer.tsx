"use client";

import { resolveMetadataBuilder } from "./resolveMetadataBuilder";

export default function MetadataBarRenderer({
  footer,
  style,
}: any) {
  const Builder =
    resolveMetadataBuilder(style);

  return <Builder footer={footer} />;
}