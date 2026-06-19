/**
 * =========================================================
 * RULE OF THIS TYPE
 * =========================================================
 * A CompositionVariant is IMMUTABLE after generation.
 *
 * It represents a fully resolved CompositionGraph.
 *
 * It MUST NOT be:
 * - mutated in the store
 * - regenerated during render
 * - partially constructed at runtime
 *
 * It is a frozen render contract.
 */


import type { CompositionGraph } from "./compositionGraph";

export interface CompositionVariant {
  readonly id: string;
  readonly name: string;
  readonly graph: CompositionGraph;
  readonly tag?: "cinematic" | "editorial" | "experimental" | "retro";
  readonly score?: number;
}