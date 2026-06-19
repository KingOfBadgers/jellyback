# JellyBack Stage 3 Barcode Generator Implementation Plan

## Goal

Replace the current static barcode asset:

```text
/assets/meta/barcode/barcode.png
```

with a deterministic barcode generated from movie metadata.

The generated barcode should:

* Be unique per title
* Be deterministic
* Require no external API calls
* Work entirely inside Stage 3
* Gracefully fall back to the existing barcode asset
* Preserve all existing metadata bar functionality

---

# Architecture

Current flow:

```text
BorderSeed
    ↓
buildMetadataRenderPlan()
    ↓
BARCODE slot
    ↓
barcode.png
    ↓
Renderer
```

Target flow:

```text
BorderSeed
    ↓
buildBarcodePayload()
    ↓
BarcodeGenerator
    ↓
Generated SVG/Data URL
    ↓
BARCODE slot
    ↓
Renderer
```

---

# Phase 1 — Seed Preparation

## Extend BorderSeed

Add external identifiers.

```ts
imdbId: string | null;
tmdbId: string | null;
```

These are materialised during Stage 2.5.

Example:

```ts
imdbId:
  raw.ProviderIds?.Imdb ??
  null,

tmdbId:
  raw.ProviderIds?.Tmdb ??
  null,
```

---

# Phase 2 — Barcode Payload Builder

Create:

```text
stage3/metadata/buildBarcodePayload.ts
```

Purpose:

Generate a canonical string.

Example:

```ts
export function buildBarcodePayload(
  seed: BorderSeed
): string {
  if (seed.imdbId) {
    return `https://www.imdb.com/title/${seed.imdbId}`;
  }

  if (seed.tmdbId) {
    return `https://www.themoviedb.org/movie/${seed.tmdbId}`;
  }

  if (seed.movieId) {
    return seed.movieId;
  }

  return "https://www.imdb.com";
}
```

Priority:

```text
IMDB
 ↓
TMDB
 ↓
Movie ID
 ↓
IMDb homepage
```

This guarantees a payload always exists.

---

# Phase 3 — Barcode Generator

Create:

```text
stage3/metadata/generateBarcode.ts
```

Purpose:

Convert payload text into barcode graphics.

Use JsBarcode

Input:

```ts
string
```

Output:

```ts
data:image/svg+xml...
```

or

```ts
SVG string
```

Example:

```ts
generateBarcode(payload)
```

returns

```ts
data:image/svg+xml;base64,...
```

---

# Barcode Type

Recommended:

```text
CODE128
```

Reasons:

* DVD-like appearance
* Compact
* Handles URLs
* Handles IDs
* Handles mixed characters
* Widely supported

Avoid:

```text
EAN
UPC
```

because URLs cannot be encoded directly.

---

# Phase 4 — Rendering Strategy

Current:

```ts
icon: {
  src: "/assets/meta/barcode/barcode.png"
}
```

Future:

```ts
icon: {
  src: generatedBarcode
}
```

Renderer remains unchanged.

This is critical.

The renderer should not know whether the barcode is:

```text
PNG
SVG
Generated
Fallback
```

It only receives:

```ts
icon.src
```

---

# Phase 5 — Fallback Layer

If generation fails:

```ts
console.warn(
  "[BARCODE] Generation failed"
);
```

Return:

```ts
"/assets/meta/barcode/barcode.png"
```

Result:

```text
Generator fails
      ↓
Fallback barcode asset
      ↓
Metadata bar still renders
```

No visual breakage.

---

# Phase 6 — Caching

Barcode generation should occur once.

Example:

```ts
Map<string,string>
```

```ts
payload
   ↓
cache lookup
   ↓
generate only if missing
```

Benefits:

```text
Fast rerenders
No duplicate generation
Stable output
```

---

# Phase 7 — Logging

Generator should be heavily logged.

Example:

```ts
console.log(
  "[BARCODE] Payload",
  payload
);
```

```ts
console.log(
  "[BARCODE] Generated",
  {
    length: svg.length
  }
);
```

```ts
console.warn(
  "[BARCODE] Fallback used"
);
```

This follows the current JellyBack diagnostic style.

---

# Future Expansion

The payload builder can later support:

```text
IMDb URL
TMDB URL
Jellyfin URL
Collection URL
Actor URL
Studio URL
```

without changing the renderer.

Only:

```ts
buildBarcodePayload()
```

would evolve.

---

# Files To Add

```text
stage3/metadata/
│
├── buildBarcodePayload.ts
│
├── generateBarcode.ts
│
└── barcodeCache.ts
```

---

# Files To Modify

```text
stage25/
└── materializeCompositionSeed.ts

stage25/
└── compositionBorderStore.ts

stage3/
└── buildMetadataRenderPlan.ts
```

---

# Renderer Impact

Stage3MetadataStripRenderer.tsx

Expected changes:

```text
NONE
```

The renderer already supports:

```ts
slot.icon.src
```

which is exactly what a generated barcode will provide.

This keeps Stage 3 stable while adding real barcode generation behind the scenes.
