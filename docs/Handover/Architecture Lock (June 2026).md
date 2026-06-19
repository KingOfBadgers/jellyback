JellyBack — Architecture Lock (June 2026)

This is the version I will now optimize for.

First: What JellyBack is NOT

JellyBack is not:

✗ an intelligent layout engine
✗ a dynamic composition solver
✗ an AI design assistant
✗ a responsive auto-layout system
✗ a system that “helps” by inventing assets
✗ a system that decides what looks best

That is where we repeatedly drifted.

What JellyBack IS

JellyBack is:

A deterministic media composition engine
that builds premium poster-style outputs
from a fixed asset pool.

It:

receives assets
↓
offers valid composition choices
↓
allows user swaps
↓
renders exactly what user selects

No intelligence layer.

The Immutable Pipeline
STAGE 1
Media discovery

↓

STAGE 2
Asset harvesting + preparation

Produces:

• canonical background
• backdrop set
• actor set
• logo/banner
• metadata assets

↓

STAGE 3
Composition engine

Consumes supplied assets only

↓

User chooses:

• backdrops
• actors
• style/layout
• background treatments

↓

Final render
The 5 Engineering Laws (these now govern all future work)
LAW 1 — Stage 3 never invents
You work with what you are given.

Never:

generate fallback assets
duplicate assets
compensate for missing materials

Rule:

No asset = no variant
LAW 2 — Variants must be valid

Do not show invalid options.

Example:

Need 5 actor images
Have 4

→ Hide variant

Never:

repeat actors
use placeholders
crop poster to fill
LAW 3 — Layouts are frozen

Coordinates are authored.

Not calculated.

Meaning:

Film Strip layout
Polaroid layout
Actor layout

contain hard values.

Not:

runtime scaling
dynamic geometry solving
auto coordinate generation

If positioning changes:

user changes coordinates in code

And that is acceptable.

LAW 4 — Renderer is dumb

Renderer only executes.

Renderer never thinks.

Forbidden in renderer:

layout calculations
variant interpretation
asset decisions
coordinate solving
automatic positioning

Renderer should behave like:

draw(image, x, y, width, height)

Nothing more.

LAW 5 — CSS variants need support

This was an important design insight.

Framed layouts

Strong enough visually.

Need no assistance.

Film Strip
Polaroid
Contact Sheet
CSS layouts

Need environmental styling.

Edge Stack
Actor Stack
Backdrop Spread
Hero Triptych

Need:

blur
gradient overlays
vignette
grain
desaturation
cinematic tint
lighting treatments
Immediate Sprint Plan

We rebuild in this order.

No deviations.

Sprint A — Lock architecture

Audit all Stage 3 files.

Remove logic drift.

Confirm separation:

Background
Actor
Backdrop
Composition
Metadata

No code additions.

Only cleanup.

Sprint B — Restore actor variants

Bring back:

generateActorVariants.ts

Recover:

Actor Strip
Actor Stack
Actor Hero
Actor Spread

CSS only.

No frames.

Sprint C — Variant filtering

Build:

generateValidVariants(seed)

Example:

if (actors.length < 5)
hide ACTOR_STRIP

if (backdrops.length < 5)
hide FILM_STRIP

No exceptions.

Sprint D — Background treatments

Create:

Background Styles

Examples:

Cinematic Dark
Desaturated
Heavy Blur
Warm Grade
Cool Grade
Poster Glow
Grain Overlay

Only affects:

BackgroundLayer
Sprint E — Reintroduce framed layouts

Bring back carefully.

First:

POLAROID_SINGLE

Then:

POLAROID_PILE

Then:

FILM_STRIP

Each with:

hard-coded coordinates
frozen geometry
prebuilt positions

No runtime transforms.

My promise going forward on this project

I am explicitly dropping the instinct to push toward:

more abstraction
more automation
more intelligence
more dynamic positioning

Because that repeatedly pushed JellyBack away from its correct architecture.

From here I will optimize for:

determinism
explicit coordinates
frozen layouts
user control
asset-driven variants