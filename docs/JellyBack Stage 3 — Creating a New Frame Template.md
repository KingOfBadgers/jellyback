1. What is a Frame?

A Frame is not a layout.

A Frame is not a Variant.

A Frame is a reusable visual template consisting of:

PNG artwork
Native coordinate system
Image slot definitions
Asset source
Placement on the Stage 3 canvas

The frame never decides what to display.

It only describes where images belong.

Movie
      │
      ▼
Eligibility
      │
      ▼
Frame Registry
      │
      ▼
Frame Builder
      │
      ▼
Scene Graph
      │
      ▼
Renderer
2. Design the PNG

Create the artwork in Photoshop, Affinity, GIMP etc.

Example:

film-strip-5.png

Requirements:

Transparent PNG
Native resolution should remain unchanged
Do NOT resize for Stage 3
Decorative artwork only
Image holes remain transparent

Example

1333 × 252
3. Measure the PNG

Record the native size.

Example

Width  = 1333
Height = 252

These become

canvas:{
    width:1333,
    height:252,
}

Never use scaled values.

Always measure the original artwork.

4. Measure Every Image Window

Every transparent opening becomes a slot.

Measure in the original PNG.

Example

Slot 1

x = 0
y = 40

width = 266
height = 175

Repeat for every opening.

Example

Slot 2

x = 267
y = 40

width = 266
height = 175

Continue until every image position is recorded.

5. Decide the Asset Source

Choose which asset collection fills the frame.

Available sources:

actors

or

backdrops

Example

imageSource:"actors"

or

imageSource:"backdrops"

The frame never mixes sources.

6. Decide Asset Count

The number of required assets determines eligibility.

Example

5 slots

↓

maxAssets = 5

The eligibility engine uses

maxAssets <= available assets

If the movie cannot fill every slot, the frame is hidden.

7. Decide Placement

Frames do not position themselves.

They declare intent.

Examples

Bottom strip

placement:{
    mode:"width",
    anchor:"bottom",
    width:1000,
}

Top strip

placement:{
    mode:"width",
    anchor:"top",
    width:1000,
}

Future placement modes may include

contain
height
absolute
8. Add the Registry Entry

Example

{
    id:"five_horiz_panel_actor",

    displayName:
        "Five Horizontal Panel — Actors",

    src:
        "/frames/film-strip-5.png",

    imageSource:
        "actors",

    maxAssets:
        5,

    canvas:{
        width:1333,
        height:252,
    },

    imageSlots:[
        {
            id:"actor1",
            x:0,
            y:40,
            width:266,
            height:175,
        },

        {
            id:"actor2",
            x:267,
            y:40,
            width:266,
            height:175,
        },

        {
            id:"actor3",
            x:534,
            y:40,
            width:266,
            height:175,
        },

        {
            id:"actor4",
            x:801,
            y:40,
            width:266,
            height:175,
        },

        {
            id:"actor5",
            x:1068,
            y:40,
            width:265,
            height:175,
        },
    ],

    placement:{
        mode:"width",
        anchor:"bottom",
        width:1000,
    },
},
9. Eligibility

No additional code should normally be required.

The eligibility engine reads

imageSource

maxAssets

and determines whether the frame should appear.

Example

Movie

Actors = 7

↓

Actor frame

maxAssets = 5

↓

Eligible

Example

Movie

Backdrops = 1

↓

Backdrop frame

maxAssets = 5

↓

Rejected
10. Frame Builder

No new code should be written.

The builder already performs

Registry

↓

Scale factor

↓

Slot positions

↓

Scene nodes

Every slot becomes

frame-slot-xxxx

Every PNG becomes

frame-xxxx
11. Scene Graph

Expected result

Background

↓

Frame Slot Image 1

↓

Frame Slot Image 2

↓

Frame Slot Image 3

↓

Frame Slot Image 4

↓

Frame Slot Image 5

↓

Frame Artwork

Current z-order

0      Background

850    Slot Images

900    Frame Artwork
12. Rendering Rules

A Frame must not:

Choose assets
Perform eligibility
Query Jellyfin
Resize assets intelligently
Modify layouts
Create variants
Perform AI decisions

A Frame only describes geometry.

13. Architecture
PNG Artwork
        │
        ▼
Frame Registry
        │
        ▼
Eligibility Engine
        │
        ▼
Frame Builder
        │
        ▼
Scene Graph
        │
        ▼
Scene Renderer

Every stage has a single responsibility.

14. Design Principles

A Frame should be:

Deterministic
Declarative
Data-driven
Reusable
Independent of layouts
Independent of rendering
Independent of user interface
Independent of asset selection

If a new frame requires changes to the builder, renderer, or eligibility engine, first consider whether the additional behavior belongs in the frame definition itself. The goal is for new frames to be created almost entirely by adding a new registry entry and PNG artwork, with the existing pipeline handling the rest automatically.