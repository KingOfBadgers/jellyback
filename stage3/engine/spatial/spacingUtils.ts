export const SPATIAL_CONFIG = {
  canvasWidth: 1000,
  actorWidth: 140,
  collageWidth: 260,
  logoWidth: 800,
  baseBottom: 240,
  baseTop: 120,
  outerMargin: 40,
};

export function computeEvenSpacing(
  total: number,
  itemWidth: number,
  canvasWidth: number,
  margin: number
) {
  const usableWidth = canvasWidth - margin * 2;
  const totalItemsWidth = total * itemWidth;
  const remainingSpace = usableWidth - totalItemsWidth;

  return total > 1
    ? remainingSpace / (total - 1)
    : 0;
}