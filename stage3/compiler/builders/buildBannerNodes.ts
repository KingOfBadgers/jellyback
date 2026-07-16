"use client";


export function buildBannerNodes(
  banner: string | null,
  bannerBlueprint: any,
  bannerTreatments: string[],
  bannerVariant: any,
) {
  if (!banner) {
    return null;
  }
  if (!bannerBlueprint) {
    return null;
  }

      /**
       * Presentation metadata
       */

      const presentation =
        bannerVariant.presentation ?? {};


  return {
    id: "banner",
    layer: "banner",
    top: "50px",
    left: "50px",
    src: banner,
    visible:
      bannerBlueprint.type !== "none",
    presentation,
    style: {
      ...bannerBlueprint.style,
      width: "900px",
      height: "150px",
    },
    treatments: bannerTreatments,
  };
}