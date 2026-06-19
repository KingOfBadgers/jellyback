import { MetadataBar } from "../engine/compositionTypes";

export function createMetadataBar(input: {
  styleId: string;
}): MetadataBar {
  return {
    id: crypto.randomUUID(),
    styleId: input.styleId,
    position: "bottom",

    showMpaa: true,
    showBbfc: true,
    showRuntime: true,
    showResolution: true,
    showSubtitles: false,
  };
}