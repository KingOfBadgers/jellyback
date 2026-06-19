import { Composition } from "./compositionTypes";

export function applyTemplate(
  composition: Composition,
  slots: Composition["slots"]
): Composition {
  return {
    ...composition,
    slots,
  };
}