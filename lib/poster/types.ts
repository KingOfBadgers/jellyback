export type AssetType =
  | "title"
  | "logo"
  | "banner"
  | "year"
  | "runtime"
  | "description";

export type PosterAsset = {
  id: string;
  type: AssetType;
  value: string;
  enabled: boolean;
};

export type Zone = {
  id: string;
  name: string;

  accepts: AssetType[];

  fallbackPriority: AssetType[];

  x: number;
  y: number;
  width: number;
  height: number;

  assignedAssetId?: string;
};

export type PosterState = {
  movieId: string;
  backdrop: string;
  assets: PosterAsset[];
  templateId: string;
};