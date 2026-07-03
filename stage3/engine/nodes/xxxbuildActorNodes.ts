"use client";

import { computeActorPosition } from "@/stage3/engine/spatial/actorPositionResolver";

export function buildActorNodes(
  actors: any[],
  actorVariant: any,
  blueprints: any,
  treatments: string[]
) {
  const nodes = [];

  const actorLimit =
    actorVariant?.maxAssets ?? actors.length;

  const limitedActors =
    actors.slice(0, actorLimit);

  const actorLayout =
    blueprints.actors?.type ?? "row";

  if (
    limitedActors.length &&
    blueprints.actors
  ) {
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

          treatments: treatments,
        });
      }
    );
  }

  return nodes;
}