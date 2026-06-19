# JellyBack Stage 3 Composition Review

## June 2026

---

# Purpose

This document captures the current agreed direction for the JellyBack Stage 3 composition system.

The goal is to preserve design decisions independently from chat history and prevent future development from becoming overly complex or system-led.

---

# Core Philosophy

JellyBack is not a design application.
JellyBack is not a poster editor.
JellyBack is a composition engine.
The user creates a background in Stage 2.
Stage 2.5 freezes that work into a seed.
Stage 3 generates compositions from the seed.
The user selects results rather than building layouts manually.

---

# Key Discovery

The project became significantly simpler when composition was separated into:

* Visual Treatment
* Placement

These are independent concerns.

A treatment can work in multiple placements.
A placement can support multiple treatments.

---

# Design Principles

## Background Is The Hero

The Stage 2 generated background remains the primary visual element.

Background should:

* Fill the canvas
* Establish mood
* Remain visually dominant

Background should not:

* Become a collage asset
* Be heavily manipulated by foreground elements
* Lose importance to supporting imagery

---

## Foreground Should Have Presence

Supporting assets should feel intentional.

Avoid:

* PowerPoint aesthetics
* Floating UI cards
* Generic image galleries

Aim for:

* Professional packaging design
* DVD covers
* Blu-ray covers
* Steelbooks
* Movie marketing materials

---

## Borders Matter

Borders are not decorative.

Borders:

* Create hierarchy
* Define regions
* Frame content
* Separate visual areas

Borders are a major component of the JellyBack visual language.

---

## Rich Seeds Do Not Require Rich Layouts

A seed may contain:

* 20 actors
* 30 backdrops
* Logo
* Banner
* Clearart
* Metadata assets

This does not mean all assets should be displayed.

A composition may use:

* 2 actors
* 3 backdrops

and ignore everything else.

Asset abundance should never force complexity.

---

## Variants Are The Exploration Space

The core renderer should remain simple.

Experimentation belongs inside:

* Archetypes
* Treatments
* Variants

not inside increasingly complex rule systems.

---

# Approved Treatment Concepts

These treatments have tested well during Stage 3 experimentation.

---

## SOFT_FOCUS

Purpose:

* Integrated appearance
* Softer hierarchy
* Editorial feel

Characteristics:

* Rounded corners
* Softened edges
* Reduced dominance

---

## HARD_FOCUS

Purpose:

* Strong visual hierarchy
* Poster-like presence

Characteristics:

* Higher contrast
* Stronger shadow
* More dominant imagery

---

## FILM_STRIP

Purpose:

* Sequential image presentation
* Strong containment

Characteristics:

* Framed imagery
* Ordered structure
* Physical media aesthetic

---

# Approved Placement Concepts

Current placement families:

* STACK_LEFT
* STACK_RIGHT
* SIDE_STRIP
* CORNER_CLUSTER

These should remain simple geometry systems rather than becoming complex layout engines.

---

# Spacing Behaviour

Current approved spacing options:

## OVERLAP

Creates:

* Depth
* Movement
* Layering

---

## NO_OVERLAP

Creates:

* Structure
* Clarity
* Separation

---

# Asset Types

The composition system should be asset-agnostic.

Supported asset families:

* ACTOR
* BACKDROP
* LOGO
* BANNER
* CLEARART
* METADATA

The same treatment and placement systems should be reusable across asset types.

---

# Approved Composition Archetypes

These emerged from reviewing real DVD and Blu-ray packaging.

---

# HERO_MOSAIC

Structure:

One large hero image.

One supporting mosaic of four images.

Example:

┌──────────────┬──────────────┐
│              │              │
│              │  ┌──┬──┐     │
│    HERO      │  ├──┼──┤     │
│              │  └──┴──┘     │
│              │              │
└──────────────┴──────────────┘

Uses:

* Hero background
* Supporting actors
* Supporting backdrops
* Mixed supporting assets

Strong hierarchy.

Highly aligned with DVD packaging.

Status: Approved Candidate

---

# CONTACT_SHEET

Structure:

Two rows of four images.

Example:

┌────┬────┬────┬────┐
│ A  │ B  │ C  │ D  │
├────┼────┼────┼────┤
│ E  │ F  │ G  │ H  │
└────┴────┴────┴────┘

Purpose:

* Show variety
* Showcase scenes
* Display multiple assets equally

Typically suited to:

* Backdrops
* Actors
* Mixed assets

Status: Approved Candidate

---

# HERO_STRIP

Structure:

One hero image.

Supporting imagery arranged vertically or horizontally.

Examples:

* Actor strip
* Backdrop strip

Status: Approved Candidate

---

# HERO_CLUSTER

Structure:

One hero image.

Small clustered supporting images.

Purpose:

* Layered visual storytelling
* Strong supporting context

Status: Approved Candidate

---

# LOGO_STRIP_SHOWCASE

Structure:

Logo across top.

Three 16:9 supporting images down one side.

Large area left intentionally empty for the generated background.

Metadata bar at bottom.

Example:

┌───────────────────────────────┐
│            LOGO               │
├───────────────┬───────────────┤
│               │               │
│ 16:9 IMAGE    │               │
├───────────────┤               │
│ 16:9 IMAGE    │ BACKGROUND    │
├───────────────┤               │
│ 16:9 IMAGE    │               │
├───────────────┴───────────────┤
│         METADATA BAR          │
└───────────────────────────────┘

Purpose:

* Showcase supporting imagery
* Preserve background dominance
* Use negative space intentionally

Status: Approved Candidate

---

# Styling Families

Two strong styling families have emerged.

---

## SOFT_GALLERY

Characteristics:

* Rounded corners
* Thin transparent gaps
* Slight feathering
* Premium editorial appearance

---

## FRAMED_GALLERY

Characteristics:

* Thin black frame
* Thin grey frame
* Minimal spacing
* DVD / Blu-ray packaging aesthetic

---

# User Control Philosophy

The user should guide direction rather than design layouts.

Avoid:

* Drag and drop
* Manual positioning
* Treatment selection
* Layout editors

Preferred approach:

## Composition Mode Selector

Example:

* Collage
* Showcase
* Surprise Me

---

### Collage

Uses archetypes such as:

* HERO_MOSAIC
* CONTACT_SHEET
* HERO_CLUSTER

More imagery.

Higher visual density.

---

### Showcase

Uses archetypes such as:

* LOGO_STRIP_SHOWCASE
* HERO_STRIP
* Minimal layouts

More breathing room.

Background remains dominant.

---

### Surprise Me

Allows renderer to use any archetype family.

---

# Major Architectural Discovery

Instead of building:

* Actor Layouts
* Backdrop Layouts
* Logo Layouts

Stage 3 should evolve toward:

Asset System
+
Treatment System
+
Placement System

This allows composition behaviours to be shared across all asset types.

---

# Guiding Rule

If a treatment looks excellent, many placements can work.

If a treatment looks poor, no placement will save it.

Therefore:

Visual treatment should be prioritised before placement logic.

This principle should guide future Stage 3 development.
