Here’s what a Stage 3 AppShell layout should look like if you want a clean separation between:

UI control plane (sidebar)
render plane (canvas)
state plane (Zustand / seeds / variants)

This is the structure that prevents the coupling you’ve been fighting.

🧱 STAGE 3 APPSHELL (TARGET ARCHITECTURE)
AppShell
│
├── TopBar (optional / future metadata navigation)
│
├── MainContent
│    │
│    ├── LeftSidebar (CONTROL PLANE)
│    │      └── Stage3VariantPanel
│    │      └── metadata controls
│    │      └── debug tools (optional)
│    │
│    ├── CanvasRegion (RENDER PLANE)
│    │      └── CanvasViewport
│    │            └── SceneRenderer
│    │
│    └── RightSidebar (optional future inspector/debug)
│
└── GlobalState (Zustand)
🧠 CORE IDEA

You are explicitly separating three independent systems:

1. CONTROL PLANE (UI)
LeftSidebar

Responsibilities:

selecting variants
cycling options
showing eligibility
user intent only

❌ must NOT:

position actors
compute layout
influence geometry directly

✔ only writes:

useCompositionStore.setSelected(...)
2. RENDER PLANE (CANVAS)
CanvasViewport → SceneRenderer

Responsibilities:

buildCompositionScene()
resolveVariantBlueprints()
computeActorPosition()
node generation

❌ must NOT:

know UI exists
render controls
depend on DOM layout

✔ only consumes:

seed + selected (snapshot state)
3. STATE PLANE (ZUSTAND)
useCompositionStore

Responsibilities:

seed storage
selected variants
metadata bar state

❌ must NOT:

compute layout
render UI
decide eligibility

✔ acts as:

shared immutable contract layer

🧭 APP SHELL IMPLEMENTATION (STRUCTURAL VIEW)
export default function AppShell() {
  const seed = useCompositionStore((s) => s.seed);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "280px 1fr",
      height: "100vh",
      background: "#000"
    }}>
      
      {/* LEFT: CONTROL PLANE */}
      <aside style={{
        borderRight: "1px solid #222",
        overflow: "auto"
      }}>
        <Stage3VariantPanel seed={seed} />
      </aside>

      {/* CENTER: CANVAS PLANE */}
      <main style={{
        position: "relative",
        overflow: "hidden"
      }}>
        <CanvasViewport>
          <SceneRenderer seed={seed} />
        </CanvasViewport>
      </main>

    </div>
  );
}
📍 WHAT THIS FIXES IMMEDIATELY
1. UI is no longer spatially coupled to canvas

Before:

overlay inside canvas world

After:

completely separate DOM region
2. No z-index dependency

You eliminate:

panel overlap issues
actor layering confusion
accidental canvas interference
3. Clear mental model
LEFT = intent
RIGHT = output

This is extremely important for Stage 3 scaling.

4. Scene renderer becomes pure again

It only cares about:

seed + selected → nodes[]

No UI awareness anywhere.

⚠️ WHAT THIS DOES NOT CHANGE

This is important for your earlier issues:

Still unchanged:
actor bottom anchoring (baseBottom = 160)
layout rigidity
variant system logic
eligibility engine

Because those live in:

buildCompositionScene / computeActorPosition
🧠 WHY THIS IS THE “RIGHT” CUT

Because it aligns with a stable mental model:

BEFORE (coupled system)
UI + Canvas + State = one mixed spatial system
AFTER (clean system)
UI (intent)
Canvas (render)
State (contract)
🔑 CORE RULE AFTER THIS CHANGE

UI can change state, but must never share layout space or assumptions with the renderer.