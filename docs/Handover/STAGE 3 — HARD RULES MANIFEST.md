🧱 1. Layout Immutability Rule

A layout defines structure only. It is never modified at runtime.

Rules:
Layouts are static definitions in /layouts/
Slots are fixed geometry templates
No runtime mutation of:
x
y
width
height
Allowed:
applying global offsets (anchor system only)
Forbidden:
per-slot repositioning based on UI state
duplicating layouts for visual variations
⚙️ 2. Variant = Layout + Options (Single Source Rule)

A variant is never a new layout. It is a layout with configuration.

Rules:
Every variant MUST reference an existing layout
Variants MAY include options
Options MUST NOT define geometry structure
Allowed:
layout + options
Forbidden:
buildFilmStripTop
buildFilmStripBottom
any layout duplication for position differences
🧠 3. Options Are the Only Control Surface

All user-driven variation flows through VariantOptions.

Rules:
Options are the ONLY runtime modifier system
Options are declarative, not procedural
Options must be interpreted in one place only
Allowed option categories:
placement (anchor)
spacing (density, margin)
rendering behaviour (scaleMode, alignment)
feature toggles (enableFrame, enableBackdropTreatment)
Forbidden:
embedding logic in renderer components
interpreting options in multiple files
🧮 4. Single Resolver Rule

All option logic is resolved in one place.

Rules:
ONLY resolveVariantOptions() may interpret options
No component may independently compute:
layout offsets
scaling rules
density rules
Forbidden:
duplicate logic in:
CompositionLayer
SharedFrameRenderer
SlotRenderer
toolbar
🎞 5. Renderer Dumbness Rule

Renderers are execution-only systems.

Rules:
Renderers only draw what they are given
Renderers never decide layout behaviour
Renderers never choose variants
Allowed:
drawing images
applying transforms passed in props
Forbidden:
layout selection
option interpretation
conditional positioning logic
🚫 6. Variant Explosion Prohibition Rule

No concept may be duplicated into multiple layout files.

Rules:
One concept = one layout file
Variants are NEVER file-based
Variants are ALWAYS parameter-based
Forbidden:
Film Strip Top / Bottom layouts
Actor Strip variants as separate layouts
CSS vs Frame duplication at layout level
📏 7. Slot Count Safety Rule

Variants must validate input compatibility.

Rules:
Variants declare:
minSlots
maxSlots
Variants MUST be hidden if invalid
Example:
Film Strip (5-slot) is not shown if only 4 images exist
🎛 8. Toolbar Is a Projection Layer

UI never defines structure — only selects configuration.

Rules:
Toolbar lists variants + options
Toolbar does NOT mutate layouts

Toolbar outputs:

activeVariantId + options
Forbidden:
any geometry logic in UI layer
🧩 9. Canonical Space Rule

All positioning must resolve into a single canonical coordinate space.

Rules:
Final layout is always in canvas space (1000×1500)
All scaling happens before render phase
No mixed coordinate systems
Forbidden:
nested scaling
per-component independent coordinate systems
🧱 10. Composition Ownership Rule

CompositionLayer is the ONLY system allowed to assemble layouts.

Rules:
CompositionLayer:
applies options
resolves offsets
prepares final slot positions
Forbidden:
other components modifying layout geometry

11. Stage 3 must only compose from assets supplied by Stage 2.

Stage 3 must never:

- generate missing assets
- duplicate assets to fill layouts
- invent fallback assets
- substitute unavailable assets automatically

If a variant requires unavailable assets:
the variant is hidden.

🧭 SYSTEM INTENT (IMPORTANT)

This system is deliberately designed to enforce:

Flexibility through parameters
NOT through structural duplication

🧠 Final mental model
LAYOUTS
  = structure (fixed)

OPTIONS
  = behaviour (controlled)

RESOLVER
  = interpretation layer (single source)

RENDERERS
  = dumb drawing system
🔒 GUARANTEE THIS MANIFEST PROVIDES

If followed correctly:

no layout duplication creep
no renderer logic drift
no coordinate desync across features
no “15 variants for one idea” problem
predictable film strip / actor / backdrop behaviour