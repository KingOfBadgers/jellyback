/**
 * =========================================================
 * JELLYBACK STAGE 3 — ACTOR VARIANT REGISTRY
 * =========================================================
 *
 * PURPOSE
 * -------
 * Defines all valid ACTOR layout templates.
 *
 * RULES
 * -----
 * - NO runtime computation
 * - NO conditional layout generation
 * - ONLY static definitions
 *
 * Stage 3 selects from this list.
 * Renderer applies blindly.
 * =========================================================
 */

export type ActorVariant = {
  id: string;
  label: string;

  /**
   * HARD REQUIREMENTS
   */
  requiredActors: number;

  /**
   * LAYOUT METADATA ONLY
   */
  layout: {
    type: "row" | "grid" | "overlap" | "w-shape";
    spacing: "tight" | "normal" | "wide";
    alignment: "center" | "left" | "right";
  };
};

/**
 * =========================================================
 * ACTOR VARIANTS
 * =========================================================
 */
export const actorVariants: ActorVariant[] = [
  {
    id: "ACTOR_1_CENTER",
    label: "Single Hero",
    requiredActors: 1,
    layout: {
      type: "row",
      spacing: "wide",
      alignment: "center",
    },
  },

  {
    id: "ACTOR_3_CENTER_FOCUS",
    label: "Tri Focus",
    requiredActors: 3,
    layout: {
      type: "row",
      spacing: "normal",
      alignment: "center",
    },
  },

  {
    id: "ACTOR_5_ROW",
    label: "Five Row Spread",
    requiredActors: 5,
    layout: {
      type: "row",
      spacing: "tight",
      alignment: "center",
    },
  },

  {
    id: "ACTOR_5_W_OVERLAP",
    label: "W Overlap Cluster",
    requiredActors: 5,
    layout: {
      type: "w-shape",
      spacing: "tight",
      alignment: "center",
    },
  },
];