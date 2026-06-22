JellyBack — Stage 3 Constitution v1.0 (Corrected)

Effective Date: June 2026
Scope: All Stage 3 systems (store, eligibility, blueprint, compiler, renderer, UI shell)

This document defines the non-negotiable architecture rules for Stage 3.

It is written to match the actual implemented system, not an idealised version.

0. SYSTEM DEFINITION

Stage 3 is a:

Deterministic media composition engine that builds structured visual scenes from a fixed asset pool and a user-controlled variant selection system.

It is NOT:

an AI design system
a layout optimizer
a creative generator
a dynamic aesthetic engine

It does NOT decide what looks good.

It only executes rules.

1. CORE PIPELINE (IMMUTABLE)

Stage 3 always executes in this order:

Seed (Stage 2.5)
   ↓
Composition Store (selected state)
   ↓
Eligibility Engine (valid options only)
   ↓
Blueprint Resolver (layout → style)
   ↓
Scene Compiler (geometry expansion)
   ↓
Scene Renderer (draw only)
2. HARD ARCHITECTURAL LAWS

These laws are binding across ALL Stage 3 code.

LAW 1 — Stage 3 never invents

Stage 3 MUST only operate on provided assets.

Allowed:
filtering variants
selecting layouts
computing geometry from rules
Forbidden:
generating assets
inventing fallback media
duplicating or synthesizing content
“helping” missing data

If data is missing → it is missing.

LAW 2 — Variants are strictly valid-by-constraint

A variant is only valid if:

maxAssets ≤ available assets in seed

Rules:
Only valid variants are shown in UI
Only valid variants can be selected
Invalid variants are never rendered
Important:

Stage 3 may expose MULTIPLE valid variants at once.

It is NOT a single-choice system.

LAW 3 — Layouts are fixed intents, NOT creative decisions

Layouts define intent, not geometry.

Layout system:
row
center-focus
w-overlap
grid
none
Extended concept (important correction):

Layouts are:

deterministic intent descriptors, not absolute positioning systems

Reality:
Layout determines geometry strategy
Geometry is computed deterministically per element
LAW 4 — Geometry is deterministic, not creative

Stage 3 does NOT “design” positioning.

It computes it.

Rules:
Actor positions are derived from:
layout type
index
total count
No randomness
No aesthetic inference
No contextual adaptation
Allowed:
spacing formulas
index-based distribution
layout-specific transforms
Forbidden:
AI placement decisions
aesthetic balancing
automatic “better positioning”
LAW 5 — Renderer is stateless and dumb

Renderer ONLY executes nodes.

Renderer responsibilities:
draw image
apply x/y/width/height
respect opacity/zIndex
Renderer MUST NOT:
interpret variants
compute layout
choose assets
modify geometry
infer structure

Renderer behaves like:

draw(image, x, y, width, height)

Nothing more.

LAW 6 — UI is a control surface only

UI:

displays eligible variants
writes selected variant IDs to store
does not compute eligibility
does not interpret layout

UI is NOT part of rendering logic.

LAW 7 — Store is the only state authority

Composition Store holds:

seed
selected variants
metadata state
Store MUST NOT:
compute layout
interpret scene structure
resolve eligibility rules

It only stores decisions.

3. LAYER RESPONSIBILITIES
3.1 Eligibility Engine (FILTER LAYER)

Purpose:

Determine which variants are allowed for a given seed

Output:
list of valid UI options
Rules:
based only on seed constraints
no layout computation
no rendering logic
3.2 Blueprint Resolver (INTENT → STYLE)

Purpose:

Convert layout intent into style blueprint

Rules:
pure mapping
no seed awareness
no UI awareness
3.3 Scene Compiler (GEOMETRY ENGINE)

Purpose:

Convert seed + selection into renderable nodes

Responsibilities:
actor distribution
positioning
node creation
Rules:
deterministic only
index-based computation
no UI awareness
3.4 Renderer (OUTPUT ONLY)

Purpose:

Render nodes visually

Rules:
consumes nodes
no logic allowed
no decisions allowed
4. VARIANT SYSTEM RULES
4.1 Variant definition

Each variant defines:

layer (actors / logo / collage)
layout intent
maxAssets constraint
visibility rules
4.2 Multi-variant validity

Stage 3 allows:

multiple valid variants per seed

Example:

A film with 5 actors can validly show:

1 actor layout
3 actor layout
5 actor row
5 actor overlap

All are valid simultaneously.

4.3 Selection rule

User selection is:

choosing one valid interpretation, not unlocking capability

5. GEOMETRY RULES
5.1 Actor layout behaviour

Actors are positioned via:

layout type
index
total actors

No absolute positioning per actor is stored in variants.

5.2 Layout anchoring rule (important)

All layouts currently default to:

bottom-anchored composition space

BUT:

system supports extension to top/middle/full anchors
anchor is derived from layout intent, not UI
6. SEPARATION BOUNDARY RULES
HARD BOUNDARIES
Layer	Can access
UI	Store only
Store	nothing below
Eligibility	Seed only
Blueprint	Variant registry only
Compiler	Seed + selected only
Renderer	Nodes only
FORBIDDEN IMPORTS
UI importing compiler logic
renderer importing store
eligibility importing layout engine
blueprint reading seed state
7. SYSTEM PHILOSOPHY (CORRECTED)

Stage 3 is:

A deterministic rule execution engine with computed geometry expansion

NOT:

AI layout system
creative compositor
aesthetic optimizer
8. NON-NEGOTIABLE DESIGN INTENT

Stage 3 prioritises:

determinism
explicit rules
reproducibility
user-controlled selection

NOT:

automation
aesthetic inference
layout intelligence
adaptive design
9. FUTURE EXTENSION RULE

All future features MUST:

extend contracts
NOT modify core pipeline order
NOT introduce creative decision-making layers
FINAL STATEMENT

Stage 3 does not “design”.

Stage 3 does not “decide”.

Stage 3 only:

filters → maps → computes → renders