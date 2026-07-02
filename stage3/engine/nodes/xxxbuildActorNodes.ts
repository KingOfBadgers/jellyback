"use client";

import { resolveActorPosition }
  from "@/stage3/engine/spatial/actorPositionResolver";

export function buildActorNodes(
  actors: any[],
  actorVariant: any,
  blueprint: any,
  treatments: string[]
) {
  const nodes = [];

  if (!actors?.length || !blueprint) {
    return nodes;
  }

  const actorLimit =
    actorVariant?.maxAssets ??
    actors.length;

  const limitedActors =
    actors.slice(0, actorLimit);

  const actorLayout =
    blueprint?.type ?? "row";

  limitedActors.forEach(
    (actor: any, i: number) => {
      const pos =
        resolveActorPosition(
          actorLayout,
          i,
          limitedActors.length
        );

      const presentation =
        actorVariant?.presentation ?? {};

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

        treatments,
      });
    }
  );

  return nodes;
}