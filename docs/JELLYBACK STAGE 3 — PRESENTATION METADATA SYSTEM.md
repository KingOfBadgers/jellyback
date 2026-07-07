JELLYBACK STAGE 3 — PRESENTATION METADATA SYSTEM
PURPOSE

This document defines the Presentation Metadata system used by Stage 3.

Presentation Metadata is responsible for describing how a scene node should be rendered visually, without embedding CSS knowledge into the compiler or renderer.

It allows variants to describe appearance declaratively while keeping rendering generic and deterministic.

CORE ARCHITECTURE
Variant
    ↓
presentation {}
    ↓
Scene Compiler
    ↓
SceneNode.presentation
    ↓
SceneRenderer
    ↓
data-* attributes
    ↓
Shape Engine CSS

Presentation data flows in one direction only.

Variants describe intent.

Renderer exposes intent.

CSS performs the rendering.

RESPONSIBILITY RULES
Variant

Responsible for visual intent only.

Example:

presentation: {
    shape: "soft-frame",
    frame: "gallery",
    edge: "feather",
    shadow: "soft",
    rotation: -2.5,
}

Variants must never contain CSS.
Variants must never contain pixel values.
Variants must never contain implementation details.

Scene Compiler

Responsible for transporting presentation metadata.
Compiler MUST NOT interpret presentation.
Compiler MUST NOT modify presentation.
Compiler MUST NOT inject styling.

It simply copies:

Variant

↓

SceneNode.presentation
SceneNode

Presentation metadata is stored on every renderable node.

Example:

presentation?: {
    shape?: string;
    frame?: string;
    stack?: string;
    edge?: string;
    shadow?: string;
    rotation?: number;
};

Presentation is optional.

Nodes without presentation continue to render normally.

SceneRenderer

Renderer exposes presentation metadata as HTML data attributes.

Example:

data-shape={node.presentation?.shape ?? ""}
data-frame={node.presentation?.frame ?? ""}
data-edge={node.presentation?.edge ?? ""}
data-shadow={node.presentation?.shadow ?? ""}
data-stack={node.presentation?.stack ?? ""}

Renderer must never interpret these values.
Renderer must never contain switch statements for presentation.
Renderer is a transport layer only.

Shape Engine

The Shape Engine owns visual rendering.
It consumes presentation metadata using attribute selectors.

Example:

[data-shape="soft-frame"] {
}

Example:

[data-frame="gallery"] {
}

Example:

[data-edge="feather"] {
}

Example:

[data-shadow="soft"] {
}

The Shape Engine owns:

borders
masks
corner radius
overflow
clipping
inner highlights
outer glow
frame construction
PRESENTATION FIELDS
Shape

Defines the primary presentation style.

Examples:

poster-clean
hero-card
support-card
stacked-card
soft-frame
polaroid
film-strip
magazine-frame

Only one shape should normally be applied.

Frame

Defines the framing language.

Examples:

gallery
steel
glass
paper
none

Frame styles should enhance a shape.

They should not replace it.

Edge

Defines edge treatment.

Examples:

hard
soft
feather
fade
vignette

Edge styles affect blending with the background.

Shadow

Defines lighting behaviour.

Examples:

none
soft
cinema
lift
dramatic

Shadow styles control depth only.

Stack

Defines overlap behaviour.

Examples:

overlap
fan
cascade
tight
none

Stack is used primarily for grouped layouts.

Rotation

Defines initial rotation.

Example:

rotation: -2.5

Rotation is applied by the spatial resolver.

CSS should not hardcode rotation.

DESIGN PRINCIPLES

Presentation metadata should describe appearance.

It should never describe implementation.

Good:

gallery
soft
cinema
glass

Bad:

border8
blur5
shadow24
radius14

Names should express design language rather than CSS values.

ADDING A NEW PRESENTATION STYLE
Step 1

Extend the presentation object if necessary.

Example:

presentation: {
    frame: "glass"
}
Step 2

Expose the new field inside SceneRenderer.

Example:

data-frame={node.presentation?.frame ?? ""}
Step 3

Create CSS inside Shape Engine.

Example:

[data-frame="glass"] {
}
Step 4

Reference the presentation from a variant.

Example:

presentation: {
    shape: "soft-frame",
    frame: "glass"
}

No compiler changes should be required.

RESPONSIBILITY BOUNDARIES
Variants

Own design intent.

Compiler

Owns transport.

Renderer

Owns HTML output.

Shape Engine

Owns visual appearance.

Treatment Engine

Owns image processing.

Examples:

contrast
glow
bloom
vignette
colour grading
sharpen

Treatments should never create borders or frames.

FORBIDDEN CHANGES

Future developers and AI systems MUST NOT:

Embed CSS values into variants.
Add presentation logic to the compiler.
Add presentation logic to the renderer.
Hardcode frame behaviour in React.
Duplicate styling across multiple CSS files.
Mix Treatment Engine responsibilities with Shape Engine responsibilities.
GOLDEN RULE

Presentation metadata exists to describe what a node should look like, not how it is implemented.

The rendering pipeline must always remain:

Variant
        ↓
Presentation Metadata
        ↓
Scene Compiler
        ↓
SceneNode
        ↓
SceneRenderer
        ↓
HTML data-* attributes
        ↓
Shape Engine CSS

This separation allows entirely new visual languages—such as Criterion, Steelbook, Gallery, Minimal, Premium, or future themes—to be introduced by extending presentation metadata and CSS alone, without modifying the compiler or renderer architecture.