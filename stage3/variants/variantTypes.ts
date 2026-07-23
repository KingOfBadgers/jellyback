export type VariantLayer =
  | "actors"
  | "collage"
  | "logo"
  | "banner";


export type LayoutIntent =
  | "row"
  | "center-focus"
  | "w-overlap"
  | "grid"
  | "vertical-left"
  | "vertical-right"
  | "soft-wash"
  | "none"
  | "hero-stack";


export type PresentationDefinition = {
  shape?: string;
  frame?: string;
  edge?: string;
  shadow?: string;
  rotation?: number;
  texture?: string;
  stack?: string;
};

export type VariantId =
    "ACTOR_1_CENTER"
    | "ACTOR_3_CENTER_FOCUS"
    | "ACTOR_5_ROW"
    | "ACTOR_5_W_OVERLAP"
    | "LOGO_STANDARD"
    | "LOGO_CINEMATIC"
    | "LOGO_VERTICAL_MARK"
    | "COLLAGE_VERTICAL_STRIP_LEFT"
    | "BACKDROP_HERO_STACK"
    | "COLLAGE_VERTICAL_STRIP_RIGHT"
    | "COLLAGE_SOFT_WASH"
    | "COLLAGE_LAYERED_FIELD"
    | "COLLAGE_MULTI_SOURCE_ENV"
    | "COLLAGE_CINEMATIC_BLEND"
    | "COLLAGE_GRID"
    | "BANNER_STANDARD"
    | "BANNER_MODERN"
    | "LOGO_WIDE"
    | "LOGO_FLOATING_TITLE"
    | "LOGO_BADGE";



export type VariantDefinition = {
  id: VariantId;
  layer: VariantLayer;
  displayName: string;
  visibility: "show" | "hide";
  /**
   * Spatial composition language
   */
  layout: LayoutIntent;
  /**
   * Visual appearance language
   */
  presentation?: PresentationDefinition;
  maxAssets: number;
  group:
    | "primary"
    | "secondary"
    | "experimental";
  tier:
    | "free"
    | "pro"
    | "internal";
  experimentFlag: string | null;
};