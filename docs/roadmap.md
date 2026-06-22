🟢 PHASE 1 — STABILISE SYSTEM (DO THIS FIRST, NO FEATURE WORK)
⬜ 1. Freeze Variant Registry schema
add new fields (even unused)
ensure all variants comply
no logic changes yet

Effort: Low
Risk: Low
Goal: stop future structural drift

⬜ 2. Move VariantPanel OUT of CanvasViewport
introduce AppShell layout
sidebar only

Effort: Low
Risk: Low
Goal: UI/render separation

⬜ 3. Confirm SceneRenderer is pure
input: seed + selected
output: nodes[]
no UI awareness

Effort: Medium
Risk: Medium
Goal: deterministic rendering

⬜ 4. Lock eligibility engine output format
must only return UI options
no registry logic leaks

Effort: Medium
Risk: Medium

🟡 PHASE 2 — FIX CORE UX LIMITATIONS
⬜ 5. Introduce verticalAnchor usage in layout engine
even if only partially used
stop hardcoded “bottom only” system

Effort: Medium
Risk: Medium–High

⬜ 6. Refactor computeActorPosition → multi-anchor aware
bottom → top/middle support
no breaking existing layouts

Effort: High
Risk: High

⬜ 7. Ensure all variants render ALL eligible options
no filtering bugs
no silent omissions

Effort: Medium
Risk: Medium

🔵 PHASE 3 — PRODUCT COMPLETENESS
⬜ 8. Add top-banner + center-stack layouts
first real expansion of layout diversity

Effort: Medium
Risk: Medium

⬜ 9. Improve spacing system (remove hardcoded pixel logic)
introduce density-based spacing rules

Effort: High
Risk: Medium

⬜ 10. Add fallback rendering for empty states
0 actors
missing assets

Effort: Medium
Risk: Low

🟣 PHASE 4 — POLISH
⬜ 11. UI grouping + clarity pass in sidebar
group variants by role/layout
improve readability

Effort: Low
Risk: Low

⬜ 12. Visual consistency pass
spacing
alignment
typography

Effort: Medium
Risk: Low

🧠 FINAL PRINCIPLE (IMPORTANT)

If you follow this order strictly:

You will NOT refactor again — you will only extend

Because:

Registry becomes a contract
Renderer becomes a pure function
UI becomes a dumb control surface