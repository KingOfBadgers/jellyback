import { Stage3VariantSet } from "./Stage3Variant";

export function buildVariantPreviews(set: Stage3VariantSet) {
  return {
    seedId: set.seedId,

    variants: set.variants.map((v) => ({
      id: v.id,

      // IMPORTANT: neutral representation only
      thumbnail: `/api/preview/${v.id}`,

      structureHint: v.skeleton,
    })),

    defaultSelectedIndex: null,
  };
}