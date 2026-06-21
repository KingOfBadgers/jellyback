# JellyBack Stage 3 — Adding Filesystem-Based Frame Variants

## Purpose

This document explains how to add **filesystem-driven frame variants** to Stage 3.

Unlike normal variants, filesystem frame variants are **not hardcoded permanently inside the codebase**.

They are discovered dynamically from the filesystem.

Example:

```text
/assets/frames/

    bluray-blue/
        frame.png
        metadata.json

    steelbook-dark/
        frame.png
        metadata.json

    horror-red/
        frame.png
        metadata.json
```

The system loads these folders and converts them into selectable Stage 3 variants.

---

# Why Filesystem Variants Are Different

Normal variants:

```text
ACTOR_3_CENTER
LOGO_STANDARD
COLLAGE_GRID
```

Are manually declared.

Filesystem frame variants:

```text
FRAME_BLURAY_BLUE
FRAME_STEELBOOK_DARK
FRAME_HORROR_RED
```

Are discovered automatically.

This means:

```text
Developer adds folder
↓
System detects frame
↓
System builds variant
↓
UI shows variant
↓
Renderer applies frame
```

No manual variant creation.

---

# Architecture Overview

Filesystem variants follow a different pipeline.

```text
Filesystem Scan
        ↓
Frame Manifest Builder
        ↓
Dynamic Variant Registry Injection
        ↓
Eligibility Engine
        ↓
UI Variant Panel
        ↓
Store Selection
        ↓
Contract Resolver
        ↓
Scene Compiler
        ↓
Renderer
```

---

# Expected Folder Structure

Example:

```text
/assets/frames/
```

Each frame gets its own folder.

Example:

```text
/frames/

    bluray-classic/

        frame.png

        metadata.json


    steelbook-black/

        frame.png

        metadata.json
```

Each folder represents one variant.

---

# Required Files

Every frame folder requires:

```text
frame.png
metadata.json
```

Example:

```text
/frames/steelbook-black/
```

Contains:

```text
frame.png
metadata.json
```

---

# metadata.json Structure

Example:

```json
{
  "id": "FRAME_STEELBOOK_BLACK",

  "displayName": "Steelbook Black",

  "layer": "frame",

  "visibility": "show",

  "layout": "full-overlay",

  "tier": "free",

  "group": "primary"
}
```

Rules:

```text
id must be unique
```

Example:

```text
FRAME_STEELBOOK_BLACK
```

---

# Step 1 — Add New Layer Type

File:

```text
/ stage3/variants/variantRegistry.ts
```

Find:

```ts
export type VariantLayer =
```

Current:

```ts
"actors" | "collage" | "logo"
```

Add:

```ts
"frame"
```

Result:

```ts
export type VariantLayer =
  | "actors"
  | "collage"
  | "logo"
  | "frame";
```

Without this:

```text
TypeScript will fail
```

---

# Step 2 — Add Store Support

File:

```text
/ stage3/store/compositionStore.ts
```

Find:

```ts
selected:
```

Current:

```ts
selected: {
  actors
  collage
  logo
}
```

Add:

```ts
frame
```

Result:

```ts
selected: {
  actors
  collage
  logo
  frame
}
```

Also update:

```ts
setSeed()
reset()
selectVariant()
cycleVariant()
```

All state paths must include frame.

---

# Step 3 — Create Frame Scanner

Create:

```text
/ stage3/frame/loadFrameVariants.ts
```

Purpose:

Scan filesystem.

Example:

```ts
export async function loadFrameVariants()
```

Reads:

```text
/assets/frames/*
```

Produces:

```ts
[
  {
    id: "FRAME_STEELBOOK_BLACK",

    displayName: "Steelbook Black",

    path: "/frames/steelbook-black/frame.png"
  }
]
```

Rules:

```text
NO rendering logic
```

Only scan folders.

---

# Step 4 — Inject Into Registry

Create:

```text
/ stage3/frame/buildDynamicFrameRegistry.ts
```

Purpose:

Convert scanned folders into variant definitions.

Example:

Input:

```ts
{
  id: "FRAME_STEELBOOK_BLACK"
}
```

Output:

```ts
{
  id: "FRAME_STEELBOOK_BLACK",

  layer: "frame",

  displayName: "Steelbook Black",

  visibility: "show",

  layout: "full-overlay",

  group: "primary",

  tier: "free"
}
```

This becomes runtime registry data.

---

# Step 5 — Merge Static + Dynamic Registry

File:

```text
/ stage3/variants/variantRegistry.ts
```

Current:

```ts
variantRegistry = {
   static variants
}
```

New architecture:

```ts
staticVariantRegistry
```

And:

```ts
dynamicFrameRegistry
```

Merged:

```ts
mergedVariantRegistry
```

Example:

```ts
{
  ...staticVariantRegistry,

  ...dynamicFrameRegistry
}
```

Result:

```text
both systems behave identically
```

---

# Step 6 — Eligibility Engine

File:

```text
/ stage3/engine/variant/resolveVariantEligibility.ts
```

Purpose:

Determine which frame variants are valid.

Example:

```ts
frame: dynamicFrameRegistry
```

Rules:

If frame exists:

```text
offer frame variants
```

Example:

```ts
frames.push(...dynamicFrames)
```

Unlike actor variants:

```text
frame variants usually always eligible
```

---

# Step 7 — UI Automatically Updates

File:

```text
Stage3VariantPanel.tsx
```

Add:

```ts
renderGroup("FRAME", "frame")
```

Because UI is eligibility-driven:

```text
frame variants appear automatically
```

No hardcoding.

---

# Step 8 — Contract Resolver

File:

```text
resolveVariantContract.ts
```

No major changes.

Frame variants behave like:

```text
logo variants
```

Example output:

```ts
{
  visibility: "show",

  layout: "full-overlay"
}
```

---

# Step 9 — Scene Compiler

File:

```text
buildCompositionScene.ts
```

Add frame layer.

Example:

```ts
const frameVariant =
  selected.frame
```

Resolve:

```ts
const frameContract =
  resolveVariantContract(frameVariant)
```

Create scene node:

```ts
nodes.push({
  id: "frame",

  layer: "frame",

  src: "/frames/steelbook-black/frame.png",

  visible: true,

  style: {
    position: "absolute",

    top: 0,

    left: 0,

    width: 1000,

    height: 1400,

    zIndex: 50
  }
})
```

Frame usually renders above everything.

---

# Step 10 — Renderer Automatically Works

Renderer already renders scene nodes.

Example:

```ts
scene.nodes.map()
```

No special logic required.

---

# Adding New Frame Pack

Developer adds folder:

```text
/frames/horror-red/
```

Adds:

```text
frame.png
metadata.json
```

Restart app.

System detects:

```text
FRAME_HORROR_RED
```

UI now shows:

```text
Horror Red
```

No code changes required.

---

# Example Folder

```text
/frames/

    horror-red/

        frame.png

        metadata.json
```

metadata.json

```json
{
  "id": "FRAME_HORROR_RED",

  "displayName": "Horror Red",

  "layer": "frame",

  "layout": "full-overlay",

  "tier": "free",

  "group": "primary"
}
```

---

# Validation Rules

Reject if missing:

```text
frame.png
```

Reject if missing:

```text
metadata.json
```

Reject duplicate:

```text
id
```

Reject invalid:

```text
layer
layout
```

Log:

```text
[FRAME REGISTRY] Invalid frame skipped
```

Never crash application.

---

# What You Should NEVER Do

Never manually hardcode frame variants.

Wrong:

```ts
FRAME_HORROR_RED: {
}
```

---

Never add filesystem variants directly into:

```text
variantRegistry.ts
```

They must be loaded dynamically.

---

Never allow duplicate IDs.

Wrong:

```text
FRAME_RED
FRAME_RED
```

---

Never scan filesystem inside React.

Wrong:

```tsx
Stage3VariantPanel.tsx
```

Filesystem scanning must happen before UI.

---

Never put rendering logic in scanner.

Wrong:

```ts
if png exists
apply CSS
```

Scanner only discovers assets.

---

# Required Files

```text
/ stage3/frame/loadFrameVariants.ts

/ stage3/frame/buildDynamicFrameRegistry.ts

/ stage3/engine/variant/resolveVariantEligibility.ts

/ stage3/compiler/buildCompositionScene.ts

/ stage3/store/compositionStore.ts
```

---

# Mental Model

Static variants:

```text
Code defines variant
```

Filesystem variants:

```text
Filesystem defines variant
```

Pipeline:

```text
Folder exists
↓
Scanner finds it
↓
Metadata normalized
↓
Registry injected
↓
Eligibility exposes it
↓
UI renders button
↓
Store saves selection
↓
Compiler builds scene node
↓
Renderer paints frame
```

---

# Final Rule

If adding a filesystem frame requires changing code every time:

```text
architecture is wrong
```

Correct architecture:

```text
Add folder
Restart app
Frame appears automatically
```

Zero code changes.

---

Date:

2026-06-21

JellyBack Stage 3 Filesystem Variant Architecture
