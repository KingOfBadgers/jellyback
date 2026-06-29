# JELLYBACK — STAGE 3 VARIANT SYSTEM (CURRENT ARCHITECTURE)

Version: 2.0  
Date: 2026-06-29  

---

# OVERVIEW

Stage 3 is a deterministic composition engine.

A “variant” is not a UI preset.

A variant is a **complete instruction object** that defines:

- layout behaviour (where things go)
- presentation metadata (what they look like)
- asset constraints (how many things exist)
- rendering hints (how CSS should interpret nodes)

---

# CORE PRINCIPLE

> The registry owns everything except pixel rendering.

There is no presentation resolver.

There is no runtime styling logic.

Everything flows from the Variant Registry into the scene graph.

---

# SYSTEM PIPELINE

```text
UI Selection
    ↓
compositionStore
    ↓
variantRegistry (SOURCE OF TRUTH)
    ↓
resolveVariantBlueprint (LAYOUT ONLY)
    ↓
buildCompositionScene (SCENE GRAPH)
    ↓
SceneRenderer (TRANSPORT ONLY)
    ↓
CSS Engines (SHAPE + TREATMENT)
    ↓
Final Render
```

---

# ENGINE 1 — VARIANT REGISTRY (SOURCE OF TRUTH)

File:
```
/stage3/variants/variantRegistry.ts
```

## RESPONSIBILITY

Defines EVERYTHING about a variant:

- layout system
- max assets
- visual presentation metadata
- grouping and tiering
- layer assignment

## IMPORTANT

This is now the **only place** where presentation is defined.

No external resolver exists anymore.

---

## EXAMPLE VARIANT

```ts
ACTOR_5_W_OVERLAP: {
  id: "ACTOR_5_W_OVERLAP",

  layer: "actors",

  displayName: "5 Actors — Cinematic Overlap",

  layout: "w-overlap",

  maxAssets: 5,

  group: "primary",

  tier: "free",

  experimentFlag: null,

  presentation: {
    shape: "film-frame",
    frame: null,
    stack: "overlap"
  }
}
```

---

## WHAT THIS MEANS

| Field | Meaning |
|------|--------|
| layout | positioning system |
| maxAssets | scene limits |
| presentation.shape | CSS shape class |
| presentation.stack | stacking behaviour |
| presentation.frame | optional framing system |

---

# ENGINE 2 — BLUEPRINT RESOLVER (LAYOUT ONLY)

File:
```
/stage3/engine/variant/resolveVariantBlueprint.ts
```

## RESPONSIBILITY

Converts:

```text
layout → positioning rules
```

Example:

```ts
"row" → left-aligned row layout
"center-focus" → cinematic center clustering
"w-overlap" → compressed overlap stack
"grid" → grid formation
```

## OUTPUT

Only positioning metadata:

```ts
{
  bottom: "160px",
  left: "50%",
  transform: "translateX(-50%)"
}
```

---

## IMPORTANT RULE

❌ NO styling  
❌ NO shape  
❌ NO CSS decisions  

Only geometry.

---

# ENGINE 3 — SCENE COMPILER (WORLD BUILDER)

File:
```
/stage3/compiler/buildCompositionScene.ts
```

## RESPONSIBILITY

Builds the final scene graph.

### It decides:

- which assets exist
- how many assets are allowed
- where assets are placed
- what presentation metadata is attached

---

## OUTPUT STRUCTURE

Each node:

```ts
{
  id: "actor-1",

  layer: "actors",

  style: {
    left: "320px",
    bottom: "160px"
  },

  presentation: {
    shape: "film-frame",
    stack: "overlap"
  },

  treatments: ["depth-soft"]
}
```

---

## IMPORTANT RULES

✔ attaches presentation from registry  
✔ attaches layout from blueprint resolver  
✔ attaches treatments from store  

---

❌ does NOT apply CSS  
❌ does NOT interpret styling  
❌ does NOT decide visuals  

---

# ENGINE 4 — SCENE RENDERER (DUMB TRANSPORT LAYER)

File:
```
/stage3/renderer/SceneRenderer.tsx
```

## RESPONSIBILITY

Convert scene graph → DOM.

## OUTPUT EXAMPLE

```html
<div
  data-layer="actors"
  data-shape="film-frame"
  data-stack="overlap"
  data-treatments="depth-soft"
>
```

---

## RULES

✔ reads data  
✔ renders DOM  
✔ logs debug  

---

❌ NO logic  
❌ NO layout decisions  
❌ NO styling decisions  

---

# ENGINE 5 — SHAPE ENGINE (VISUAL SYSTEM)

File:
```
/stage3/styles/shapeEngine.css
```

## RESPONSIBILITY

Defines STRUCTURE of visual form.

---

## EXAMPLES

```css
.soft-frame {
  border-radius: 18px;
  overflow: hidden;
}
```

```css
.polaroid {
  background: white;
  padding: 10px;
}
```

```css
.film-frame {
  border: 10px solid black;
}
```

---

## RULES

✔ shape = structure  
✔ not position  
✔ not logic  

---

# ENGINE 6 — TREATMENT ENGINE (IMAGE EFFECT SYSTEM)

File:
```
/stage3/styles/treatmentEngine.css
```

## RESPONSIBILITY

Defines visual effects applied to nodes.

---

## EXAMPLES

```css
[data-treatments~="depth-soft"] {
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.4));
}
```

```css
[data-treatments~="cinematic-glow"] {
  filter: brightness(1.1) contrast(1.2);
}
```

---

# HOW PRESENTATION WORKS NOW

Presentation is NOT a separate engine anymore.

It is embedded inside the registry:

```ts
presentation: {
  shape: "film-frame",
  stack: "overlap",
  frame: "soft-edge"
}
```

---

# FULL DATA FLOW

Example variant:

```
ACTOR_5_W_OVERLAP
```

Pipeline:

```text
variantRegistry
    ↓
layout = w-overlap
presentation = film-frame + overlap
    ↓
blueprint resolver (geometry only)
    ↓
scene compiler (node construction)
    ↓
renderer (DOM output)
    ↓
CSS engine (visuals applied)
```

---

# HOW TO CREATE A NEW VARIANT

---

## STEP 1 — DEFINE VARIANT

```ts
ACTOR_3_CINEMATIC: {
  layout: "center-focus",
  maxAssets: 3,

  presentation: {
    shape: "film-frame",
    stack: "tight"
  }
}
```

---

## STEP 2 — LAYOUT DECISION

If layout is new:

Edit:

```
resolveVariantBlueprint.ts
buildCompositionScene.ts
```

---

## STEP 3 — VISUAL SHAPE

If new shape:

Edit:

```
shapeEngine.css
```

---

## STEP 4 — TREATMENT EFFECTS

If new effect:

Edit:

```
treatmentEngine.css
```

---

## STEP 5 — VERIFY OUTPUT

Inspect DOM:

```html
data-shape="film-frame"
data-stack="overlap"
```

---

# FILE RESPONSIBILITIES (FINAL)

| File | Responsibility |
|------|---------------|
| variantRegistry.ts | FULL variant definition |
| resolveVariantBlueprint.ts | layout geometry only |
| buildCompositionScene.ts | scene graph construction |
| SceneRenderer.tsx | DOM rendering only |
| shapeEngine.css | structural visuals |
| treatmentEngine.css | image effects |

---

# HARD RULES

## ❌ NEVER

- reintroduce presentationResolver
- put CSS in TypeScript layout logic
- put layout logic in renderer
- derive styling at runtime
- mix shape + layout logic

---

## ✔ ALWAYS

- registry defines truth
- compiler builds reality
- renderer emits structure
- CSS defines appearance

---

# ARCHITECTURAL RESULT

Stage 3 is now:

> A deterministic composition engine with declarative visual semantics.

Not a UI system.

Not a renderer.

A **composition language runtime**.

---

END