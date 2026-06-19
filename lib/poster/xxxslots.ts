export type SlotType =
  | "background"
  | "logo"
  | "banner"
  | "metadata"
  | "barcode";

export type Slot = {
  id: string;
  type: SlotType;

  // positioning rules (NOT user editable)
  x: number; // %
  y: number; // %
  w: number; // width %
  h: number; // height %

  align: "left" | "center" | "right";
  valign: "top" | "middle" | "bottom";

  maxItems?: number;
  allowedAssetTypes?: string[];

  style?: {
    blur?: number;
    opacity?: number;
    softenEdges?: boolean;
  };
};

export const POSTER_SLOTS: Slot[] = [
  {
    id: "bg",
    type: "background",
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    align: "center",
    valign: "middle",
  },

  {
    id: "logo_slot",
    type: "logo",
    x: 50,
    y: 12,
    w: 60,
    h: 12,
    align: "center",
    valign: "top",
    maxItems: 1,
  },

  {
    id: "banner_slot",
    type: "banner",
    x: 50,
    y: 38,
    w: 80,
    h: 18,
    align: "center",
    valign: "top",
    maxItems: 1,
  },

  {
    id: "metadata_slot",
    type: "metadata",
    x: 50,
    y: 82,
    w: 85,
    h: 10,
    align: "center",
    valign: "bottom",
    maxItems: 1,
  },

  {
    id: "barcode_slot",
    type: "barcode",
    x: 92,
    y: 94,
    w: 12,
    h: 6,
    align: "right",
    valign: "bottom",
    maxItems: 1,
  },
];