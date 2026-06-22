🧊 1. FROZEN CORE (DO NOT CHANGE STRUCTURE EVER AGAIN)

These files define the system invariants. If these move, everything breaks.

🧊 Variant Registry (SOURCE OF TRUTH)
/stage3/engine/variant/variantRegistry.ts
Rule:
Additions only (no reshaping logic)
No computed logic
No UI assumptions
No renderer coupling
Allowed changes:

✔ add new variants
✔ add new fields (backwards compatible only)

Forbidden:

❌ removing fields
❌ changing meaning of layout
❌ embedding logic

🧊 Scene Compiler (RENDER ENGINE CORE)
/stage3/compiler/buildCompositionScene.ts
Rule:
Must remain a pure function:
(seed, selected) → nodes[]
Frozen responsibilities:
geometry generation
actor placement
node creation
Allowed changes:

✔ new layout types
✔ new node layers
✔ performance improvements

Forbidden:

❌ UI logic
❌ state access outside input
❌ conditional feature branching by UI context

🧊 Layout Resolver
/stage3/engine/variant/resolveVariantBlueprint.ts
Rule:
Pure mapping layer only
layout intent → style blueprint
Forbidden:

❌ business logic
❌ seed awareness
❌ UI awareness

🧊 Eligibility Engine
/stage3/engine/variant/resolveVariantEligibility.ts
Rule:
ONLY filters valid UI options
Allowed:

✔ constraint filtering
✔ metadata shaping

Forbidden:

❌ layout decisions
❌ rendering assumptions

🧱 2. STABLE CONTRACT LAYER (EVOLVES ONLY BY EXTENSION)

These define system communication rules.

🧱 Composition Store (STATE CONTRACT)
/stage3/store/compositionStore.ts
Rule:
Single source of truth for:
seed
selected variants
metadata state
Allowed:

✔ add new state fields
✔ add validation
✔ add helpers

Forbidden:

❌ layout logic
❌ rendering logic
❌ scene awareness

🧱 Variant Blueprint Contract
/stage3/engine/variant/resolveVariantContract.ts

(if present in system)

Rule:
defines shape of renderer-safe output
Allowed:

✔ expand contract shape
✔ add fields like verticalAnchor, density

Forbidden:

❌ logic changes to interpretation

🧱 Variant Panel (UI CONTRACT)
/stage3/ui/Stage3VariantPanel.tsx
Rule:
ONLY displays eligibility output
ONLY writes state
Allowed:

✔ layout of UI
✔ grouping of buttons
✔ display logic

Forbidden:

❌ filtering logic
❌ registry scanning
❌ scene awareness

🔁 3. EVOLVING SYSTEMS (SAFE TO ITERATE FREELY)

These are where most product work happens.

🔁 Scene Renderer
/stage3/renderer/SceneRenderer.tsx
Rule:
purely visual
consumes nodes
Allowed:

✔ performance tuning
✔ rendering optimisations
✔ visual effects

🔁 UI Shell / App Layout
/stage3/view/AppShell.tsx   (or ComposePage.tsx)
Rule:
layout composition only
Allowed:

✔ sidebar placement
✔ canvas placement
✔ page structure

🔁 Geometry Engine (Actor Positioning)
computeActorPosition()

inside:

/stage3/compiler/buildCompositionScene.ts
Rule:
this is your ONLY flexible spatial system
Allowed:

✔ new layout types
✔ vertical anchor system
✔ spacing redesign

🧪 4. EXPERIMENT ZONE (SAFE TO BREAK)

These are intentionally non-critical.

🧪 Variant expansion experiments
new layout ideas
new grouping strategies
density experiments
🧪 UI enhancements
inspector panels
debug overlays
metadata visualisation
🧪 Future systems
multi-scene composition
timeline / sequencing
animation layer
🧭 SYSTEM BOUNDARY MAP (IMPORTANT)

Here is the mental model you should lock in permanently:

           ┌──────────────────────┐
           │     UI LAYER         │
           │  Variant Panel       │
           │  AppShell            │
           └─────────┬────────────┘
                     │ writes state
                     ▼
           ┌──────────────────────┐
           │   STATE LAYER        │
           │ Composition Store    │
           └─────────┬────────────┘
                     │ snapshot input
                     ▼
           ┌──────────────────────┐
           │  RENDER LAYER        │
           │ Scene Compiler       │
           │ Blueprint Resolver   │
           │ Geometry Engine      │
           └─────────┬────────────┘
                     │ nodes[]
                     ▼
           ┌──────────────────────┐
           │  OUTPUT LAYER        │
           │ SceneRenderer        │
           └──────────────────────┘
🔑 CRITICAL RULE (THIS PREVENTS FUTURE REFACTOR CHAOS)

Anything in the Render Layer must never import UI or Store internals.

Anything in UI must never compute layout.

State is the ONLY bridge.

🧠 FINAL TAKEAWAY

You are now at the point where:

architecture is mostly correct
instability came from unclear boundaries
not missing features

So the win condition is:

STOP changing core layers
START only extending contracts + layouts