import { Composition } from "./compositionTypes";

export function renderComposition(comp: Composition) {
  return {
    background: comp.background,

    renderedSlots: comp.slots.map((slot) => {
      const asset = comp.assets.find((a: any) => a.slotId === slot.id);

      return {
        slot,
        asset: asset || null,
      };
    }),

    metadataBar: comp.metadataBar || null,
    barcode: comp.barcode || null,
  };
}