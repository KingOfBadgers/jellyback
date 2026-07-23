export type FramePlacementMode =
  | "width"
  | "height"
  | "contain"
  | "absolute";

export type FrameAnchor =
  | "top"
  | "bottom"
  | "center";

export type FramePositionMode =
  | "relative"
  | "absolute";

export type FrameImageSource =
  | "actors"
  | "backdrops";

export type FrameRenderMode =
  | "single"
  | "perSlot";

export type FrameImageSlot = {

  id:string;
  x:number;
  y:number;
  width:number;
  height:number;
  /**
   * Image adjustment inside frame
   */
  imageOffsetX?:number;
  imageOffsetY?:number;
  imageScale?:number;
  rotation?:number; 
  frameScale?:number;
};

export type FrameDefinition = {

  id: string;
  displayName: string;
  src: string;
  /**
   * Which asset collection fills slots
   */
    imageSource: FrameImageSource;
      positionMode: FramePositionMode;
  /**
   * Eligibility requirement
   */
  maxAssets: number;
  /**
   * Native PNG dimensions
   */
  canvas: {
    width: number;
    height: number;
  };
  /**
   * Native slot geometry
   */
  imageSlots: FrameImageSlot[];
  /**
   * Placement on Stage 3 canvas
   */
  placement: {
  mode: FramePlacementMode;
  anchor?: FrameAnchor;
  width?: number;
  height?: number;
  rotation?: number;
  positionMode?: FramePositionMode;
  transformOrigin?: string;
};
  renderMode?: FrameRenderMode;
  };


