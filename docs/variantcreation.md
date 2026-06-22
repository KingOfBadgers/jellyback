JellyBack Stage 3 — Variant System v2.0 (Aligned Architecture)

Status: Canonical
Date: 2026-06-22
Scope: Defines how variants exist, flow, and render in Stage 3

🧭 Core Principle

Stage 3 variants are pure data definitions.

They are not:

logic systems
UI rules
layout generators
compiler instructions

They are:

Declarative composition constraints interpreted by the pipeline

🧱 System Overview (Current Reality)
variantRegistry.ts
        ↓
resolveVariantEligibility.ts
        ↓
Stage3VariantPanel (UI)
        ↓
compositionStore (selection state)
        ↓
resolveVariantBlueprint.ts
        ↓
buildCompositionScene.ts
        ↓
SceneRenderer (execution only)
⚙️ 1. Variant Registry (Single Source of Truth)

📁 /stage3/variants/variantRegistry.ts

This is the only authoritative definition of a variant.

Each variant defines:

{
  id,
  layer,
  displayName,
  visibility,
  layout,
  maxAssets,
  group,
  tier,
  experimentFlag
}
🔒 Rules
Registry is immutable at runtime
No variant exists outside this file
No duplicate variant definitions elsewhere
No logic allowed
🧠 Meaning of Fields
layout

Defines structural intent:

row
center-focus
w-overlap
grid
none
maxAssets

Hard constraint:

Maximum number of assets required for variant eligibility

Used by eligibility engine only.

🎯 2. Eligibility Engine (Pure Filtering Layer)

📁 /stage3/engine/variant/resolveVariantEligibility.ts

This system determines:

Which variants are valid for a given seed

🧮 Current Rule (IMPORTANT)
eligible if:
maxAssets <= availableAssets
Actor Logic (Canonical)
const actors = Object.values(variantRegistry)
  .filter(v => v.layer === "actors")
  .filter(v => v.maxAssets <= actorCount)
🔒 Rules
No manual if (actorCount === X) logic
No hardcoded variant lists
No UI awareness
No layout awareness
🧠 Output Contract
{
  actors: EligibleVariant[],
  collage: EligibleVariant[],
  logo: EligibleVariant[]
}

Each variant contains:

{
  id,
  displayName
}

Nothing else.

🖥 3. UI Layer (Variant Panel)

📁 /stage3/ui/Stage3VariantPanel.tsx

The UI:

does NOT decide variants
does NOT filter logic
does NOT interpret layout

It only:

renders eligibility output

Rules
UI is a projection layer
UI is stateless regarding variant logic
UI reacts only to:
resolveVariantEligibility(seed)
Behaviour
If variant exists → button appears
If selected → highlighted
If removed → disappears automatically
🧠 4. Composition Store

📁 /stage3/store/compositionStore.ts

Stores only:

selected: {
  actors,
  collage,
  logo
}
Rules
No validation logic
No registry access rules
No filtering
Pure state container
🧬 5. Blueprint Resolver (Layout Translator)

📁 /stage3/engine/variant/resolveVariantBlueprint.ts

This layer converts:

variant → layout intent → blueprint
Flow
variantRegistry.layout
        ↓
LayoutIntent
        ↓
LayoutBlueprint
Rules
Only translates layout → style blueprint
No actor logic
No asset logic
No variant-specific branching
🏗 6. Scene Compiler (Geometry Builder)

📁 /stage3/compiler/buildCompositionScene.ts

This system:

converts blueprint + seed → render nodes

Responsibilities
read selected variant
read blueprint layout
apply deterministic geometry rules
generate scene nodes
Critical Rule

Scene compiler MUST NOT:

know variant meaning
contain per-variant logic
contain registry decisions
Allowed
layout-based positioning
deterministic geometry functions
actor iteration
🎨 7. Renderer (Execution Layer)

SceneRenderer:

draws nodes
applies transforms
renders pixels
Rules
NO layout logic
NO decisions
NO filtering
NO interpretation

Equivalent to:

draw(image, x, y, width, height)
📏 8. Layout System (Canonical Geometry Model)

Layout is:

a fixed structural intent applied consistently

Supported layouts
row
center-focus
w-overlap
grid
none
Geometry rule

All positioning is:

deterministic
computed in compiler only
never user-driven
never runtime adaptive
🔒 9. Variant Constraint Rule

A variant is eligible only if:

seed.assets[layer].length >= maxAssets
Effects
prevents invalid UI options
prevents renderer overflow
ensures deterministic composition
🧭 10. System Guarantees

If implemented correctly:

✔ UI always reflects truth
✔ renderer never decides anything
✔ no duplicate variant logic
✔ no layout drift
✔ no conditional branching explosion
✔ fully deterministic output

🧠 Final Mental Model (Corrected)
A variant is:

a declarative constraint on asset composition

NOT:

a layout
a UI button
a rendering rule
Pipeline truth:
Registry (truth)
→ Eligibility (filter)
→ UI (display)
→ Store (selection)
→ Blueprint (interpret layout)
→ Compiler (geometry)
→ Renderer (draw only)
🔒 Hard Rule (System Stability Anchor)

Adding a variant must never require changes outside:

variantRegistry.ts
(optional) blueprint mapping if new layout type is introduced

Everything else is automatic.