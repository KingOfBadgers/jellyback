# JELLYBACK STAGE 3 — METADATA BAR VARIANT EXTENSION GUIDE

## PURPOSE

This document defines the approved method for adding new metadata bar variants to Stage 3.

The goal is to allow future developers and AI systems to create new metadata bar styles WITHOUT modifying existing metadata logic, renderer architecture, or seed structures.

---

# CORE ARCHITECTURE

Stage 3 metadata bars follow a strict layered architecture:

```text
BorderSeed
    ↓
buildMetadataRenderPlan()
    ↓
MetadataRenderPlan
    ↓
Stage3MetadataStripRenderer
    ↓
Final Metadata Bar
```

Each layer has a specific responsibility.

---

# RESPONSIBILITY RULES

## BorderSeed

Responsible for:

* movie metadata
* media metadata
* ratings
* logos
* runtime
* subtitle flags
* barcode source data

Must NEVER contain visual styling.

---

## MetadataRenderPlan

Responsible for:

* slot selection
* slot ordering
* slot inclusion
* variant selection

Responsible for WHAT appears.

Must NEVER contain visual styling.

Examples:

```text
LOGO
RATING
RUNTIME
BARCODE
JB
```

Good.

Examples:

```text
font size
icon size
background colour
spacing
```

Not allowed.

---

## Stage3MetadataStripRenderer

Responsible for HOW things appear.

Examples:

```text
icon sizes
backgrounds
spacing
alignment
padding
theme styling
```

Allowed.

Examples:

```text
runtime existence
rating selection
logo selection
```

Not allowed.

---

# ADDING A NEW VARIANT

## Step 1

Add variant to type definition.

Example:

```ts
export type MetadataBarVariant =
  | "FULL"
  | "STANDARD"
  | "TECH"
  | "LOGOLESS"
  | "MINIMAL"
  | "BLURAY";
```

Only add names that describe a visual style or metadata layout.

---

## Step 2

Update variant selection logic.

Example:

```ts
if (seed.media?.resolution === "4K")
{
  return "UHD";
}
```

Variant selection must remain deterministic.

Never use:

```ts
Math.random()
```

Never use:

```ts
random theme selection
```

Never use:

```ts
AI generated selection
```

Stage 3 must always generate identical output from identical input.

---

## Step 3

Modify slot generation if required.

Example:

BLURAY variant:

```text
LOGO
RATING
RESOLUTION
RUNTIME
BARCODE
JB
```

UHD variant:

```text
RATING
4K
HDR
ATMOS
BARCODE
JB
```

Only change slot composition here.

Never apply styling here.

---

# STYLING VARIANTS

Visual styles belong inside the renderer.

Preferred architecture:

```ts
const theme = metadataThemes[variant];
```

Example:

```ts
const metadataThemes = {
  FULL: {},
  STANDARD: {},
  UHD: {},
  BLURAY: {},
};
```

---

# ALLOWED STYLE DIFFERENCES

Variants may alter:

## Background

Example:

```text
DVD silver
Blu-ray blue
UHD black
Criterion white
Steelbook metal
```

---

## Icon Sizes

Example:

```text
Rating size
Barcode size
JB size
Logo size
```

---

## Typography

Example:

```text
Runtime font
Resolution font
Spacing
Weight
```

---

## Layout

Example:

```text
left aligned
centered
right anchored
justified
```

---

# FORBIDDEN CHANGES

Future AI systems MUST NOT:

Remove existing slot types.

Rename slot types.

Move metadata logic into renderer.

Move styling logic into render plan.

Create special cases inside rendering code.

Duplicate runtime selection logic.

Duplicate rating selection logic.

Introduce randomness.

Refactor architecture solely to support a new visual variant.

---

# ADDING NEW SLOT TYPES

If a genuinely new metadata element is required:

Example:

```text
HDR
ATMOS
DOLBY_VISION
IMAX
STREAMING_PROVIDER
```

Then:

## Step 1

Extend:

```ts
MetadataSlot
```

---

## Step 2

Extend:

```ts
MetadataRenderSlot
```

Only if new data fields are required.

---

## Step 3

Add deterministic population logic inside:

```ts
buildMetadataRenderPlan()
```

---

## Step 4

Add renderer support.

---

# BARCODE EVOLUTION

Current implementation:

```text
Static barcode image
```

Future implementation:

```text
Generated barcode
```

The slot type MUST remain:

```ts
BARCODE
```

Only the icon source changes.

Do NOT create:

```ts
GENERATED_BARCODE
STATIC_BARCODE
CUSTOM_BARCODE
```

Maintain a single BARCODE slot.

---

# JB EVOLUTION

Current:

```text
Static JB image
```

Future:

```text
Variant-specific JB branding
```

Keep slot type:

```ts
JB
```

Only asset source changes.

---

# GOLDEN RULE

To create a new metadata bar:

1. Add variant.
2. Select variant deterministically.
3. Adjust slot composition if necessary.
4. Apply visual style in renderer.

Never refactor architecture merely to create a new visual design.

The metadata system must remain:

DATA → PLAN → STYLE → RENDER

in that order.
