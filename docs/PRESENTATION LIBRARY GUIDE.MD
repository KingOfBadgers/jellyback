# JELLYBACK STAGE 3 — PRESENTATION LIBRARY GUIDE

**Version:** 1.0
**Date:** 2026-07-08

---

# PURPOSE

This document defines the Stage 3 Presentation Library architecture.

The Presentation Library separates **creative styling** from **composition logic**, allowing new visual variants to be created by editing the Variant Registry and CSS only.

The intended architecture is:

```text
Variant Registry
        ↓
Presentation Metadata
        ↓
Scene Compiler
        ↓
Scene Graph
        ↓
Scene Renderer
        ↓
data-* attributes
        ↓
Shape Engine CSS
        ↓
Final Render
```

---

# DESIGN PHILOSOPHY

Stage 3 separates concerns into distinct layers.

| Layer             | Responsibility       |
| ----------------- | -------------------- |
| Variant Registry  | Creative intent      |
| Spatial Resolver  | Positioning          |
| Compiler          | Scene generation     |
| Renderer          | HTML generation      |
| Shape Engine      | Presentation styling |
| Treatment Engine  | Image treatments     |
| Background Engine | Background effects   |

Every layer has a single responsibility.

---

# PRESENTATION MODEL

Each visual node may contain a presentation block.

Example:

```ts
presentation: {
    shape: "criterion-frame",
    frame: "gallery",
    edge: "feather",
    shadow: "soft",
    texture: "linen",
    rotation: -2.5,
    stack: "overlap",
}
```

These properties describe appearance only.

They must never affect layout or asset selection.

---

# CURRENT PRESENTATION PROPERTIES

## Shape

Primary visual language.

Examples:

```text
soft-frame
criterion-frame
steelbook-frame
museum-frame
floating-glass
poster-clean
hero-card
support-card
stacked-card
poster-grid
polaroid
film-strip
magazine-frame
```

Shape controls:

* border radius
* frame construction
* overlays
* image presentation
* overall visual style

---

## Frame

Secondary framing style.

Examples:

```text
gallery
bevel
steel
thin-white
matte-black
archival
```

Frame should influence:

* border
* inset
* frame materials

Frame should never affect layout.

---

## Edge

Controls edge finishing.

Examples:

```text
hard
feather
glow
torn
rounded
```

Edge should control:

* vignette
* feathering
* edge blending
* clipping

---

## Shadow

Controls depth.

Examples:

```text
none
soft
ambient
floating
cinematic
```

Shadow affects only:

* box-shadow
* glow
* perceived depth

---

## Texture

Surface finish.

Examples:

```text
linen
paper
glass
brushed-steel
canvas
matte
```

Texture may use:

* gradients
* overlays
* noise
* blend modes

Texture must never modify layout.

---

## Rotation

Small artistic rotation.

Example:

```text
-3°
-2°
0°
2°
3°
```

Rotation is metadata.

Renderer is responsible for applying it.

---

## Stack

Relationship between multiple assets.

Examples:

```text
overlap
cascade
fan
tight-grid
pinned
spread
```

Stack affects only the relationship between items.

---

# CURRENT HTML OUTPUT

Scene Renderer emits presentation metadata as data attributes.

Example:

```html
<div
    class="stage3-node"

    data-shape="criterion-frame"
    data-frame="gallery"
    data-edge="feather"
    data-shadow="soft"
    data-texture="linen"
    data-rotation="-2.5"
    data-stack="overlap">
```

The renderer performs no styling.

---

# SHAPE ENGINE RESPONSIBILITY

Shape Engine consumes presentation metadata.

Examples:

```css
[data-shape="criterion-frame"] {
    ...
}
```

```css
[data-frame="gallery"] {
    ...
}
```

```css
[data-edge="feather"] {
    ...
}
```

```css
[data-shadow="soft"] {
    ...
}
```

```css
[data-texture="linen"] {
    ...
}
```

```css
[data-stack="overlap"] {
    ...
}
```

Shape Engine should contain all presentation styling.

---

# TREATMENT ENGINE RESPONSIBILITY

Treatments affect imagery.

Examples:

```text
soft wash
film grain
desaturate
warm grade
cold grade
glow
vignette
```

Treatments do not define frames.

Treatments do not define borders.

Treatments do not define layout.

---

# BACKGROUND ENGINE RESPONSIBILITY

Background Engine affects the canonical background only.

Examples:

```text
cinematic blur
light bloom
gradient wash
film grain
colour grading
vignette
fog
light rays
```

It never styles collage or actors.

---

# CREATING A NEW PRESENTATION STYLE

## Step 1

Choose an existing layout.

Example:

```ts
layout: "vertical-left"
```

---

## Step 2

Choose asset count.

Example:

```ts
maxAssets: 4
```

---

## Step 3

Compose a presentation.

Example:

```ts
presentation: {
    shape: "museum-frame",
    frame: "gallery",
    edge: "feather",
    shadow: "ambient",
    texture: "canvas",
    rotation: -2,
    stack: "cascade",
}
```

---

## Step 4

If required, add CSS selectors.

Example:

```css
[data-shape="museum-frame"] {

}
```

or

```css
[data-frame="gallery"] {

}
```

---

## Step 5

Select the variant in the UI.

No compiler changes should be required.

---

# WHAT SHOULD NOT REQUIRE CODE CHANGES

Creating a new visual style should normally require only:

* Variant Registry
* Shape Engine CSS

Nothing else.

No compiler edits.

No renderer edits.

No resolver edits.

---

# WHEN COMPILER CHANGES ARE REQUIRED

Only when introducing:

* new layouts
* new positioning algorithms
* new asset limits
* new scene node types

Presentation changes must not require compiler modifications.

---

# GOLDEN RULES

## Registry

Defines creative intent.

Never contains CSS.

---

## Spatial Resolver

Defines where objects go.

Never defines appearance.

---

## Compiler

Builds scene nodes.

Never styles them.

---

## Renderer

Outputs metadata.

Never decides appearance.

---

## Shape Engine

Owns presentation.

Everything visual belongs here.

---

# FUTURE EXPANSION

The Presentation Library is designed to grow without architectural changes.

Possible future additions include:

## Shapes

* acrylic-frame
* floating-shadow
* vintage-card
* canvas-wrap
* poster-tube
* collector-slipcase

## Frames

* brushed-aluminium
* oak
* walnut
* steel
* velvet

## Edges

* vignette
* glow
* embossed
* burn
* distressed

## Shadows

* cinematic
* theatre
* museum
* gallery
* floating

## Textures

* leather
* velvet
* linen
* brushed metal
* frosted glass

## Stacks

* fan
* staircase
* scattered
* contact-sheet
* scrapbook

---

# ARCHITECTURE SUMMARY

```text
Creative Intent
        │
        ▼
Variant Registry
        │
        ▼
Presentation Metadata
        │
        ▼
Scene Compiler
        │
        ▼
Scene Renderer
        │
        ▼
data-* Attributes
        │
        ▼
Shape Engine CSS
        │
        ▼
Rendered Artwork
```

This architecture allows JellyBack to scale from a handful of variants to hundreds of visual styles while maintaining a clean separation between composition logic and presentation.
