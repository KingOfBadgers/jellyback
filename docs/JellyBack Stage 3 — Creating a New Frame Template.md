JellyBack Stage 3 — Frame System Guide
1. What is a Frame?

A Frame is not a layout.

A Frame is not a Variant.

A Frame is a reusable visual template consisting of:

PNG artwork
Native coordinate system
Image slot definitions
Asset source
Placement rules
Rotation rules
Rendering mode

The frame never decides what to display.

It only describes:

where images belong
how many images it supports
how the artwork surrounds those images
how the final object is positioned on the Stage 3 canvas

Pipeline:

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
2. Frame Modes

Frames now support two rendering models.

2.1 Single Frame Mode

Used when:

1 image
+
1 PNG frame

Example:

Polaroid Classic Actor
Polaroid Classic Backdrop

Structure:

Image
  │
  ▼
Frame Artwork

Registry:

renderMode:"single"

or omit renderMode.

The frame controls:

position
rotation
transform origin

The image follows the same rotation.

2.2 Per Slot Frame Mode

Used for:

multiple images
+
multiple copies of the same frame

Examples:

3 Card Fan
4 Card Scatter
5 Card Display

Structure:

Image 1
  +
Frame 1


Image 2
  +
Frame 2


Image 3
  +
Frame 3

Registry:

renderMode:"perSlot"

Each slot becomes an independent card.

Each card can have:

x position
y position
rotation
z-index
3. Design the PNG

Create the artwork in:

Photoshop
Affinity
GIMP
any image editor

Example:

polaroid-classic.png

Requirements:

Transparent PNG
Native resolution unchanged
Do NOT resize for Stage 3
Decorative artwork only
Image openings remain transparent

Example:

1600 × 2200

This becomes the frame canvas.

4. Measure the PNG

Record the original artwork dimensions.

Example:

Width  = 1600
Height = 2200

Registry:

canvas:{
    width:1600,
    height:2200,
}

Never use displayed values.

Always use original PNG dimensions.

The builder calculates scaling automatically.

5. Measure Every Image Window

Every transparent opening becomes a slot.

Measure in the original PNG.

Example:

Slot 1

x = 140
y = 140

width  = 1380
height = 1390

Registry:

imageSlots:[
{
 id:"image1",
 x:140,
 y:140,
 width:1380,
 height:1390,
}
]
6. Slot Positioning Rules

Slots control where images sit inside the frame.

Example:

PNG
|
|
+----------------+
|                |
|    IMAGE       |
|                |
|                |
+----------------+

If the image does not align:

Adjust:

imageSlots.x
imageSlots.y
imageSlots.width
imageSlots.height

Do NOT adjust the renderer.

The registry owns geometry.

7. Asset Source

Choose which collection fills the frame.

Available:

actors

or

backdrops

Example:

imageSource:"actors"

or:

imageSource:"backdrops"

A frame never mixes sources.

8. Asset Count

The number of slots determines eligibility.

Example:

3 card fan

requires:

maxAssets:3

Eligibility:

available assets >= maxAssets

Example:

Movie:

Actors = 7

Frame:

maxAssets = 3

Result:

Eligible

Movie:

Actors = 1

Frame:

maxAssets = 3

Result:

Hidden
9. Placement

Frames declare placement intent.

They do not calculate their own canvas position.

Example:

Bottom:

placement:{
 mode:"width",
 anchor:"bottom",
 width:1000,
}

Centre:

placement:{
 mode:"width",
 anchor:"center",
 width:400,
}

Available anchors:

top
center
bottom

Future:

contain
height
absolute
10. Rotation Support

Frames now support rotation.

Example:

placement:{
 width:400,
 rotation:-10,
 transformOrigin:"center center"
}

The builder creates:

transform:
rotate(-10deg)
11. Transform Origin

Rotation pivot can be controlled.

Default:

center center

Available examples:

"left bottom"
"center bottom"
"right bottom"

Example:

Fan card:

      /
     /
----●

with:

transformOrigin:"left bottom"

creates a physical card fan effect.

12. Scatter and Fan Frames

Scatter/fan layouts use:

renderMode:"perSlot"

Each slot becomes an independent card.

Example:

imageSlots:[
{
 id:"card1",
 x:120,
 y:500,
 rotation:-12
},

{
 id:"card2",
 x:300,
 y:450,
 rotation:0
},

{
 id:"card3",
 x:480,
 y:500,
 rotation:12
}
]

The registry controls:

horizontal spread
vertical variation
rotation

The builder does not create the effect.

13. Building Wide Scatter Layouts

For a wider horizontal scatter:

Increase slot x positions.

Example:

Card 1
x:100


Card 2
x:330


Card 3
x:560


Card 4
x:790

The frame remains centred only if the placement says so.

Scatter width is controlled by slot geometry.

14. Registry Example

Example:

{
id:"polaroid_fan_3_actor",

displayName:
"Three Card Polaroid Fan",

src:
"/frames/polaroid-classic.png",

imageSource:
"actors",

maxAssets:3,

renderMode:
"perSlot",

canvas:{
width:1600,
height:2200,
},

imageSlots:[
{
id:"card1",
x:120,
y:500,
width:1380,
height:1390,
rotation:-15,
},

{
id:"card2",
x:300,
y:450,
width:1380,
height:1390,
},

{
id:"card3",
x:480,
y:500,
width:1380,
height:1390,
rotation:15,
},
],

placement:{
mode:"width",
anchor:"center",
width:400,
}

}
15. Frame Builder

The builder converts:

Registry
   |
   ▼
Scale
   |
   ▼
Canvas Position
   |
   ▼
Scene Nodes

It creates:

Image nodes:

frame-slot-xxxx

Frame nodes:

frame-xxxx

For per-slot:

frame-card1
frame-card2
frame-card3

No new builder code should normally be required.

16. Scene Graph

Example:

Background

Image 1
Frame 1

Image 2
Frame 2

Image 3
Frame 3

Typical z-order:

0
Background


850+
Images


855+
Frames


900
Single Frame Artwork
17. Renderer Rules

SceneRenderer only displays nodes.

It must not:

choose assets
calculate layouts
query Jellyfin
adjust frames
correct alignment
create variants

Renderer responsibility:

Node
 |
 ▼
HTML element
 |
 ▼
Image
18. Troubleshooting Alignment
Image inside frame is wrong

Adjust:

imageSlots

Change:

x
y
width
height
Rotation looks wrong

Adjust:

transformOrigin

Example:

transformOrigin:"left bottom"
Scatter is too central

Adjust:

slot.x

Increase horizontal spread.

Fan overlaps too much

Adjust:

slot.x spacing

Example:

Before:

100
250
400

After:

50
350
650
19. Architecture
PNG Artwork
      |
      ▼
Frame Registry
      |
      ▼
Eligibility Engine
      |
      ▼
Frame Builder
      |
      ▼
Scene Graph
      |
      ▼
Scene Renderer

Each layer has one responsibility.

20. Design Principles

A Frame should be:

deterministic
declarative
data-driven
reusable
independent of layouts
independent of rendering
independent of UI
independent of asset selection

A new frame should normally require only:

New PNG artwork
New registry entry

The existing pipeline handles:

scaling
placement
slot creation
rendering
eligibility

If a new frame requires changes outside the registry, first check whether the missing behaviour belongs inside the frame definition.