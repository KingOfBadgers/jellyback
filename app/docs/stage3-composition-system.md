JellyBack Stage 3 Composition System

Status: Approved Direction
Purpose: Define how Stage 3 builds visual compositions from the Stage 2.5 seed.

Core Philosophy

JellyBack is not a design tool.
JellyBack is not a poster editor.
JellyBack is a:
composition engine that generates visually compelling poster variants from a fixed seed.

The user provides no layout instructions.
The system creates compositions.
The user eventually selects the result they prefer.

Design Principles
Background Is The Hero

The user-created background generated in Stage 2 remains the foundation of the composition.

background = hero canvas

It should:

fill the canvas
establish tone
remain visually dominant

It should not:

be manipulated by foreground elements
be treated as a collage element
become a texture layer
Foreground Has Presence

Foreground elements should feel intentional and designed.

They should not resemble:

PowerPoint slides
image galleries
UI cards
floating widgets

Foreground elements may soften into the composition but should retain visual authority.

Borders Create Structure

Borders are a composition device.

Borders:

frame elements
create containment
establish hierarchy
separate visual regions

Borders are one of the primary ways compositions gain structure.

Rich Seeds Do Not Require Rich Layouts

A seed may contain:

20 actors
30 backdrops
logo
banner
clearart
metadata

The renderer may choose to display:

2 actors
3 backdrops

and ignore the rest.

Asset abundance should never force visual complexity.

Variants Are The Exploration Space

Complexity belongs in generated variants.

The core renderer remains simple.

New ideas should be introduced as:

new treatment
new placement
new archetype

rather than new rule systems.

Composition Model

Stage 3 compositions are built from two independent concepts:

Treatment
+
Placement

Treatment

Treatment controls:

how an asset looks

Treatment never controls position.

Examples:

SOFT_FOCUS
HARD_FOCUS
FILM_STRIP

Future treatments may be added without affecting placement logic.

SOFT_FOCUS

Purpose:

integrated appearance
softer visual presence
editorial feel

Characteristics:

softened edges
rounded corners
reduced contrast
lighter hierarchy
HARD_FOCUS

Purpose:

strong visual presence
poster-like hierarchy

Characteristics:

stronger contrast
stronger shadow
increased prominence
FILM_STRIP

Purpose:

sequential image presentation
contained imagery

Characteristics:

framed images
ordered presentation
strong structure
Placement

Placement controls:

where assets appear

Placement never controls styling.

Examples:

STACK_LEFT
STACK_RIGHT
SIDE_STRIP
CORNER_CLUSTER
STACK_LEFT

Images arranged vertically on the left side.

|
|
|
STACK_RIGHT

Images arranged vertically on the right side.

      |
      |
      |
SIDE_STRIP

Images presented as a contained strip.

┃
┃
┃
CORNER_CLUSTER

Images grouped into a compact cluster.

┌─┐
└─┘
Spacing Behaviour

Spacing is independent from treatment and placement.

Current approved behaviours:

OVERLAP
NO_OVERLAP
OVERLAP

Elements partially intersect.

[A]
   [B]
      [C]

Creates:

depth
hierarchy
movement
NO_OVERLAP

Elements remain separate.

[A]

[B]

[C]

Creates:

clarity
order
structure
Asset Types

The composition system is asset-agnostic.

It should work for:

ACTOR
BACKDROP
LOGO
BANNER
CLEARART
METADATA

The same composition behaviours can be reused across asset types.

Examples
Actors
SOFT_FOCUS
+
STACK_LEFT
Actors
HARD_FOCUS
+
CORNER_CLUSTER
Backdrops
FILM_STRIP
+
SIDE_STRIP
Backdrops
SOFT_FOCUS
+
HORIZONTAL_STRIP
Renderer Responsibilities

The renderer decides:

treatment
placement
spacing
hierarchy
asset count

The renderer does not expose these decisions to the user.

User Responsibilities

The user does not:

drag elements
position elements
configure treatments
build layouts

The user eventually chooses between generated compositions.

Non-Goals

The following are explicitly outside the scope of Stage 3:

manual drag-and-drop
free-form positioning
design-tool style controls
rule-heavy composition engines
asset-count driven layouts
Current Approved Concepts
Treatments
SOFT_FOCUS
HARD_FOCUS
FILM_STRIP
Placements
STACK_LEFT
STACK_RIGHT
SIDE_STRIP
CORNER_CLUSTER
Spacing
OVERLAP
NO_OVERLAP
Guiding Rule

If a treatment looks excellent, many placements can work.

If a treatment looks poor, no placement will save it.

Therefore:

Visual treatment is prioritised before placement logic.