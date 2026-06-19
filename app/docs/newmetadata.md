JellyBack — Adding New Jellyfin Metadata / Images (Stage 2 → 2.5 Pipeline Guide)
Overview

All Jellyfin data flows through a strict 3-layer pipeline:

Jellyfin API
   ↓
Stage 2 (raw movie object)
   ↓
Stage 2.5 Border Materialiser (canonical seed)
   ↓
Stage 2.5 Composition Store (UI-ready state)

Any new metadata or images MUST follow this path.

1. Where data enters the system
Entry point

All Jellyfin fields originate here:

/api/jellyfin/movies

This file defines the raw movie shape used by Stage 2.

Rule:

If a field is not in /api/jellyfin/movies, it does not exist anywhere else.

2. Stage 2 (Background Page)

File:

app/background/[id]/page.tsx
Responsibility:
Loads raw Jellyfin movie
Selects backdrop/poster
NEVER transforms metadata
Allowed usage of Jellyfin data:
movieData.poster
movieData.backdrops
movieData.logo
movieData.banner
movieData.clearart
movieData.rating
Forbidden:
no parsing
no normalization
no derivation logic
no asset decisions
3. Adding NEW Jellyfin fields (IMPORTANT RULE)

If Jellyfin starts providing a new field (example: criticRating, genres, studioLogo):

Step 1 — confirm raw availability

Add it to logging:

console.log("[JELLYFIN FULL MOVIE]", movie);

Ensure it exists in:

/api/jellyfin/movies
4. Normalisation layer (Stage 2.5 input)

File:

stage25/engine/materialize/normalizeJellyfinMovie.ts
Responsibility:

Convert raw Jellyfin → structured metadata ONLY

This file is the ONLY place you should:
clean strings
map ratings
detect resolution
detect subtitles
convert raw values → canonical enums
How to add a new metadata field
Example: adding criticRating
Step 1 — extend input type
type MetaInput = {
  mpaa?: string | null;
  bbfc?: string | null;
  resolution?: string | null;
  subtitles?: boolean;

  criticRating?: number | null; // NEW
};
Step 2 — normalize it
const criticRating =
  typeof input.criticRating === "number"
    ? Math.max(0, Math.min(10, input.criticRating))
    : null;
Step 3 — include in output

You MUST extend returned object implicitly via resolver:

Right now your function returns assets[], so:

👉 If metadata affects icons:
Add logic here:

if (criticRating && criticRating >= 8) {
  assets.push({
    type: "critic-high",
    src: "/assets/meta/critic/high.png",
  });
}
5. Metadata asset resolution layer

File:

stage25/engine/metadata/renderMetadataAssets.ts
Responsibility:

Convert normalised metadata → UI assets

This is where icons come from:

MPAA badge
BBFC badge
resolution badge
subtitles badge
How to add NEW icon types
Example: critic rating icon
Step 1 — accept new field
export function resolveMetadataAssets(movie: any)

No type enforcement yet — dynamic object.

Step 2 — extract value
const critic = movie.criticRating;
Step 3 — map to asset
if (critic >= 8) {
  assets.push({
    type: "critic-high",
    src: "/assets/meta/critic/high.png",
  });
}
6. Border Materialiser (CRITICAL CONTRACT LAYER)

File:

stage25/engine/materializeCompositionSeed.ts
Responsibility:

This is the ONLY canonical output format

Everything must land here.

How to extend metadata safely

You MUST update BOTH:

1. meta object
metadata: meta

Ensure meta contains your new field.

2. BorderSeed type

File:

compositionBorderStore.ts

Extend:

ratings
media
assets

or add a new section:

extras: {
  criticRating: number | null;
}
CRITICAL RULE

If it's not in BorderSeed → it does not exist in Stage 2.5

7. Store layer (Stage 2.5)

File:

stage25/store/compositionBorderStore.ts
Rule:

Store is a frozen snapshot container only

You must:

extend BorderSeed
update setSeed logging expectations
never mutate structure dynamically
8. Adding NEW image types (logos, banners, etc.)
Step 1 — ensure Jellyfin exposes it

Example fields:

logo
banner
clearart
primary
backdrops[]
Step 2 — expose in Stage 2

Already happening:

movieData.logo
movieData.banner
movieData.clearart
Step 3 — map into BorderSeed

Inside materialiser:

assets: {
  poster,
  backdrops,
  logo,
  banner,
  clearart,
}
Step 4 — consume in Stage 2.5 UI

You can now safely use:

seed.assets.logo
seed.assets.banner
seed.assets.clearart
9. Golden rules (non-negotiable)
1. Jellyfin NEVER reaches Stage 2.5

Only BorderSeed does.

2. All transformations happen BEFORE materialisation
Stage 2 = selection only
Stage 2.5 = canonical model only
3. Never bypass normalisation

If you skip:

normalizeJellyfinMovie

you break asset consistency.

4. Metadata and assets are separate concerns
Layer	Purpose
normalizeJellyfinMovie	data cleanup
resolveMetadataAssets	UI icon mapping
materializeCompositionSeed	canonical state