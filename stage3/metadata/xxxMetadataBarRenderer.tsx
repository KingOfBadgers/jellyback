"use client";

import { useCompositionStore }
  from "@/stage3/store/compositionStore";

import { projectMetadata }
  from "./metadataProjection";

import DvdStripRenderer
  from "./renderers/DvdStripRenderer";
  import SteelBarRenderer
from "./renderers/SteelBarRenderer";
import MinimalRenderer
from "./renderers/MinimalRenderer";

export default function MetadataBarRenderer({
  seed,
}: any) {
  const style =
    useCompositionStore(
      (s) => s.metadataBarStyle
    );

  const metadata =
    projectMetadata(seed);

  if (!metadata) return null;

  switch (style) {
  case "dvdStrip":
    return (
      <DvdStripRenderer
        metadata={metadata}
      />
    );

  case "steelBar":
    return (
      <SteelBarRenderer
        metadata={metadata}
      />
    );
  case "minimal":
  return (
    <MinimalRenderer
      metadata={metadata}
    />
  );  
  default:
    return (
      <DvdStripRenderer
        metadata={metadata}
      />
    );
}
}