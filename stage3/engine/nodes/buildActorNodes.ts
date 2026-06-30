

/**
   * ACTORS
   */

  const actorVariant = selected?.actors
    ? variantRegistry[selected.actors]
    : null;

  const actorLimit = actorVariant?.maxAssets ?? actors.length;

  const limitedActors = actors.slice(0, actorLimit);

  const actorLayout = (blueprints.actors?.type as any) ?? "row";

  if (limitedActors.length && blueprints.actors) {
    limitedActors.forEach((actor: any, i: number) => {
      const pos = computeActorPosition(actorLayout, i, limitedActors.length);

const presentation =
  actorVariant?.presentation ?? {};

console.log(
  "[ACTOR POSITION DEBUG]",
  {
    actor: i,
    layout: actorLayout,
    left: pos.left,
    bottom: pos.bottom,
    transform: pos.transform,
  }
);

      nodes.push({
  id: actor.id ?? `actor-${i}`,
  layer: "actors",
  src: actor.image,
  visible: true,

  style: {
    ...pos,
    width: "140px",
    height: "200px",
  },

  presentation,
  treatments: activeTreatments.actors,});
  });
  }
