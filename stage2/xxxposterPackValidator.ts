export function validatePosterPack(pack: any) {
  if (!pack) {
    console.warn("validatePosterPack: pack is null");
    return null;
  }

  if (!pack.background) {
    console.warn("validatePosterPack: missing background");
    return null;
  }

  if (!pack.background.src) {
    console.warn("validatePosterPack: missing background.src");
    return null;
  }

  return {
    ...pack,
    assets: (pack.assets || []).filter((a: any) => a?.src),
  };
}