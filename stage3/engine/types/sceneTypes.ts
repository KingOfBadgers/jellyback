


/**
 * =========================================================
 * TREATMENT TYPES
 * =========================================================
 */

type LayerTreatmentGroup = {
  edges: string | null;
  depth: string | null;
  contrast: string | null;
  field?: string | null;
  spacing?: string | null;
};

type CompositionTreatments = {
  actors: LayerTreatmentGroup;
  collage: LayerTreatmentGroup;
  logo: LayerTreatmentGroup;
};

/**
 * =========================================================
 * SCENE TYPES
 * =========================================================
 */

export type SceneNode = {
  id: string;

  layer:
  | "background"
  | "actors"
  | "collage"
  | "logo"
  | "banner";

  src?: string;

  style: {
    position: "absolute";
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
    transform?: string;
    opacity?: number;
    zIndex?: number;
  };

  visible: boolean;

treatments?: string[];

presentation?: {
  shape?: string;
  frame?: string;
  stack?: string;
};

};


export type CompositionScene = {
  movieId: string;
  nodes: SceneNode[];
};