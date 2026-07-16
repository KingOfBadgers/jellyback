"use client";

import { resolveVariantBlueprints } from "@/stage3/engine/variant/resolveVariantBlueprint";
import { variantRegistry } from "@/stage3/variants/variantRegistry";
import { resolveCollagePosition} from "@/stage3/engine/spatial/collagePositionResolver";
import { flattenTreatments } from "@/stage3/engine/treatments/flattenTreatments" ;
import { computeEvenSpacing, SPATIAL_CONFIG,} from "@/stage3/engine/spatial/spacingUtils";
import { resolveBannerPosition } from "@/stage3/engine/spatial/bannerPositionResolver";
import { buildBackgroundNode } from "@/stage3/compiler/builders/buildBackgroundNode";
import { buildBannerNodes } from "@/stage3/compiler/builders/buildBannerNodes";
import { buildLogoNode } from "@/stage3/compiler/builders/buildLogoNode";
import { buildActorNodes } from "@/stage3/compiler/builders/buildActorNodes";
import { buildCollageNodes } from "@/stage3/compiler/builders/buildCollageNodes";
import { buildFrameNodes } from "@/stage3/compiler/builders/buildFrameNodes";
/**

* =========================================================
* JELLYBACK STAGE 3 — COMPOSITION SCENE COMPILER
* =========================================================
*
* PURPOSE
* ---
* Final orchestration layer for Stage 3 scene generation.
*
* Responsibilities:
*
* * Resolve active variant blueprints
* * Resolve active treatments
* * Delegate node creation to builders
* * Return final scene graph
*
* IMPORTANT
* ---
* This file should contain ZERO layout logic.
* This file should contain ZERO rendering logic.
* This file should contain ZERO positioning logic.
*
* It is orchestration only.
* =========================================================
  */



import { resolveActorPosition }
from "@/stage3/engine/spatial/actorPositionResolver";


/**

* =========================================================
* TYPES
* =========================================================
  */

type LayerTreatmentGroup = {
edges: string | null;
depth: string | null;
contrast: string | null;
field?: string | null;
spacing?: string | null;
};

/**
 * CHANGE: 2026-07-09
 * REASON:
 * Added background treatment transport.
 */
type CompositionTreatments = {
actors: LayerTreatmentGroup;
collage: LayerTreatmentGroup;
logo: LayerTreatmentGroup;
banner: LayerTreatmentGroup;
background: LayerTreatmentGroup;
};

export type SceneNode = {
id: string;

layer:
| "background"
| "actors"
| "collage"
| "logo"
| "banner"
| "frame";

src?: string;

style: {
position: "absolute";
top?: string;
left?: string;
right?: string;
bottom?: string;
width?: string;
height?: string;
transform?: string;
opacity?: number;
zIndex?: number;
};

visible: boolean;

treatments?: string[];

presentation?: {
shape?: string;
frame?: string;
stack?: string;
};

frameSlot?: {
  slotId: string;
  source: "actors" | "backdrops";
};
};

export type CompositionScene = {
movieId: string;
nodes: SceneNode[];
};

/**

* =========================================================
* MAIN COMPILER
* =========================================================
  */

export function buildCompositionScene(
seed: any,
selected: any,
treatments: CompositionTreatments
): CompositionScene {

/**

* ---
* Base assets
* ---

*/

const actors =
seed?.assets?.actors ?? [];

const banner =
seed?.assets?.banner ?? null;

const collageAssets =
seed?.assets?.collage ??
seed?.assets?.backdrops ??
[];

const logo =
  seed?.assets?.logo ??
  seed?.footer?.logo ??
  null;

const backdrop =
seed?.background?.src ??
seed?.assets?.backdrops?.[0];

/**

* ---
* Resolve active variant blueprints
* ---

*/

const blueprints =
resolveVariantBlueprints({
actors: selected?.actors,
collage: selected?.collage,
logo: selected?.logo,
banner: selected?.banner,
});

/**

* ---
* Resolve active treatments
* ---

*/

/**
 * CHANGE: 2026-07-09
 * REASON:
 * Transport canonical background treatments
 * into the scene graph.
 */
const activeTreatments = {
actors: flattenTreatments(
treatments?.actors
),

collage: flattenTreatments(
  treatments?.collage
),

logo: flattenTreatments(
  treatments?.logo
),

banner: flattenTreatments(
  treatments?.banner
),

background: flattenTreatments(
  treatments?.background
),

};

/**

* ---
* Resolve selected variants
* ---
*/
const bannerVariant =
selected?.banner
? variantRegistry[
selected.banner
]
: null;


const actorVariant =
selected?.actors
? variantRegistry[
selected.actors
]
: null;

const collageVariant =
selected?.collage
? variantRegistry[
selected.collage
]
: null;

/**
* ---
* Build background
* ---
*/

/**
 * CHANGE: 2026-07-09
 * REASON:
 * Background builder now receives
 * user-selected background treatments.
 */
const backgroundNode =
buildBackgroundNode(
backdrop,
activeTreatments.background
);

/**

* ---
* Build collage nodes
* ---

*/

const collageNodes =
buildCollageNodes(
collageAssets,
  collageVariant,
  blueprints.collage,
  activeTreatments.collage
);

const frameNodes =
buildFrameNodes(
  selected?.frame,
  seed.assets
);

/**
* ---
* Build actor nodes
* ---
*/

const actorNodes =
buildActorNodes(
actors,
  actorVariant,
  blueprints.actors,
  activeTreatments.actors,
  resolveActorPosition
);


/**
* ---
* Build banner
* ---
*/

const bannerNodes = buildBannerNodes(
  banner,
  blueprints.banner,
  activeTreatments.banner,
  bannerVariant
);


/**
* ---
* Build logo
* ---
*/

const logoNode =
buildLogoNode(
  seed,
  logo,
  blueprints.logo,
  activeTreatments.logo
);


/**

* ---
* Final scene graph
* Render stack matters
* ---

*/

const nodes = [
backgroundNode,
...collageNodes,
...actorNodes,
bannerNodes,
logoNode,
...frameNodes,
].filter(Boolean);

/**

* ---
* Minimal debug output
* ---

*/

console.log(
"[SCENE BUILD]",
{
background: !!backgroundNode,
collage: collageNodes.length,
actors: actorNodes.length,
banners: !!bannerNodes,
logo: !!logoNode,
frames: frameNodes.length,
total: nodes.length,
}
);

/**

* ---
* Return final scene
* ---

*/

return {
movieId: seed?.movieId,
nodes,
};
}
