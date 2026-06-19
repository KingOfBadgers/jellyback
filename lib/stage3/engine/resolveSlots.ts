import { Composition, FramedAsset } from "./compositionTypes";

export function assignAssetToSlot(
  composition: Composition,
  asset: FramedAsset,
  slotId: string
): Composition {
  return {
    ...composition,
    assets: [
      ...composition.assets.filter((a) => a.id !== asset.id),
      {
        ...asset,
        slotId,
      } as any,
    ],
  };
}