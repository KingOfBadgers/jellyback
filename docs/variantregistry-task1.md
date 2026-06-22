1) Variant Registry — what to add now (even if unused)

Right now your registry is functionally correct but not future-complete. It only supports actors + a minimal logo/collage model.

To stop future refactors, you want to extend it into a full composition capability contract, not just current usage.

🧱 REQUIRED EXPANSION OF VARIANT REGISTRY
A. Add missing layers (even if stubbed)

You currently only effectively support:

actors
logo
collage

You should explicitly add:

"background"
"metadata"
"overlay"
"fx"
"frame"

Even if unused.

B. Expand layout intent space (critical for your “top banner” requirement)

Right now:

row
center-focus
w-overlap
grid
none

Add:

top-banner
bottom-banner
full-bleed
left-stack
right-stack
center-stack
floating
diagonal
split-left
split-right

These should exist even if only 1–2 are used initially.

C. Add vertical anchoring contract (THIS is what you’re missing)

Right now positioning is implicit inside computeActorPosition.

You need an explicit contract:

type VerticalAnchor =
  | "top"
  | "middle"
  | "bottom"
  | "full";

Add to every variant:

verticalAnchor: VerticalAnchor;

Even if defaulted to "bottom" for now.

D. Add density / grouping metadata (future-proofing UI + layout scaling)
density: "low" | "medium" | "high";

Purpose:

controls spacing logic later
prevents hardcoded “120px spacing everywhere”
E. Add layout behavior flags (non-functional placeholders)
behaviorFlags: {
  overlapsAllowed: boolean;
  scaleWithActors: boolean;
  centerBias: number; // 0–1
}

These are currently missing but will matter for real composition diversity.

F. Add explicit “composition role”
role:
  | "primary"
  | "supporting"
  | "decorative"
  | "background"
  | "ui-anchor";

This prevents future ambiguity between UI and scene layers.

G. Add versioning (critical for stopping future drift)
version: number;
deprecated?: boolean;

Even if always 1.

🧱 RESULTING STRUCTURE (CONCEPTUAL)

Every variant should eventually look like:

{
  id,
  layer,

  layout,
  verticalAnchor,

  maxAssets,

  role,
  density,

  visibility,

  behaviorFlags,

  version
}
🚨 WHY THIS MATTERS

You are currently missing explicit vertical intent, which is why:

everything defaults to bottom strip behavior
UI feels “stuck”
layout system feels rigid

This is not a renderer issue — it’s missing contract fields.