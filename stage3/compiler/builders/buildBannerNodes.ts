"use client";

export function buildBannerNodes(
  banners: any[],
  computeBannerPosition: (index: number) => any
) {
  const nodes = [];

  if (!banners.length) {
    return nodes;
  }

  banners.forEach(
    (banner: any, i: number) => {
      const pos =
        computeBannerPosition(i);

      nodes.push({
        id: `banner-${i}`,

        layer: "banner",

        src: banner,

        visible: true,

        style: {
          ...pos,
        },

        treatments: [],
      });
    }
  );

  return nodes;
}