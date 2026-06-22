# JellyBack Stage 3 — Adding a New Variant

## Purpose

This document explains **exactly how to add a new Stage 3 composition variant**.

Stage 3 now uses a **registry-driven architecture**.

A variant is no longer “just a UI button”.

A variant affects multiple layers of the rendering pipeline.

A new variant must be added in all required locations or it will fail.

---

# Architecture Overview

Stage 3 pipeline:

```text
Variant Registry
        ↓
Eligibility Engine
        ↓
UI Panel
        ↓
Composition Store
        ↓
Variant Contract Resolver
        ↓
Blueprint Resolver
        ↓
Scene Compiler
        ↓
Renderer
```

A new variant enters at the **registry** and propagates through the pipeline.

---

# Example

We will add:

```text
ACTOR_3_DIAGONAL
```

Which will place 3 actors diagonally across the back cover.

---

# Step 1 — Add Variant Type

File:

```text
/stage3/variants/variantRegistry.ts
```

Find:

```ts
export type VariantId =
```

Add new variant:

```ts
export type VariantId =
  | "ACTOR_1_CENTER"
  | "ACTOR_3_CENTER_FOCUS"
  | "ACTOR_3_DIAGONAL"
  | "ACTOR_5_ROW"
```

If you forget this:

```text
TypeScript will fail compilation.
```

---

# Step 2 — Add Registry Entry

File:

```text
/stage3/variants/variantRegistry.ts
```

Add new entry:

```ts
ACTOR_3_DIAGONAL: {
  id: "ACTOR_3_DIAGONAL",

  layer: "actors",

  displayName: "3 Actors — Diagonal",

  visibility: "show",

  layout: "diagonal",

  group: "primary",

  tier: "free",

  experimentFlag: null,
},
```

Example location:

```ts
export const variantRegistry = {
   ...
}
```

This becomes the **single source of truth**.

If omitted:

```text
variant cannot exist anywhere else
```

---

# Step 3 — Add Layout Type

File:

```text
/stage3/variants/variantRegistry.ts
```

Find:

```ts
layout:
```

Current:

```ts
layout:
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "none"
```

Add:

```ts
| "diagonal"
```

Result:

```ts
layout:
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "diagonal"
  | "none"
```

If omitted:

```text
TypeScript will reject the registry entry.
```

---

# Step 4 — Update Eligibility Engine

File:

```text
/stage3/engine/variant/resolveVariantEligibility.ts
```

Purpose:

Determine when the variant can be offered.

Example rule:

```text
ACTOR_3_DIAGONAL requires 3 or more actors
```

Add logic:

```ts
if (actorCount >= 3) {
  actors.push(
    variantRegistry.ACTOR_3_DIAGONAL
  );
}
```

Example:

```ts
const actorCount =
  seed?.assets?.actors?.length ?? 0;
```

Without this:

```text
variant exists but never appears in UI
```

---

# Step 5 — Update Blueprint Resolver

File:

```text
/stage3/engine/variant/resolveVariantBlueprint.ts
```

Purpose:

Translate variant into layout rules.

Find switch or mapping logic.

Add:

```ts
case "diagonal":
  return {
    layout: "diagonal"
  };
```

Example:

```ts
switch(contract.layout)
```

Without this:

```text
variant selectable but renderer does not know how to position assets
```

---

# Step 6 — Update Scene Compiler

File:

```text
/stage3/compiler/buildCompositionScene.ts
```

Purpose:

Convert blueprint into actual scene nodes.

Find actor compiler section.

Current example:

```ts
if (layout === "row") {
}
```

Add:

```ts
if (layout === "diagonal") {
  actors.forEach((actor, i) => {
    nodes.push({
      id: actor.id,

      layer: "actors",

      src: actor.image,

      visible: true,

      style: {
        position: "absolute",

        left: 80 + i * 120,

        bottom: 100 + i * 80,

        width: 140,

        height: 200,

        zIndex: 10,
      },
    });
  });
}
```

Without this:

```text
variant selectable but nothing renders
```

---

# Step 7 — UI Automatically Updates

File:

```text
/stage3/ui/Stage3VariantPanel.tsx
```

Normally:

```text
NO CHANGES REQUIRED
```

Because UI now uses:

```ts
resolveVariantEligibility()
```

Example:

```ts
const eligibility =
  resolveVariantEligibility(seed)
```

If eligibility returns the new variant:

```text
UI button appears automatically
```

This is intentional.

---

# Step 8 — Store Automatically Works

File:

```text
/ stage3/store/compositionStore.ts
```

Normally:

```text
NO CHANGES REQUIRED
```

Store accepts any valid variant ID.

Selection:

```ts
selected: {
  actors,
  logo,
  collage
}
```

No manual registration needed.

---

# Step 9 — Test Checklist

Verify:

### Registry exists

```text
✓ Variant appears in variantRegistry
```

### Eligibility works

```text
✓ Variant appears in UI
```

### Selection works

```text
✓ Button changes active state
```

### Store works

```text
✓ Variant saved in Zustand
```

### Compiler works

```text
✓ Scene nodes generated
```

### Renderer works

```text
✓ Images positioned correctly
```

### Logging works

```text
✓ No undefined contract errors
```

---

# Debug Checklist

If variant does NOT appear:

Check:

```text
resolveVariantEligibility.ts
```

---

If variant appears but cannot be selected:

Check:

```text
compositionStore.ts
```

---

If variant selects but nothing renders:

Check:

```text
buildCompositionScene.ts
```

---

If variant renders incorrectly:

Check:

```text
resolveVariantBlueprint.ts
```

or:

```text
buildCompositionScene.ts
```

---

# What You Should NEVER Do

Never add variants directly in:

```text
Stage3VariantPanel.tsx
```

Wrong:

```ts
<button>ACTOR_NEW</button>
```

---

Never hardcode variants in:

```text
AssetLayers.tsx
```

Wrong:

```ts
if (selected === "ACTOR_3_NEW")
```

---

Never create:

```text
variantMap.ts
```

Legacy system.

Deleted.

---

Never add fallback rendering logic.

Wrong:

```ts
if no variant selected
render actors anyway
```

Rendering must always follow contract.

---

Never bypass registry.

Wrong:

```ts
const variant = {
  ...
}
```

All variants must originate from:

```text
variantRegistry.ts
```

Only.

---

# Minimal File Touches Required

For a new variant you usually edit:

```text
/stage3/variants/variantRegistry.ts

/stage3/engine/variant/resolveVariantEligibility.ts

/stage3/engine/variant/resolveVariantBlueprint.ts

/stage3/compiler/buildCompositionScene.ts
```

Usually:

```text
4 files
```

Everything else updates automatically.

---

# Mental Model

A variant is not:

```text
a UI button
```

A variant is:

```text
A composition instruction
```

The pipeline:

```text
Registry defines it
↓
Eligibility allows it
↓
UI exposes it
↓
Store stores it
↓
Contract normalizes it
↓
Blueprint describes it
↓
Compiler builds nodes
↓
Renderer paints it
```

---

# Final Rule

When adding a variant always ask:

```text
Can the compiler build deterministic scene nodes from this variant?
```

If the answer is no:

```text
the variant is incomplete
```

---

Date:

2026-06-21

JellyBack Stage 3 Architecture Documentation
