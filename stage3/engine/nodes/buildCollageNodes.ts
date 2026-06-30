


 /**
 * =========================================================
 * COLLAGE
 * =========================================================
 */

const collageVariant = selected?.collage
  ? variantRegistry[selected.collage]
  : null;

const collageLimit =
  collageVariant?.maxAssets ?? collageAssets.length;

const limitedCollage =
  collageAssets.slice(0, collageLimit);

if (limitedCollage.length && blueprints.collage) {
  limitedCollage.forEach(
    (image: any, i: number) => {
      /**
       * Variant layout
       */

      const collageLayout =
        blueprints.collage?.type ?? "row";

      /**
       * Spatial positioning
       */

      const pos =
        computeCollagePosition(
          collageLayout,
          i,
          limitedCollage.length
        );

      /**
       * Presentation semantics
       */

      const presentation =
        collageVariant?.presentation ?? {};

      /**
       * Variant-specific sizing
       */

      const isVertical =
        collageLayout === "vertical-left" ||
        collageLayout === "vertical-right";

      const isGrid =
        collageLayout === "grid";

      const width = isVertical
        ? "180px"
        : isGrid
        ? "300px"
        : "260px";

      const height = isVertical
        ? "210px"
        : isGrid
        ? "210px"
        : "180px";

      console.log(
        "[COLLAGE DEBUG]",
        {
          index: i,
          layout: collageLayout,
          width,
          height,
          left: pos.left,
          top: pos.top,
        }
      );

      nodes.push({
        id: `collage-${i}`,

        layer: "collage",

        src: image,

        visible: true,

        style: {
          ...pos,
          width,
          height,
        },

        presentation,

        treatments:
          activeTreatments.collage,
      });
    }
  );
}
 