"use client";

export function buildBannerNodes(
  banner: string | null,
  bannerBlueprint: any,
  bannerTreatments: string[]
) {
  if (!banner) {
    return null;
  }
  if (!bannerBlueprint) {
    return null;
  }
  return {
    id: "banner",
    layer: "banner",
    top: "50px",
    left: "50px",
    src: banner,
    visible:
      bannerBlueprint.type !== "none",
    style: {
      ...bannerBlueprint.style,
      width: "900px",
      height: "150px",
    },
    treatments: bannerTreatments,
  };
}