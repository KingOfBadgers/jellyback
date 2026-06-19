import { Composition } from "./compositionTypes";

export function createComposition(input: {
  background: string;
}): Composition {
  return {
    background: {
      id: crypto.randomUUID(),
      src: input.background,
    },
    slots: [],
    assets: [],
  };
}