Metadata Bar Architecture (Approved)
Status

Approved Canonical Specification

June 2026

Purpose

The Metadata Bar is a dedicated information zone positioned at the bottom of every Stage 3 composition.

It serves a different purpose from the artistic composition area.

The artistic composition area communicates mood, theme, characters, and visual storytelling.

The Metadata Bar communicates factual media information in a structured and deterministic manner.

The Metadata Bar should resemble the technical information area commonly found on DVD and Blu-ray packaging.

Architectural Separation

Stage 3 is divided into two independent zones:

┌──────────────────────────────┐
│                              │
│                              │
│         ART ZONE             │
│                              │
│                              │
├──────────────────────────────┤
│       METADATA BAR           │
└──────────────────────────────┘
Art Zone

Purpose:

Visual storytelling
Composition exploration
Actor presentation
Backdrop presentation
Logo/banner integration
Archetype generation

The Art Zone is artistic.

The Art Zone may use:

Treatments
Placements
Archetypes
Variants
Metadata Bar

Purpose:

Technical information
Media identification
Packaging authenticity

The Metadata Bar is not artistic.

The Metadata Bar is:

Structured
Ordered
Deterministic
Businesslike

The Metadata Bar does not participate in composition archetypes.

The Metadata Bar exists independently of:

Actor layouts
Backdrop layouts
Placement systems
Treatment systems
Canonical Dimensions

Canvas:

Width  = 1000px
Height = 1500px

Metadata Bar:

Width  = 1000px
Height = 150px

Art Zone:

Width  = 1000px
Height = 1350px

Calculation:

1350 + 150 = 1500
Fixed Rules

The Metadata Bar:

Always exists
Always spans full width
Always sits at canvas bottom
Always renders above artwork
Always uses a height of 150px

These dimensions are fixed.

Variants may not alter:

Width
Height
Vertical placement
Metadata Slot Types

Current approved slot families:

Rating

Source:

MPAA OR BBFC

Rules:

Never display both
Prefer normalized rating data

Examples:

PG
PG-13
R
NC-17
12
15
18
Resolution

Source:

Normalized media information.

Examples:

4K
1080P
720P
Closed Captions

Source:

Subtitle detection.

Example:

CC
Runtime

Source:

Normalized runtime.

Presentation:

Clock Icon + Runtime

Example:

105m
Logo

Source:

Jellyfin logo asset.

Rules:

Logos are uncontrolled external assets.

Logos must always be rendered inside a fixed containment frame.

The logo must never control layout dimensions.

Layout controls the logo.

Barcode

Purpose:

Physical media authenticity.

Current:

Placeholder barcode permitted.

Future:

Generate barcode from:

IMDb URL
TMDb URL
Canonical media identifier

Barcode generation belongs to the Metadata subsystem.

JellyBack Mark

Purpose:

System branding.

Rules:

Small containment frame.

Must not dominate layout.

Metadata Variants

Metadata variants are encouraged.

Variants provide user choice.

Variants must not alter bar dimensions.

Examples:

FULL

Contains:

Logo
Rating
Resolution
CC
Runtime
Barcode
JB
STANDARD

Contains:

Rating
Runtime
Barcode
JB
TECH

Contains:

Rating
Resolution
CC
Runtime
Barcode
JB
LOGOLESS

Contains:

Rating
Resolution
Runtime
Barcode
JB
MINIMAL

Contains:

Barcode
JB
Missing Data Philosophy

Metadata availability should influence variant generation.

If data does not exist:

Do not fabricate values
Do not create placeholder metadata

Instead:

Exclude unsupported variants
Generate variants appropriate to available information

Worst-case valid bar:

Barcode
+
JB Mark

This remains a valid Metadata Bar.

Renderer Philosophy

The Metadata Bar is not a floating overlay.

The Metadata Bar is a dedicated physical region of the composition.

The Metadata Bar should be treated similarly to the technical information strip found on DVD and Blu-ray packaging.

This specification is independent from:

Actor systems
Backdrop systems
Placement systems
Treatment systems
Archetype systems

The Metadata Bar is a standalone Stage 3 subsystem.