"use client";

export function buildActorNodes(
  actors: any[],

  actorVariant: any,

  actorBlueprint: any,

  actorTreatments: string[],

  computeActorPosition: (
    layout: string,
    index: number,
    total: number
  ) => any
) {
  const nodes = [];

  if (!actorBlueprint) {
    return nodes;
  }

  const actorLimit =
    actorVariant?.maxAssets ??
    actors.length;

  const limitedActors =
    actors.slice(0, actorLimit);

  const actorLayout =
    actorBlueprint.type ?? "row";

  if (!limitedActors.length) {
    return nodes;
  }

  limitedActors.forEach(
    (actor: any, i: number) => {
      const pos =
        computeActorPosition(
          actorLayout,
          i,
          limitedActors.length
        );

      const presentation =
        actorVariant?.presentation ?? {};

      console.log(
        "[ACTOR BUILDER]",
        {
          actor: i,
          layout: actorLayout,
          left: pos.left,
          bottom: pos.bottom,
        }
      );

      nodes.push({
        id:
          actor.id ??
          `actor-${i}`,

        layer: "actors",

        src: actor.image,

        visible: true,

        style: {
          ...pos,

          width: "140px",

          height: "200px",
        },

        presentation,

        treatments:
          actorTreatments,
      });
    }
  );

  return nodes;
}