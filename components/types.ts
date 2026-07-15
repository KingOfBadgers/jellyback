export type AssetType =
  | "background";


export type Asset = {
  id: string;
  type: AssetType;
  category: string;
  title: string;
  src: string;
  thumbnail: string;
  width: number;
  height: number;
};


export type AssetCategory = {
  id: string;
  name: string;
  count: number;
};